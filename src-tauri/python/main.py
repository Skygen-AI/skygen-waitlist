#!/usr/bin/env python3
"""
Python backend для Tauri приложения с интеграцией desktop_env
"""

import asyncio
import json
import logging
import os
import platform
import sys
import traceback
import uuid
import websockets
import aiohttp
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List
import subprocess

# Добавляем путь к desktop_env
sys.path.insert(0, os.path.join(
    os.path.dirname(__file__), '..', '..', '..', '..'))

try:
    from desktop_env import EmbeddedDesktopEnv
except ImportError as e:
    print(f"Failed to import desktop_env: {e}")
    EmbeddedDesktopEnv = None

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class SkygenClient:
    """Клиент для работы с Skygen бекендом"""

    def __init__(self, backend_url: str = "http://localhost:8000"):
        self.backend_url = backend_url
        self.access_token: Optional[str] = None
        self.refresh_token: Optional[str] = None
        self.device_id: Optional[str] = None
        self.device_token: Optional[str] = None
        self.wss_url: Optional[str] = None
        self.ws_connection: Optional[websockets.WebSocketServerProtocol] = None
        self.desktop_env: Optional[EmbeddedDesktopEnv] = None
        self.is_connected = False
        self.session: Optional[aiohttp.ClientSession] = None

    async def init_session(self):
        """Инициализация HTTP сессии"""
        if not self.session:
            self.session = aiohttp.ClientSession()

    async def close_session(self):
        """Закрытие HTTP сессии"""
        if self.session:
            await self.session.close()
            self.session = None

    async def signup(self, email: str, password: str) -> Dict[str, Any]:
        """Регистрация нового пользователя"""
        await self.init_session()

        payload = {
            "email": email,
            "password": password
        }

        try:
            async with self.session.post(
                f"{self.backend_url}/v1/auth/signup",
                json=payload
            ) as response:
                if response.status == 201:
                    return await response.json()
                elif response.status == 409:
                    raise Exception("Email already in use")
                else:
                    error_text = await response.text()
                    raise Exception(f"Signup failed: {error_text}")
        except aiohttp.ClientError as e:
            raise Exception(f"Network error during signup: {e}")

    async def login(self, email: str, password: str) -> Dict[str, Any]:
        """Авторизация пользователя"""
        await self.init_session()

        payload = {
            "email": email,
            "password": password
        }

        try:
            async with self.session.post(
                f"{self.backend_url}/v1/auth/login",
                json=payload
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    self.access_token = data["access_token"]
                    self.refresh_token = data["refresh_token"]
                    return data
                elif response.status == 401:
                    raise Exception("Invalid credentials")
                elif response.status == 429:
                    raise Exception("Too many login attempts")
                elif response.status == 423:
                    raise Exception("Account temporarily locked")
                else:
                    error_text = await response.text()
                    raise Exception(f"Login failed: {error_text}")
        except aiohttp.ClientError as e:
            raise Exception(f"Network error during login: {e}")

    async def enroll_device(self, device_name: str = None) -> Dict[str, Any]:
        """Регистрация устройства"""
        if not self.access_token:
            raise Exception("Not authenticated")

        await self.init_session()

        if not device_name:
            device_name = f"{platform.node()}-{platform.system()}"

        # Получаем информацию о платформе и возможностях
        capabilities = {
            "screenshot": True,
            "accessibility": True,
            "input": True,
            "filesystem": True,
            "platform": platform.system(),
            "python": True
        }

        payload = {
            "device_name": device_name,
            "platform": platform.system(),
            "capabilities": capabilities,
            "idempotency_key": str(uuid.uuid4())
        }

        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

        try:
            async with self.session.post(
                f"{self.backend_url}/v1/devices/enroll",
                json=payload,
                headers=headers
            ) as response:
                if response.status == 201:
                    data = await response.json()
                    self.device_id = str(data["device_id"])
                    self.device_token = data["device_token"]
                    self.wss_url = data["wss_url"]
                    return data
                else:
                    error_text = await response.text()
                    raise Exception(f"Device enrollment failed: {error_text}")
        except aiohttp.ClientError as e:
            raise Exception(f"Network error during device enrollment: {e}")

    async def connect_websocket(self):
        """Подключение к WebSocket"""
        if not self.device_token or not self.wss_url:
            raise Exception("Device not enrolled")

        try:
            # Подключаемся к WebSocket
            uri = f"{self.wss_url}?token={self.device_token}"
            self.ws_connection = await websockets.connect(uri)
            logger.info(f"Connected to WebSocket: {uri}")

            # Отправляем register сообщение
            register_msg = {
                "type": "register",
                "device_id": self.device_id,
                "device_token": self.device_token,
                "capabilities": ["screenshot", "accessibility", "input", "filesystem"]
            }

            await self.ws_connection.send(json.dumps(register_msg))
            logger.info("Sent register message")

            # Ждем подтверждения
            response = await self.ws_connection.recv()
            response_data = json.loads(response)

            if response_data.get("type") == "register.ok":
                self.is_connected = True
                logger.info("Device registered successfully")

                # Запускаем heartbeat и обработку сообщений
                asyncio.create_task(self._heartbeat_loop())
                asyncio.create_task(self._message_handler())

                return True
            else:
                raise Exception(f"Registration failed: {response_data}")

        except Exception as e:
            logger.error(f"WebSocket connection failed: {e}")
            raise

    async def _heartbeat_loop(self):
        """Отправка heartbeat сообщений"""
        while self.is_connected and self.ws_connection:
            try:
                heartbeat_msg = {
                    "type": "heartbeat",
                    "device_id": self.device_id,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }

                await self.ws_connection.send(json.dumps(heartbeat_msg))
                logger.debug("Sent heartbeat")

                await asyncio.sleep(30)  # Heartbeat каждые 30 секунд

            except Exception as e:
                logger.error(f"Heartbeat failed: {e}")
                break

    async def _message_handler(self):
        """Обработка входящих WebSocket сообщений"""
        while self.is_connected and self.ws_connection:
            try:
                message = await self.ws_connection.recv()
                data = json.loads(message)

                if data.get("type") == "task.exec":
                    await self._handle_task_execution(data)

            except websockets.exceptions.ConnectionClosed:
                logger.info("WebSocket connection closed")
                self.is_connected = False
                break
            except Exception as e:
                logger.error(f"Message handling failed: {e}")

    async def _handle_task_execution(self, task_data: Dict[str, Any]):
        """Обработка выполнения задачи"""
        task_id = task_data.get("task_id")
        actions = task_data.get("actions", [])

        logger.info(f"Executing task {task_id} with {len(actions)} actions")

        results = []

        try:
            # Инициализируем desktop_env если еще не сделали
            if not self.desktop_env and EmbeddedDesktopEnv:
                self.desktop_env = EmbeddedDesktopEnv()

            for action in actions:
                result = await self._execute_action(action)
                results.append(result)

            # Отправляем результаты
            response = {
                "type": "task.result",
                "task_id": task_id,
                "results": results,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }

            await self.ws_connection.send(json.dumps(response))
            logger.info(f"Task {task_id} completed successfully")

        except Exception as e:
            logger.error(f"Task execution failed: {e}")
            # Отправляем ошибку
            error_result = {
                "type": "task.result",
                "task_id": task_id,
                "results": [{
                    "action_id": "error",
                    "status": "failed",
                    "error": str(e)
                }],
                "timestamp": datetime.now(timezone.utc).isoformat()
            }

            await self.ws_connection.send(json.dumps(error_result))

    async def _execute_action(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """Выполнение отдельного действия"""
        action_id = action.get("action_id", str(uuid.uuid4()))
        action_type = action.get("type")
        params = action.get("params", {})

        try:
            if action_type == "screenshot":
                # Делаем скриншот
                screenshot_bytes = self.desktop_env.screenshot_png_bytes()

                # Здесь должна быть загрузка в S3, но пока просто возвращаем результат
                return {
                    "action_id": action_id,
                    "status": "done",
                    "meta": {
                        "size": len(screenshot_bytes),
                        "format": "png"
                    }
                }

            elif action_type == "accessibility":
                # Получаем accessibility tree
                a11y_tree = self.desktop_env.a11y_tree_xml()

                return {
                    "action_id": action_id,
                    "status": "done",
                    "data": a11y_tree
                }

            elif action_type == "type_text":
                # Печатаем текст
                text = params.get("text", "")
                self.desktop_env.type_text(text)

                return {
                    "action_id": action_id,
                    "status": "done",
                    "meta": {"text_length": len(text)}
                }

            elif action_type == "execute_action":
                # Выполняем действие через action runner
                action_data = params.get("action", {})
                self.desktop_env.execute_action(action_data)

                return {
                    "action_id": action_id,
                    "status": "done",
                    "meta": {"action_type": action_data.get("action_type")}
                }

            else:
                return {
                    "action_id": action_id,
                    "status": "failed",
                    "error": f"Unknown action type: {action_type}"
                }

        except Exception as e:
            return {
                "action_id": action_id,
                "status": "failed",
                "error": str(e)
            }

    async def disconnect(self):
        """Отключение от WebSocket"""
        self.is_connected = False

        if self.ws_connection:
            await self.ws_connection.close()
            self.ws_connection = None

        await self.close_session()

    def get_status(self) -> Dict[str, Any]:
        """Получение текущего статуса"""
        return {
            "authenticated": bool(self.access_token),
            "device_enrolled": bool(self.device_id),
            "connected": self.is_connected,
            "device_id": self.device_id,
            "platform": platform.system(),
            "desktop_env_available": EmbeddedDesktopEnv is not None
        }


# Глобальный экземпляр клиента
client = SkygenClient()


async def main():
    """Основная функция для тестирования"""
    if len(sys.argv) > 1:
        command = sys.argv[1]

        if command == "test":
            # Тестовый режим
            status = client.get_status()
            print(json.dumps(status, indent=2))

        elif command == "login" and len(sys.argv) >= 4:
            email = sys.argv[2]
            password = sys.argv[3]

            try:
                result = await client.login(email, password)
                print(json.dumps({"success": True, "data": result}))
            except Exception as e:
                print(json.dumps({"success": False, "error": str(e)}))

        elif command == "enroll":
            try:
                result = await client.enroll_device()
                print(json.dumps({"success": True, "data": result}))
            except Exception as e:
                print(json.dumps({"success": False, "error": str(e)}))

        elif command == "connect":
            try:
                await client.connect_websocket()
                print(json.dumps({"success": True, "connected": True}))

                # Держим соединение открытым
                while client.is_connected:
                    await asyncio.sleep(1)

            except Exception as e:
                print(json.dumps({"success": False, "error": str(e)}))

        await client.close_session()

if __name__ == "__main__":
    asyncio.run(main())

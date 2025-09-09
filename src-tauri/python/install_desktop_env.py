#!/usr/bin/env python3
"""
Скрипт для установки desktop_env в UI-web приложение
"""

import os
import sys
import shutil
import subprocess
import platform
from pathlib import Path


def log(message):
    """Логирование сообщений"""
    print(f"[INSTALL] {message}")


def run_command(cmd, shell=False):
    """Выполнение команды с логированием"""
    log(f"Running: {' '.join(cmd) if isinstance(cmd, list) else cmd}")
    result = subprocess.run(cmd, shell=shell, capture_output=True, text=True)

    if result.returncode != 0:
        log(f"Command failed with code {result.returncode}")
        log(f"STDOUT: {result.stdout}")
        log(f"STDERR: {result.stderr}")
        return False, result.stderr

    return True, result.stdout


def find_desktop_env_source():
    """Поиск исходного кода desktop_env"""
    current_dir = Path(__file__).parent

    # Пробуем найти desktop_env относительно UI-web
    candidates = [
        current_dir / ".." / ".." / ".." / ".." /
        "desktop_env",  # UI-web/../desktop_env
        # UI-web/manus-ui/../desktop_env
        current_dir / ".." / ".." / ".." / "desktop_env",
        # относительно текущей директории
        Path.cwd() / ".." / "desktop_env",
        Path.home() / "skygen" / "desktop_env",                  # в домашней папке
    ]

    for candidate in candidates:
        if candidate.exists() and (candidate / "__init__.py").exists():
            return candidate.resolve()

    return None


def copy_desktop_env(source_path, target_path):
    """Копирование desktop_env в целевую директорию"""
    log(f"Copying desktop_env from {source_path} to {target_path}")

    if target_path.exists():
        shutil.rmtree(target_path)

    shutil.copytree(source_path, target_path)
    log("desktop_env copied successfully")


def install_python_dependencies():
    """Установка Python зависимостей"""
    log("Installing Python dependencies...")

    # Основные зависимости для desktop_env
    dependencies = [
        "pillow",           # для работы с изображениями
        "pyautogui",        # для автоматизации GUI
        "psutil",           # для работы с процессами
        "requests",         # для HTTP запросов
        "aiohttp",          # для async HTTP
        "websockets",       # для WebSocket
    ]

    # Зависимости для конкретной платформы
    system = platform.system()
    if system == "Darwin":  # macOS
        dependencies.extend([
            "pyobjc-core",
            "pyobjc-framework-Cocoa",
            "pyobjc-framework-Quartz",
        ])
    elif system == "Linux":
        dependencies.extend([
            "python3-xlib",
            "pycairo",
        ])
    elif system == "Windows":
        dependencies.extend([
            "pywin32",
            "pygetwindow",
        ])

    # Устанавливаем зависимости
    for dep in dependencies:
        success, output = run_command(
            [sys.executable, "-m", "pip", "install", dep])
        if not success:
            log(f"Warning: Failed to install {dep}: {output}")

    log("Python dependencies installation completed")


def create_desktop_env_package():
    """Создание пакета desktop_env в python директории"""
    python_dir = Path(__file__).parent
    desktop_env_target = python_dir / "desktop_env"

    # Находим исходный код desktop_env
    source_path = find_desktop_env_source()
    if not source_path:
        log("ERROR: desktop_env source code not found!")
        log("Please ensure desktop_env is available in one of these locations:")
        log("- ../../../desktop_env (relative to UI-web)")
        log("- ~/skygen/desktop_env")
        return False

    log(f"Found desktop_env source at: {source_path}")

    # Копируем desktop_env
    copy_desktop_env(source_path, desktop_env_target)

    return True


def verify_installation():
    """Проверка установки"""
    log("Verifying installation...")

    try:
        # Добавляем текущую директорию в path
        python_dir = Path(__file__).parent
        sys.path.insert(0, str(python_dir))

        # Пробуем импортировать desktop_env
        from desktop_env import EmbeddedDesktopEnv

        # Создаем экземпляр
        env = EmbeddedDesktopEnv()

        # Проверяем базовые возможности
        platform_info = env.platform()
        screen_size = env.screen_size()

        log(f"Platform: {platform_info}")
        log(f"Screen size: {screen_size}")
        log("Installation verified successfully!")

        return True

    except ImportError as e:
        log(f"Import error: {e}")
        return False
    except Exception as e:
        log(f"Verification error: {e}")
        return False


def main():
    """Main function"""
    log("Starting desktop_env installation...")
    log(f"Python version: {sys.version}")
    log(f"Platform: {platform.system()} {platform.release()}")

    # Шаг 1: Установка Python зависимостей
    install_python_dependencies()

    # Шаг 2: Создание пакета desktop_env
    if not create_desktop_env_package():
        log("ERROR: Failed to create desktop_env package")
        return False

    # Шаг 3: Проверка установки
    if not verify_installation():
        log("ERROR: Installation verification failed")
        return False

    log("desktop_env installation completed successfully!")
    return True


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

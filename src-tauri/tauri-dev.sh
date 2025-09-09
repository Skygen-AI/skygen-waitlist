#!/bin/bash
# Скрипт для запуска dev сервера из любой директории
cd "$(dirname "$0")/.."
PORT=3000 npm run dev

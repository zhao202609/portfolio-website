@echo off
title Capstone Portfolio Launcher
color 0B
echo ============================================================
echo   Starting the Full-Stack Portfolio website...
echo   - Backend  : http://localhost:5000
echo   - Frontend : http://localhost:5173
echo ============================================================
echo.

REM Start the back-end API in its own window
start "Capstone Backend" cmd /k "cd /d %~dp0server && npm run dev"

REM Start the front-end in its own window
start "Capstone Frontend" cmd /k "cd /d %~dp0client && npm run dev"

REM Wait for both services to come up, then open the browser
echo Waiting for services to start...
timeout /t 12 /nobreak >nul
start http://localhost:5173

echo.
echo Done! Your browser should open at http://localhost:5173
echo Keep the two black windows open while using the website.
echo To stop the website, close those two windows.
timeout /t 6 /nobreak >nul

@echo off
TITLE Launching JOB WAY AI Platform
echo ========================================================
echo       Starting JOB WAY AI Multi-Agent Platform
echo ========================================================
echo.

echo [1/3] Starting Backend API Service on http://localhost:5000 ...
start "JOB WAY AI - Backend Service" cmd /k "cd /d %~dp0backend && node server.js"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Frontend React Application on http://localhost:5173 ...
start "JOB WAY AI - Frontend Dev Server" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ========================================================
echo   JOB WAY AI is now running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo ========================================================
pause

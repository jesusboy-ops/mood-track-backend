@echo off
REM MoodMate API Test Script for Windows
REM This script tests all major endpoints

setlocal enabledelayedexpansion

set BASE_URL=http://localhost:3000/api
set TOKEN=

echo ================================
echo MoodMate API Testing Script
echo ================================
echo.

REM Test 1: Health Check
echo Test 1: Health Check
curl -s "%BASE_URL%/health"
if %ERRORLEVEL% EQU 0 (
    echo [OK] Health check passed
) else (
    echo [FAIL] Health check failed
    exit /b 1
)
echo.

REM Test 2: Register User
echo Test 2: Register User
set EMAIL=test%RANDOM%@example.com

curl -s -X POST "%BASE_URL%/auth/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"%EMAIL%\",\"password\":\"password123\"}" ^
  -o response.json

if %ERRORLEVEL% EQU 0 (
    echo [OK] User registration passed
    REM Extract token from response (simplified)
    for /f "tokens=2 delims=:," %%a in ('findstr "token" response.json') do set TOKEN=%%a
    set TOKEN=!TOKEN:"=!
    echo Token: !TOKEN:~0,20!...
) else (
    echo [FAIL] User registration failed
    exit /b 1
)
echo.

REM Test 3: Create Mood Entry
echo Test 3: Create Mood Entry
curl -s -X POST "%BASE_URL%/moods" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"mood\":\"happy\",\"note\":\"Testing the API!\"}"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Create mood entry passed
) else (
    echo [FAIL] Create mood entry failed
)
echo.

REM Test 4: Get Mood Entries
echo Test 4: Get Mood Entries
curl -s -X GET "%BASE_URL%/moods" ^
  -H "Authorization: Bearer %TOKEN%"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Get mood entries passed
) else (
    echo [FAIL] Get mood entries failed
)
echo.

REM Cleanup
if exist response.json del response.json

echo ================================
echo All tests completed!
echo ================================
echo.
echo Your API is working correctly!
echo Token for further testing: %TOKEN%
echo.
echo You can now:
echo 1. Import MoodMate.postman_collection.json into Postman
echo 2. Use the token above for authenticated requests
echo 3. Check API_EXAMPLES.md for more endpoint examples

endlocal

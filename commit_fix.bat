@echo off
echo ==========================================
echo  GioFPV Quick Commit Tool
echo ==========================================
echo.
echo Adding files...
git add .
if %errorlevel% neq 0 (
    echo Error adding files.
    pause
    exit /b %errorlevel%
)

echo.
echo Committing...
git commit -m "fix: responsive layout for hero and intermediate screens"
if %errorlevel% neq 0 (
    echo Error committing (maybe nothing to commit?).
    pause
    exit /b %errorlevel%
)

echo.
echo Success! Changes committed.
pause

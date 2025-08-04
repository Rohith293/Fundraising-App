@echo off
echo 📸 Fundraising Hub Screenshot Organizer
echo =======================================
echo.
echo This script helps you organize your screenshots.
echo.
echo Required screenshots in screenshots/ folder:
echo.
echo ✅ Desktop Screenshots (1200x800px recommended):
echo    📄 login.png - Login screen
echo    📄 dashboard.png - Main dashboard  
echo    📄 analytics.png - Analytics page
echo    📄 goal-setting.png - Goal setting interface
echo    📄 donation-simulator.png - Donation simulator
echo    📄 leaderboard.png - Leaderboard rankings
echo.
echo ✅ Mobile Screenshots (300-400px width):
echo    📱 mobile-dashboard.png - Mobile dashboard
echo    📱 mobile-leaderboard.png - Mobile leaderboard
echo.
echo 🔍 Checking current screenshots...
echo.

dir /B screenshots\*.png 2>nul
if %errorlevel% neq 0 (
    echo ❌ No PNG screenshots found in screenshots folder
) else (
    echo ✅ Found PNG files above
)

echo.
echo 📝 Next steps:
echo 1. Take screenshots using the guide in screenshots/README.md
echo 2. Save them with exact filenames shown above
echo 3. Run: git add screenshots/
echo 4. Run: git commit -m "📸 Add application screenshots"
echo 5. Run: git push origin main
echo.
pause

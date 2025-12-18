@echo off
echo ========================================
echo   Lancement du Portfolio Next.js
echo ========================================
echo.
echo Demarrage du serveur de developpement...
echo.
echo Une fois le serveur demarre, votre navigateur s'ouvrira automatiquement.
echo Pour arreter le serveur, appuyez sur Ctrl+C dans cette fenetre.
echo.
echo ========================================
echo.

REM Démarrer le serveur Next.js en arrière-plan
start /B cmd /c "npm run dev"

REM Attendre quelques secondes pour que le serveur démarre
timeout /t 5 /nobreak >nul

REM Ouvrir le navigateur
start http://localhost:3000

echo.
echo Le serveur est en cours d'execution sur http://localhost:3000
echo Appuyez sur Ctrl+C pour arreter le serveur.
echo.

REM Garder la fenêtre ouverte
pause


"""Le lien du portfolio peut être ouvert à partir de cette addresse : https://redouanesahari.github.io/Portfolio/"""
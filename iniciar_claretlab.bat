@echo off
title Iniciar ClaretLab
echo ====================================================
echo             Iniciando Consola ClaretLab...
echo ====================================================
echo.
echo Abriendo el navegador en http://localhost:3000...
start http://localhost:3000
echo.
if exist claretlab (
  cd claretlab
) else (
  cd logiclab
)
npm run dev
pause

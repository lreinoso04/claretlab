@echo off
title Iniciar ClaretLab Compilado
echo ====================================================
echo             Iniciando Consola ClaretLab (Compilado)...
echo ====================================================
echo.
echo Abriendo el navegador en http://localhost:4173...
start http://localhost:4173
echo.
if exist claretlab (
  cd claretlab
) else (
  cd logiclab
)
npm run preview
pause

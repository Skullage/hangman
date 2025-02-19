@echo off
setlocal EnableDelayedExpansion
set filename=FileTitle
set suffix=0
for /F "delims=" %%i in ('dir /B *.*') do (
     set /A suffix+=1
     ren "%%i" "!suffix!.gif"
)
@echo off
echo Starting MindBridge AI Chat API...
cd /d "%~dp0"
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
python main.py
pause

"""
Memefy AI Backend - Quick Start Script
This script starts the backend server with proper error handling
"""

import subprocess
import sys
import os

def check_python():
    """Check Python version"""
    if sys.version_info < (3, 8):
        print("❌ ERROR: Python 3.8 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    print(f"✓ Python {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")
    return True

def install_dependencies():
    """Install required packages"""
    print("\n📦 Installing dependencies...")
    packages = [
        "fastapi",
        "uvicorn",
        "requests",
        "joblib",
        "numpy",
        "scikit-learn",
        "google-genai",
        "python-dotenv"
    ]
    
    try:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "-q"] + packages,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE
        )
        print("✓ All dependencies installed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def check_env_file():
    """Check if .env file exists"""
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    if not os.path.exists(env_path):
        print("❌ ERROR: .env file not found!")
        print("Create backend/.env with:")
        print("""
IMGFLIP_USERNAME=agent26
IMGFLIP_PASSWORD=gQAvPA8Ut&LJd&C
GEMINI_API_KEY=AIzaSyCXvr-dfM_ZEv5kikI_72LFV06b244ruSE
        """)
        return False
    print("✓ .env file found")
    return True

def start_server():
    """Start the uvicorn server"""
    print("\n" + "="*50)
    print("  🚀 Starting Memefy AI Backend Server")
    print("="*50)
    print()
    print("Backend: http://localhost:8000")
    print("API Docs: http://localhost:8000/docs")
    print()
    print("Press Ctrl+C to stop")
    print("="*50)
    print()
    
    try:
        subprocess.call([
            sys.executable, "-m", "uvicorn",
            "main:app",
            "--reload",
            "--host", "0.0.0.0",
            "--port", "8000"
        ])
    except KeyboardInterrupt:
        print("\n\n✓ Server stopped")
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return False
    return True

def main():
    """Main entry point"""
    print("="*50)
    print("  Memefy AI - Backend Setup")
    print("="*50)
    
    # Check Python version
    if not check_python():
        input("Press Enter to exit...")
        sys.exit(1)
    
    # Check .env file
    if not check_env_file():
        input("Press Enter to exit...")
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        input("Press Enter to exit...")
        sys.exit(1)
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()

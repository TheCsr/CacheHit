#!/usr/bin/env bash

VENV_PATH="/home/thecsr/cachehitvenv"
BACKEND_DIR="/home/thecsr/CacheHit/backend"
FRONTEND_DIR="/home/thecsr/CacheHit/frontend"

echo "⚡ Starting CacheHit Development Stack..."

# Graceful cleanup handler for Ctrl+C
cleanup() {
  echo ""
  echo "🛑 Shutting down CacheHit services..."
  
  # Terminate child processes of backend (Flask reloader) and backend itself
  if [ -n "$BACKEND_PID" ]; then
    pkill -P "$BACKEND_PID" 2>/dev/null || true
    kill "$BACKEND_PID" 2>/dev/null || true
  fi

  # Terminate child processes of frontend (Vite/Node) and frontend itself
  if [ -n "$FRONTEND_PID" ]; then
    pkill -P "$FRONTEND_PID" 2>/dev/null || true
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi

  # Clean up processes bound to the specific ports without killing shell
  lsof -ti:5000 | xargs -r kill -9 2>/dev/null || true
  lsof -ti:5173 | xargs -r kill -9 2>/dev/null || true

  echo "✅ CacheHit stopped. Terminal remains open."
}

# Only trap Ctrl+C (SIGINT) and SIGTERM (DO NOT trap EXIT)
trap cleanup SIGINT SIGTERM

# 1. Clean up lingering dev ports before starting
lsof -ti:5000 | xargs -r kill -9 2>/dev/null || true

# 2. Start Flask Backend
echo "🚀 Starting Flask backend..."
source "$VENV_PATH/bin/activate"
cd "$BACKEND_DIR"
python3 run.py &
BACKEND_PID=$!

sleep 1

# 3. Start React Frontend and Auto-Open Browser
echo "🌐 Starting React frontend & opening browser..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

echo "✨ Both services are running!"
echo "   - Backend:  http://127.0.0.1:5000"
echo "   - Frontend: http://localhost:5173"
echo "Press [Ctrl+C] to stop all services."

# Wait for background processes
wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
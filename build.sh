#!/usr/bin/env bash
# exit on error
set -o errexit

# Install backend dependencies
pip install -r requirements.txt

# Build the frontend
cd device_tracker_frontend
npm install
npm run build
cd ..
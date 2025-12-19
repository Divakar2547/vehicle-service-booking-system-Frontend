# Quick Start Guide

## Prerequisites
1. Install Node.js from https://nodejs.org/
2. Install MongoDB from https://www.mongodb.com/try/download/community

## Setup Steps

### 1. Start MongoDB
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or run MongoDB manually
mongod
```

### 2. Start Backend (Terminal 1)
```bash
# Double-click start-backend.bat
# OR manually:
cd BackEnd
npm install
node utils/seedData.js
npm start
```

### 3. Start Frontend (Terminal 2)
```bash
# Double-click start-frontend.bat  
# OR manually:
cd vechileservice
npm install
npm start
```

## Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Accounts
- **Admin**: admin@example.com / admin123
- **Customer**: divakar@example.com / password123

## Features to Test
1. Login with demo accounts
2. View services page
3. Submit contact form
4. Register new account
5. Admin can manage services and bookings

## Troubleshooting
- **MongoDB Error**: Ensure MongoDB is running
- **Port 3000 in use**: React will ask to use different port
- **Port 5000 in use**: Change PORT in BackEnd/.env file
- **CORS Error**: Check backend is running on port 5000

## File Structure
```
Project/
├── BackEnd/           # Express + MongoDB API
├── vechileservice/    # React Frontend  
├── start-backend.bat  # Backend startup script
├── start-frontend.bat # Frontend startup script
└── README.md         # Detailed documentation
```
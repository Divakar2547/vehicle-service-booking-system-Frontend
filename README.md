# Vehicle Service Management System

Full-stack application for managing vehicle services with MongoDB, Express.js, React, and Node.js (MERN Stack).

## Project Structure

```
Project/
├── BackEnd/              # Express.js + MongoDB Backend
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── utils/           # Utility functions & seed data
│   ├── server.js        # Main server file
│   └── .env             # Environment variables
│
└── vechileservice/      # React Frontend
    ├── src/
    │   ├── Pages/       # React pages
    │   ├── Common/      # Common components
    │   ├── Styles/      # CSS files
    │   ├── utils/       # API utilities
    │   └── App.js       # Main app component
    └── public/          # Static files
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation & Setup

### 1. Install MongoDB

**Windows:**
- Download MongoDB from https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- MongoDB will run on `mongodb://localhost:27017`

**Verify MongoDB is running:**
```bash
mongod --version
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd BackEnd

# Install dependencies
npm install

# Start MongoDB (if not running as service)
# Open a new terminal and run:
mongod

# Seed the database with initial data
node utils/seedData.js

# Start the backend server
npm start
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd vechileservice

# Install dependencies
npm install

# Start the React development server
npm start
```

Frontend will run on: `http://localhost:3000`

## Default Login Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`

### Customer Account
- Email: `divakar@example.com`
- Password: `password123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Vehicles
- `GET /api/vehicles` - Get user vehicles (Protected)
- `POST /api/vehicles` - Add vehicle (Protected)
- `PUT /api/vehicles/:id` - Update vehicle (Protected)
- `DELETE /api/vehicles/:id` - Delete vehicle (Protected)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Bookings
- `GET /api/bookings` - Get user bookings (Protected)
- `POST /api/bookings` - Create booking (Protected)
- `PUT /api/bookings/:id/status` - Update booking status (Protected)
- `PUT /api/bookings/:id/payment` - Update payment status (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)
- `GET /api/bookings/admin/all` - Get all bookings (Admin only)
- `GET /api/bookings/admin/stats` - Get statistics (Admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (Admin only)
- `PUT /api/contact/:id/status` - Update message status (Admin only)

## Features

### Customer Features
- User registration and authentication
- View available service packages
- Add and manage vehicles
- Book services for vehicles
- Track booking status
- Contact support

### Admin Features
- Manage service packages
- View all bookings
- Update booking status
- View contact messages
- Access dashboard statistics

## Environment Variables

Create `.env` file in BackEnd directory:

```env
PORT=5000
JWT_SECRET=vehicle_service_jwt_secret_key_2025
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vehicle_service
FRONTEND_URL=http://localhost:3000
```

## Database Models

### User
- name, email, password, phone, address, role

### Vehicle
- userId, brand, model, numberPlate, year, vehicleType

### ServicePackage
- name, price, description, duration, category, features

### Booking
- userId, vehicleId, servicePackageId, serviceDate, timeSlot, status, paymentStatus

### Contact
- name, email, message, status, adminResponse

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for validation

### Frontend
- React.js
- React Router DOM
- CSS3
- Fetch API

## Development

### Backend Development Mode
```bash
cd BackEnd
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development Mode
```bash
cd vechileservice
npm start  # React hot reload enabled
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in `.env` file
- Verify MongoDB service is started

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: React will prompt to use different port

### CORS Issues
- Verify FRONTEND_URL in backend `.env`
- Check CORS configuration in `server.js`

## Testing the Application

1. Start MongoDB
2. Start Backend server
3. Run seed script to populate data
4. Start Frontend server
5. Open browser at `http://localhost:3000`
6. Login with demo credentials
7. Test features:
   - View services
   - Login/Register
   - Submit contact form
   - (Admin) Manage services and bookings

## Production Deployment

### Backend
- Set NODE_ENV=production
- Use MongoDB Atlas for cloud database
- Configure proper JWT_SECRET
- Enable HTTPS

### Frontend
- Build: `npm run build`
- Deploy build folder to hosting service
- Update API_BASE_URL in `src/utils/api.js`

## License

MIT License

## Support

For issues and questions, use the contact form in the application or create an issue in the repository.
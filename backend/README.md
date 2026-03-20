# RBAC Task Management System - Backend

A production-ready Node.js backend for managing tasks with role-based access control, built with Express.js and MongoDB.

## Tech Stack

- Node.js & Express.js (ES6 modules)
- MongoDB Atlas with Mongoose 8.0.0
- JWT Authentication with secure httpOnly cookies
- Bcrypt for password hashing
- Cookie Parser for secure token storage
- CORS enabled with credentials

## Features

### 🔐 Authentication & Security
- User registration with email validation
- Secure password hashing with bcrypt (10 rounds)
- JWT token-based authentication (1 day expiry)
- Automatic logout on token expiration
- Secure cookie storage (httpOnly + sameSite: strict)
- CSRF protection
- Bearer token fallback in Authorization header

### 👥 Role-Based Access Control
- Two roles: User and Admin
- Admin-only user creation endpoint
- Granular permission control via middleware
- Ownership verification for resource modification
- Admin can access all users and tasks

### 📝 Task Management
- Create, Read, Update, Delete tasks
- Task status tracking (pending/completed)
- User-specific task filtering with pagination
- Admin can view and delete all tasks
- Ownership verification prevents unauthorized updates/deletes
- Pagination with configurable page size

### 👤 User Management (Admin)
- View all users with pagination
- Delete users (admin-only, prevents self-deletion)
- User role assignment during admin creation

## Folder Structure

```
backend/
├── server.js                    (Entry point with connec tDB)
├── .env                        (Environment variables)
├── package.json               (ES6 module setup)
├── .gitignore
└── src/
    ├── app.js                 (Express app with middleware/routes)
    ├── config/
    │   └── db.js             (MongoDB connection)
    ├── models/
    │   ├── User.js           (User schema with hashing)
    │   └── Task.js           (Task schema)
    ├── controllers/
    │   ├── authController.js (Register, Login, Logout, CreateAdmin)
    │   ├── userController.js (Get profile, list users, delete user)
    │   └── taskController.js (Task CRUD with ownership checks)
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   └── taskRoutes.js
    └── middleware/
        ├── authMiddleware.js (JWT verification from cookies/headers)
        └── roleMiddleware.js (Role-based authorization)
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

### Setup

1. **Clone the project**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rbac_db?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_jwt_secret_key_change_in_production
NODE_ENV=development
```

4. **Start the server**
```bash
npm run dev      # Development (nodemon)
npm start        # Production
```

The server will run at `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Sets secure httpOnly cookie: token=<jwt>
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>
Cookie: token=<jwt>

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Create Admin (Admin Only)
```
POST /api/auth/create-admin
Authorization: Bearer <admin_token>
Cookie: token=<admin_jwt>
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "secure_password"
}

Response:
{
  "success": true,
  "message": "Admin user created successfully",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Users

#### Get User Profile
```
GET /api/users/profile
Authorization: Bearer <token>
Cookie: token=<jwt>

Response:
{
  "success": true,
  "message": "User profile retrieved successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-03-20T..."
  }
}
```

#### Get All Users (Admin Only)
```
GET /api/users?page=1&limit=10
Authorization: Bearer <admin_token>
Cookie: token=<admin_jwt>

Response:
{
  "success": true,
  "message": "All users retrieved successfully",
  "count": 10,
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3,
  "users": [...]
}
```

#### Delete User (Admin Only)
```
DELETE /api/users/:id
Authorization: Bearer <admin_token>
Cookie: token=<admin_jwt>

Response:
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Tasks

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Cookie: token=<jwt>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}

Response:
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": "...",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending",
    "user": "...",
    "createdAt": "2024-03-20T..."
  }
}
```

#### Get My Tasks
```
GET /api/tasks/my?page=1&limit=10
Authorization: Bearer <token>
Cookie: token=<jwt>

Response:
{
  "success": true,
  "message": "Your tasks retrieved successfully",
  "count": 10,
  "total": 15,
  "page": 1,
  "limit": 10,
  "totalPages": 2,
  "tasks": [...]
}
```

#### Get All Tasks (Admin Only)
```
GET /api/tasks?page=1&limit=10
Authorization: Bearer <admin_token>
Cookie: token=<admin_jwt>

Response:
{
  "success": true,
  "message": "All tasks retrieved successfully",
  "count": 10,
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "tasks": [...]
}
```

####Update Task (Own or Admin)
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Cookie: token=<jwt>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}

Response:
{
  "success": true,
  "message": "Task updated successfully",
  "task": {...}
}
```

#### Delete Task (Own or Admin)
```
DELETE /api/tasks/:id
Authorization: Bearer <token>
Cookie: token=<jwt>

Response:
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Database Models

### User Schema
```javascript
{
  name: String (required, max 100),
  email: String (required, unique, email format),
  password: String (required, min 6, hashed),
  role: String (enum: ["user", "admin"], default: "user"),
  createdAt: Date (default: now),
  updatedAt: Date (auto)
}
```

### Task Schema
```javascript
{
  title: String (required, max 200),
  description: String (max 2000),
  status: String (enum: ["pending", "completed"], default: "pending"),
  user: ObjectId (ref: "User", required),
  createdAt: Date (default: now),
  updatedAt: Date (auto)
}
```

## Middleware

### authMiddleware
- Verifies JWT token from cookies or Authorization header
- Attaches user object to request
- Redirects to login on 401

### roleMiddleware
- Accepts allowed roles as parameters
- Checks user role against allowed roles
- Returns 403 Forbidden if unauthorized

## Error Handling

- Try-catch blocks in all controllers
- Proper HTTP status codes
- User-friendly error messages
- Validation error responses
- Server error logging

## Security Features

✅ Password hashing with bcrypt (10 salt rounds)
✅ JWT tokens with 1-day expiry
✅ Secure httpOnly cookies
✅ CSRF protection with sameSite: strict
✅ CORS enabled with credentials
✅ Email validation
✅ Input validation
✅ Ownership verification for resources
✅ No passwords returned in responses

## Environment Variables

```
PORT                  Server port (default: 5000)
MONGO_URI            MongoDB Atlas connection string
JWT_SECRET           Secret key for JWT signing
NODE_ENV             Environment (development/production)
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Cookie parsing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** (dev) - Auto-reload

## Best Practices Implemented

✅ Modular folder structure
✅ Separation of concerns (routes, controllers, models)
✅ Reusable middleware
✅ Error handling & validation
✅ Security best practices
✅ Pagination for large datasets
✅ Proper HTTP status codes
✅ Request/response documentation
✅ Environment-based configuration
✅ Database indexing (email unique)

## Testing the API

### Using Postman
1. Register a user at POST `/api/auth/register`
2. Login at POST `/api/auth/login`
3. Copy the token from response
4. Add to Authorization header: `Bearer <token>`
5. Test protected endpoints

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Create Task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"My Task","description":"Description"}'
```

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas cluster is running
- Check connection string in .env
- Ensure IP is whitelisted in MongoDB Atlas

### JWT/Auth Errors
- Token might be expired (1 day validity)
- Check Authorization header format: `Bearer <token>`
- Verify JWT_SECRET is set

### Pagination Issues
- Use `?page=1&limit=10` query parameters
- Page starts from 1 (not 0)
- Default limit is 10 items

## Performance Optimization

✅ Database indexing on email
✅ Pagination to reduce payload
✅ Efficient query selection
✅ Lean queries where applicable
✅ Connection pooling with MongoDB

## Credits & Acknowledgments

**Developed with AI assistance** for optimizing repetitive tasks and accelerating development cycles. This project demonstrates modern backend architecture with industry best practices including secure authentication, role-based authorization, proper error handling, and scalable API design.

The AI assistance was instrumental in:
- Rapid prototyping and scaffolding
- Code consistency and best practices
- Comprehensive error handling implementation
- Security patterns and middleware design
- Database schema optimization
- Documentation generation

---

**Author**: Sheriyans (with AI collaboration)
**License**: MIT
**Last Updated**: 2024

## License

MIT

## Support

For issues or questions, please refer to the frontend documentation or create an issue in the repository.

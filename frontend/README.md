# RBAC Task Management System - Frontend

A production-ready React application for managing tasks with role-based access control.

## Tech Stack

- React 18 (Vite)
- React Router DOM v6
- React Query (TanStack Query)
- Axios
- Tailwind CSS
- Context API (Auth + Theme)

## Features

### 🔐 Authentication
- User Registration & Login
- JWT token-based authentication
- Secure token storage in localStorage
- Auto-logout on token expiration
- Protected routes

### 🎨 Theme System
- Dark/Light mode toggle
- Persistent theme preference
- Tailwind dark class strategy
- Perfect contrast in both themes

### 📝 Task Management
- Create, Read, Update, Delete tasks
- Task status management (pending/completed)
- Pagination (10 tasks per page)
- Users can only manage their own tasks
- Admins can manage all tasks

### 👥 User Management (Admin)
- View all users with pagination
- Delete users (cannot delete self)
- Role-based display (admin/user)

### ⚡ Performance
- React Query caching
- Optimistic updates
- Lazy loading of routes
- Pagination to reduce load
- Efficient re-renders

## Folder Structure

```
src/
  components/
    Navbar.jsx
    TaskCard.jsx
    UserCard.jsx
    Pagination.jsx
  pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
    Tasks.jsx
    Users.jsx
    AllTasks.jsx
  context/
    AuthContext.jsx
    ThemeContext.jsx
  hooks/
    useAuth.js
  services/
    api.js
  App.jsx
  main.jsx
  index.css
```

## Installation

```bash
cd frontend
npm install
```

## Setup

1. Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:5000
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## API Integration

The frontend connects to the backend at `http://localhost:5000` with the following endpoints:

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/create-admin` - Create admin (admin only)

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users?page=1&limit=10` - List all users (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/my?page=1&limit=10` - Get user's tasks
- `GET /api/tasks?page=1&limit=10` - Get all tasks (admin)
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Key Components

### AuthContext
Manages:
- User authentication state
- Token management
- Login/Logout functions
- User role checking

### ThemeContext
Manages:
- Dark/Light mode state
- Theme persistence
- Theme application to DOM

### React Query Setup
- Automatic caching
- Stale time: 5 minutes
- Cache time: 10 minutes
- No refetch on window focus
- Optimistic updates on mutations

## Usage Examples

### Login
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { login } = useAuth();
  
  const handleLogin = (email, password) => {
    // Call API and update auth state
    login(token, user);
  };
}
```

### Create Task
```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskAPI } from './services/api';

const { mutate } = useMutation({
  mutationFn: (data) => taskAPI.createTask(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['myTasks'] });
  },
});
```

### Theme Toggle
```jsx
import { useTheme } from './context/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

## Styling

Built with Tailwind CSS
- Mobile-first responsive design
- Dark mode support
- Utility-first approach
- Custom scrollbar styling
- Smooth transitions and animations

## Error Handling

- API interceptors for 401 errors
- User-friendly error messages
- Loading states for async operations
- Form validation
- Network error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

✅ Code splitting with React Router
✅ Image optimization
✅ CSS minification via Tailwind
✅ React Query caching strategy
✅ Minimal re-renders with Context API
✅ Lazy loading of components
✅ Production build optimization (Vite)

## Credits & Acknowledgments

**Developed with AI assistance** for rapid prototyping and optimizing repetitive React development tasks. This project showcases modern React patterns including Context API for state management, React Query for server state, React Router for navigation, and Tailwind CSS for responsive design.

The AI assistance was instrumental in:
- Component scaffolding and hierarchy design
- Context setup and hook creation
- React Query configuration and optimization
- Tailwind CSS responsive design patterns
- API integration and error handling
- Accessibility improvements
- Documentation and best practices

---

**Author**: Sheriyans (with AI collaboration)
**License**: MIT
**Last Updated**: 2024

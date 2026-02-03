# News Management System - Frontend

React frontend application for the News Management System with role-based access control.

## Features

### Admin Role
- Manage system accounts (CRUD operations)
- Search accounts
- Create/Update/Delete accounts with confirmation dialogs

### Staff Role
- Manage categories (CRUD operations)
- Manage news articles with tags (CRUD operations)
- View personal news history
- Manage personal profile
- Search functionality for all management pages

## Tech Stack

- **React 19** - Frontend framework
- **React Bootstrap** - UI components with dark theme
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Notifications
- **Bootstrap 5** - CSS framework

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create `.env` file with:
```
VITE_BASE_URL=http://localhost:8080/api
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── modals/          # Reusable modal components
│   ├── Layout.jsx       # Main layout with navigation
│   └── ProtectedRoute.jsx # Route protection
├── context/
│   └── AuthContext.jsx  # Authentication context
├── pages/
│   ├── admin/           # Admin-only pages
│   ├── staff/           # Staff-only pages
│   └── Login.jsx        # Login page
├── services/            # API service layer
│   ├── api.js           # Axios configuration
│   ├── authService.js   # Authentication services
│   ├── accountService.js # Account management
│   ├── categoryService.js # Category management
│   └── newsService.js   # News management
└── App.jsx              # Main application component
```

## Features Implemented

- ✅ Dark theme UI with smooth animations
- ✅ Role-based access control (Admin/Staff)
- ✅ JWT token authentication
- ✅ CRUD operations with confirmation dialogs
- ✅ Search functionality
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Form validation
- ✅ Protected routes

## API Integration

The frontend integrates with Spring Boot REST API endpoints:
- `/api/auth/*` - Authentication
- `/api/admin/*` - Admin operations
- `/api/staff/*` - Staff operations

## Usage

1. Login with your credentials
2. Navigate using the top navigation bar based on your role
3. Use CRUD operations with popup dialogs
4. All delete operations require confirmation
5. Search functionality available on all management pages
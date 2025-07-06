# MovieExplained Frontend - Stage 1 Implementation

This is a Next.js frontend application for MovieExplained, implementing Stage 1 authentication features as specified in the project documentation.

## Features Implemented (Stage 1)

### Authentication System
- **User Registration**: Complete registration form with validation
- **User Login**: JWT-based authentication with automatic token refresh
- **User Profile Management**: Edit profile information including bio and profile image
- **User Preferences**: Manage favorite genres, preferred languages, and notification settings
- **Protected Routes**: Authentication guards for protected pages
- **Admin Access Control**: Role-based access for administrative features

### Technical Stack
- **Framework**: Next.js 15 with App Router
- **UI Components**: Shadcn/ui with Tailwind CSS
- **State Management**: Zustand for global state
- **API Layer**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with automatic token refresh
- **Styling**: Tailwind CSS with custom design tokens
- **Notifications**: Sonner for toast notifications

### Pages Implemented
- **Homepage**: Dynamic content based on authentication status
- **Login/Register**: Complete authentication flows
- **Profile Management**: Edit personal information
- **User Preferences**: Manage favorite genres and settings
- **Admin Dashboard**: Protected admin-only area (placeholder)
- **Movies/Blog/About**: Placeholder pages for future development

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MovieExplained Django backend running on `http://localhost:8000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie_explained_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME=MovieExplained
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── (auth)/                 # Authentication routes
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── profile/            # Profile management
├── admin/                  # Admin dashboard
├── movies/                 # Movies listing (placeholder)
├── blog/                   # Blog posts (placeholder)
├── about/                  # About page
├── layout.tsx              # Root layout with providers
└── page.tsx                # Homepage

components/
├── auth/                   # Authentication components
│   ├── login-form.tsx      # Login form
│   ├── register-form.tsx   # Registration form
│   └── protected-route.tsx # Route protection
├── home/                   # Homepage components
├── layout/                 # Layout components
│   ├── header.tsx          # Site header
│   └── user-nav.tsx        # User navigation menu
├── profile/                # Profile management
│   ├── profile-form.tsx    # Profile editing
│   └── preferences-form.tsx # Preferences management
├── providers/              # React providers
└── ui/                     # Shadcn/ui components

lib/
├── api/                    # API client functions
├── types/                  # TypeScript type definitions
└── utils.ts                # Utility functions

store/
└── auth-store.ts           # Authentication state store

hooks/
└── use-auth.ts             # Authentication React Query hooks
```

## API Integration

The frontend integrates with the MovieExplained Django backend API:

### Authentication Endpoints
- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `POST /api/v1/auth/refresh/` - Token refresh
- `GET /api/v1/auth/profile/` - Get user profile
- `PATCH /api/v1/auth/profile/` - Update user profile
- `GET /api/v1/auth/preferences/` - Get user preferences
- `PATCH /api/v1/auth/preferences/` - Update user preferences
- `POST /api/v1/auth/change-password/` - Change password

### Authentication Flow
1. User registers or logs in
2. JWT tokens (access & refresh) are stored in secure cookies
3. Access token is automatically attached to API requests
4. Token refresh happens automatically on 401 responses
5. User is redirected to login on authentication failure

## Features

### User Registration
- Email and username validation
- Password confirmation
- Optional profile information (name, bio, profile image)
- Automatic login after successful registration

### User Login
- Email/password authentication
- Remember me functionality via persistent tokens
- Automatic redirection after login

### Profile Management
- Edit personal information
- Upload profile image (URL-based)
- View account statistics
- Real-time form validation

### User Preferences
- Select favorite movie genres
- Choose preferred languages
- Manage email notification settings
- Interactive tag-based interface

### Protected Routes
- Automatic redirection for unauthenticated users
- Role-based access control for admin features
- Loading states during authentication checks

## Security Features

- JWT token-based authentication
- Automatic token refresh
- Secure cookie storage
- CSRF protection ready
- Input validation and sanitization
- Protected routes and components

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New UI Components

```bash
npx shadcn@latest add [component-name]
```

## Next Steps (Future Stages)

Stage 1 focuses on authentication. Future stages will include:

- **Stage 2**: Movies management and display
- **Stage 3**: Content management (explanations, blog posts)
- **Stage 4**: AI integration and recommendations
- **Stage 5**: Analytics and feedback systems
- **Stage 6**: Advanced admin dashboard

## Contributing

1. Follow the established patterns for components and hooks
2. Use TypeScript for all new code
3. Add proper error handling and loading states
4. Write meaningful commit messages
5. Test authentication flows thoroughly

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Ensure the Django backend is running on `http://localhost:8000`
2. **Token Refresh Issues**: Check that the backend JWT settings match the frontend expectations
3. **CORS Errors**: Verify CORS settings in the Django backend allow `localhost:3000`
4. **Environment Variables**: Ensure `.env.local` is properly configured

### Development Tips

- Use React Query DevTools to debug API calls
- Check browser Network tab for API request/response details
- Use Zustand DevTools for state debugging
- Enable verbose logging in development mode

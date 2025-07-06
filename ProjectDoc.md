MovieExplained

1. Project Overview
   1.1 Project Description
   MovieExplained is an AI-powered movie blog website that provides comprehensive movie explanations, reviews, and recommendations. The platform combines automated content generation with manual curation through an admin dashboard.
   1.2 Key Features
   Movie Explanations: Detailed breakdowns of movies including plot, themes, and analysis
   Genre Classification: Automatic categorization and genre-based recommendations
   Blog Section: Curated articles about best movies of specific periods
   AI Integration: Automated content generation and recommendations
   Admin Dashboard: Complete content management and analytics system
   User Feedback: Rating and comment system with sentiment analysis

2. Frontend Architecture (Next.js)
   4.1 Project Structure
   movieexplained_frontend/
   ├── package.json
   ├── next.config.js
   ├── tailwind.config.js
   ├── tsconfig.json
   ├── .env.local.example
   ├── public/
   │ ├── images/
   │ ├── icons/
   │ └── favicon.ico
   ├── src/
   │ ├── app/
   │ │ ├── (auth)/
   │ │ ├── (public)/
   │ │ ├── admin/
   │ │ ├── globals.css
   │ │ ├── layout.tsx
   │ │ ├── page.tsx
   │ │ └── loading.tsx
   │ ├── components/
   │ │ ├── ui/
   │ │ ├── layout/
   │ │ ├── movie/
   │ │ ├── content/
   │ │ ├── admin/
   │ │ └── common/
   │ ├── lib/
   │ │ ├── api/
   │ │ ├── auth/
   │ │ ├── utils/
   │ │ └── types/
   │ ├── hooks/
   │ ├── store/
   │ └── styles/
   ├── tests/
   └── docs/

4.2 App Router Structure
src/app/
├── layout.tsx # Root layout
├── page.tsx # Homepage
├── loading.tsx # Global loading
├── error.tsx # Global error
├── not-found.tsx # 404 page
├── (public)/
│ ├── movies/
│ │ ├── page.tsx # Movies listing
│ │ ├── [id]/
│ │ │ ├── page.tsx # Movie details
│ │ │ └── explanation/
│ │ │ └── page.tsx # Movie explanation
│ │ └── genre/
│ │ └── [slug]/
│ │ └── page.tsx # Genre movies
│ ├── blog/
│ │ ├── page.tsx # Blog listing
│ │ ├── [slug]/
│ │ │ └── page.tsx # Blog post
│ │ └── category/
│ │ └── [category]/
│ │ └── page.tsx # Category posts
│ ├── search/
│ │ └── page.tsx # Search results
│ └── about/
│ └── page.tsx # About page
├── (auth)/
│ ├── login/
│ │ └── page.tsx # Login page
│ ├── register/
│ │ └── page.tsx # Register page
│ └── profile/
│ └── page.tsx # User profile
└── admin/
├── layout.tsx # Admin layout
├── page.tsx # Admin dashboard
├── movies/
│ ├── page.tsx # Movies management
│ ├── create/
│ │ └── page.tsx # Create movie
│ └── [id]/
│ └── edit/
│ └── page.tsx # Edit movie
├── content/
│ ├── explanations/
│ │ ├── page.tsx # Explanations management
│ │ ├── create/
│ │ │ └── page.tsx # Create explanation
│ │ └── [id]/
│ │ └── edit/
│ │ └── page.tsx # Edit explanation
│ └── blog-posts/
│ ├── page.tsx # Blog posts management
│ ├── create/
│ │ └── page.tsx # Create blog post
│ └── [id]/
│ └── edit/
│ └── page.tsx # Edit blog post
├── analytics/
│ └── page.tsx # Analytics dashboard
├── feedback/
│ └── page.tsx # Feedback management
└── users/
└── page.tsx # User management

4.3 Component Architecture
4.3.1 UI Components
src/components/ui/
├── button.tsx # Button variants
├── input.tsx # Input fields
├── textarea.tsx # Text areas
├── select.tsx # Select dropdowns
├── modal.tsx # Modal dialogs
├── toast.tsx # Notifications
├── loading.tsx # Loading states
├── pagination.tsx # Pagination
├── card.tsx # Card layouts
├── badge.tsx # Badges
├── tabs.tsx # Tab navigation
├── accordion.tsx # Accordion
├── dropdown.tsx # Dropdown menus
└── rating.tsx # Rating stars

4.3.2 Layout Components
src/components/layout/
├── header.tsx # Site header
├── footer.tsx # Site footer
├── navigation.tsx # Main navigation
├── sidebar.tsx # Sidebar navigation
├── breadcrumb.tsx # Breadcrumb navigation
└── search-bar.tsx # Search functionality

4.3.3 Movie Components
src/components/movie/
├── movie-card.tsx # Movie card display
├── movie-grid.tsx # Movie grid layout
├── movie-details.tsx # Movie details page
├── movie-hero.tsx # Movie hero section
├── movie-cast.tsx # Cast display
├── movie-recommendations.tsx # Recommendations
├── movie-filters.tsx # Movie filters
└── movie-search.tsx # Movie search

4.3.4 Content Components
src/components/content/
├── explanation-card.tsx # Explanation card (public access)
├── blog-post-card.tsx # Blog post card (public access)
├── content-grid.tsx # Content grid (public access)
├── rich-text-editor.tsx # Rich text editor (admin only)
├── comment-section.tsx # Comments (view public, interact auth required)
├── rating-section.tsx # Rating system (view public, rate auth required)
├── bookmark-button.tsx # Bookmark functionality (auth required)
├── share-buttons.tsx # Social sharing (public access)
├── login-prompt.tsx # Login prompt for interactive features
└── auth-guard.tsx # Authentication guard component

4.3.5 Admin Components
src/components/admin/
├── admin-layout.tsx # Admin layout
├── admin-sidebar.tsx # Admin sidebar
├── dashboard-stats.tsx # Dashboard statistics
├── data-table.tsx # Data tables
├── form-builder.tsx # Dynamic forms
├── content-editor.tsx # Content editor
├── media-uploader.tsx # Media upload
├── analytics-charts.tsx # Analytics charts
└── user-management.tsx # User management

4.4 State Management
4.4.1 Zustand Store Structure
src/store/
├── index.ts # Store setup
├── auth-store.ts # Authentication state
├── movie-store.ts # Movie data state
├── content-store.ts # Content state
├── ui-store.ts # UI state
├── admin-store.ts # Admin state
└── types.ts # Store types

4.4.2 React Query Setup
src/lib/api/
├── client.ts # API client setup
├── auth.ts # Auth API calls
├── movies.ts # Movie API calls
├── content.ts # Content API calls
├── admin.ts # Admin API calls
├── analytics.ts # Analytics API calls
└── types.ts # API types

4.5 Key Pages and Features
4.5.1 Homepage Features
Featured movies carousel
Latest explanations
Popular blog posts
Genre-based recommendations
Search functionality
Trending content
4.5.2 Movie Details Page
Movie information display
Cast and crew
Related explanations
Recommendations
User ratings and reviews
Watch trailer integration
4.5.3 Movie Explanation Page
Rich text content
Related movies
Author information
Comments section
Rating system
Social sharing
Reading progress
4.5.4 Blog Section
Blog post listing
Category filtering
Search functionality
Featured posts
Author pages
Tag-based filtering
4.5.5 Admin Dashboard
Analytics overview
Content management
User management
AI content generation
Feedback management
System settings

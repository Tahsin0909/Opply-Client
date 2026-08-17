# Opply Frontend

Opply is a service marketplace frontend built with Next.js, React, and TypeScript. It connects clients, companies, freelancers, and professionals through job postings, project bidding, paid consultations, agreements, messaging, notifications, reviews, and Stripe-powered payments.

This repository contains the client-side application. It expects a separate backend API and real-time Socket.IO service.

## Features

### Authentication and accounts

- Individual user registration
- Company registration
- Email/OTP verification
- Sign in and sign out
- Forgot-password and reset-password flows
- Cookie-based access token handling
- Protected application routes through Next.js middleware

### Jobs

- Browse and search jobs
- Filter jobs by category and related criteria
- Create, update, and delete job posts
- Apply to jobs
- View applicants
- View applied jobs
- Save jobs as favorites

### Projects and bidding

- Browse and search projects
- Create, update, and delete projects
- Submit project bids
- View received bids and bid requests
- Withdraw bids
- Create and manage agreements
- Track pending and delivered projects
- Submit project deliveries
- Handle project cancellation flows
- Leave and view reviews
- Save projects as favorites

### Consultations and bookings

- Browse professional consultations
- Create, update, and delete consultation listings
- View consultation details
- Book consultations
- View personal booking history
- View consultation bookings
- Join consultation sessions

### Profiles

- Individual/talent profiles
- Company profiles
- Profile editing
- Education management
- Experience management
- Skills and professional information
- Resume/CV display with PDF rendering

### Payments

- Stripe Elements checkout integration
- Agreement payments
- Consultation/booking payments
- Job payment initiation
- Payer and receiver payment history
- Stripe Connect onboarding
- Stripe account login links
- Stripe account status checks
- Withdrawal requests

### Messaging and notifications

- Real-time Socket.IO connection
- User messaging interface
- Notification history
- Unread notification counts
- Mark-one and mark-all-as-read actions

### Content and discovery

- Blog listing and blog details
- Recent jobs and projects on the home page
- Categories
- Favorites
- Testimonials
- FAQ/about/work-process sections
- Responsive desktop and mobile navigation

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 3 |
| UI primitives | Radix UI / shadcn-style components |
| Icons | Lucide React + React Icons |
| State management | Redux Toolkit |
| Server state/API | RTK Query |
| Persistence | redux-persist |
| Forms | React Hook Form |
| Validation | Zod |
| Payments | Stripe / Stripe Elements |
| Real-time | Socket.IO Client |
| Animation | Framer Motion |
| Sliders | Swiper |
| PDF rendering | React PDF |
| Notifications | Sonner |

## Project Structure

```text
src/
├── app/                     # Next.js App Router pages and layouts
│   ├── (auth)/              # Authentication pages
│   └── (withCommonLayout)/  # Main application pages
├── assets/                  # Images and static project assets
├── components/              # Shared/reusable UI components
├── context/                 # React contexts, including Socket.IO
├── feature/                 # Feature-specific UI and business logic
│   ├── auth/
│   ├── blogs/
│   ├── booking/
│   ├── consultation/
│   ├── jobs/
│   ├── messages/
│   ├── notification/
│   ├── payment/
│   ├── profile/
│   └── projects/
├── hooks/                   # Custom React hooks
├── interfaces/              # Shared TypeScript interfaces
├── lib/                     # Utility/helper functions
├── redux/
│   ├── api/                 # RTK Query API modules
│   ├── features/            # Redux slices
│   ├── Provider.tsx
│   └── store.ts
└── middleware.ts            # Authentication route protection
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/signIn` | User login |
| `/signUp` | Individual registration |
| `/company-signUp` | Company registration |
| `/forget-password` | Password recovery |
| `/otp` | OTP verification |
| `/jobs` | Job discovery |
| `/add-jobs` | Create a job |
| `/applied-jobs` | User job applications |
| `/job-list` | Job management/listing |
| `/project` | Project discovery |
| `/add-projects` | Create a project |
| `/my-project` | User project management |
| `/bid-requests/[id]` | Project bid requests |
| `/consultation` | Consultation discovery |
| `/add-consultation` | Create a consultation |
| `/book-consultation/[id]` | Book a consultation |
| `/my-consultation` | Consultation management |
| `/messaging` | Messaging |
| `/profile` | User profile |
| `/company-profile` | Company profile |
| `/favorite` | Saved items |
| `/payment` | Payments and payment history |
| `/blog` | Blog listing |
| `/blog/[id]` | Blog details |

## API Architecture

The frontend uses Redux Toolkit Query. The shared API client is defined in:

```text
src/redux/api/baseApi.ts
```

The configured base URL is read from `NEXT_PUBLIC_URL`, after environment selection in `next.config.ts`.

The access token is read from the `token` browser cookie and attached to API requests through the `Authorization` header.

Feature API modules include:

```text
src/redux/api/auth/
src/redux/api/job/
src/redux/api/projects/
src/redux/api/bid/
src/redux/api/agreement/
src/redux/api/consultation/
src/redux/api/booking/
src/redux/api/payment/
src/redux/api/stripe/
src/redux/api/profile/
src/redux/api/review/
src/redux/api/favourite/
src/redux/api/blog/
src/redux/api/delivey/
src/redux/api/sessionsApis/
```

## Getting Started

### Prerequisites

Install the following before running the application:

- Node.js 20+
- npm or pnpm
- A running Opply-compatible backend API
- A Stripe publishable key for payment features

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

The repository currently contains both `package-lock.json` and `pnpm-lock.yaml`. For consistent dependency resolution within a team, choose one package manager and keep only its lockfile updated.

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_ENV=development

NEXT_PUBLIC_URL_DEV=http://localhost:3909/api/v1
NEXT_PUBLIC_URL=https://your-production-api.example.com/api/v1

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV=pk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here

NEXT_PUBLIC_SOCKET_URL_DEV=http://localhost:3909
NEXT_PUBLIC_SOCKET_URL=https://your-production-api.example.com
```

Do not commit real environment credentials or private keys to Git.

### Environment selection

`next.config.ts` selects values using `NEXT_PUBLIC_ENV`:

- When `NEXT_PUBLIC_ENV=production`, the production variables are used.
- For any other value, the `_DEV` variables are used.

For example, in development the effective API URL comes from `NEXT_PUBLIC_URL_DEV`, not `NEXT_PUBLIC_URL`.

## Socket.IO Configuration

The project defines socket environment variables in `next.config.ts`, but the current Socket.IO provider connects directly to:

```text
https://api.Opply.com
```

The connection is created in:

```text
src/context/SocketContext.tsx
```

If the backend socket server is hosted elsewhere, update the provider to use the configured environment variable instead of the hard-coded URL, for example:

```ts
const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  auth: { token: Cookies.get("token") },
});
```

## Run the Application

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

By default, Next.js starts on port `3000` unless another port is configured.

## PM2 Deployment

The repository contains an `ecosystem.config.js` file configured for PM2.

Build the project first:

```bash
npm install
npm run build
```

Then start it with PM2:

```bash
pm2 start ecosystem.config.js
```

Useful PM2 commands:

```bash
pm2 status
pm2 logs opply-client
pm2 restart opply-client
pm2 stop opply-client
pm2 save
```

The current PM2 application name is:

```text
opply-client
```

and it runs on port `3000`.

## Authentication and Protected Routes

Authentication is token-based. After a successful verified login, the frontend stores the access token in a browser cookie named:

```text
token
```

`src/middleware.ts` checks this cookie before allowing access to protected routes such as jobs, projects, consultations, messaging, favorites, and profile-related pages.

Unauthenticated visitors attempting to access a protected route are redirected to:

```text
/signIn
```

## State Management

Global state is configured in:

```text
src/redux/store.ts
```

The application uses:

- Redux Toolkit for client state
- RTK Query for API requests and cache management
- redux-persist for browser-side persistence
- A no-op storage implementation during SSR to avoid browser storage access on the server

The RTK Query cache itself is excluded from persistence.

## Forms and Validation

Forms use React Hook Form with Zod validation. This pattern is used across authentication, jobs, projects, and consultations.

Typical flow:

```text
React Hook Form
      ↓
Zod schema validation
      ↓
RTK Query mutation
      ↓
Backend API
      ↓
Sonner success/error notification
```

## Payments

Stripe Elements is initialized with:

```text
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

Payment-related code is primarily located in:

```text
src/components/payment/
src/feature/payment/
src/redux/api/payment/
src/redux/api/stripe/
```

The backend is responsible for sensitive Stripe operations such as creating payment intents, Stripe Connect onboarding sessions, and withdrawal processing. Never place Stripe secret keys in this frontend project.

## Styling

The project uses Tailwind CSS with custom theme values in `tailwind.config.ts`.

Important custom colors include:

```text
primary     #3937E7
accent      #31B3BA
secondary   #0ACF83
warning     #F97066
bg_footer   #090C1D
```

Custom fonts are configured through Next.js font handling and exposed as:

```text
font-dmSans
font-robotoFlex
```

The project also contains shadcn-compatible component configuration in `components.json` and uses Radix primitives for selected UI controls.

## Image Handling

`next.config.ts` currently allows remote images from any HTTP or HTTPS hostname. This supports profile photos, company images, job images, blog assets, and other remotely hosted content.

For a stricter production security policy, replace the wildcard image host configuration with the specific domains actually used by the platform.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run the configured lint command |

## Backend Requirements

This frontend is not a standalone system. To use all functionality, the backend needs to provide APIs for at least:

- Authentication and OTP verification
- Users and profiles
- Jobs and applications
- Categories/subcategories
- Projects and bids
- Agreements
- Deliveries
- Reviews
- Favorites
- Consultations
- Bookings/sessions
- Blogs
- Payments and withdrawals
- Stripe Connect
- Real-time messaging and notifications through Socket.IO

The API base URL configured in the environment must point to the backend prefix expected by these endpoints.

## Development Notes

- The project uses the `@/*` path alias for imports from `src/*`.
- TypeScript strict mode is enabled.
- The application uses the Next.js App Router.
- Authentication middleware depends on the browser cookie being named `token`.
- Several components contain placeholder or mock image/data fallbacks for missing backend content.
- The Socket.IO URL is currently hard-coded and should be environment-driven for multi-environment deployment.
- Both npm and pnpm lockfiles are present; standardizing on one package manager is recommended.

## Security Notes

- Never commit `.env` or `.env.local` files containing real credentials.
- Only Stripe publishable keys belong in `NEXT_PUBLIC_*` frontend variables.
- Stripe secret keys, database credentials, JWT secrets, and private backend credentials must stay on the server.
- Review the wildcard remote-image configuration before production if the application should load images only from trusted hosts.
- Consider server-managed `HttpOnly` authentication cookies if stronger protection against client-side token access is required.

## License

No license file is currently included in this repository. Add a license before distributing the project publicly if required.

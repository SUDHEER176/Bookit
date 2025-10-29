# 🎫 Bookit

> A modern, full-stack booking platform built with React, TypeScript, and Node.js

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)

Bookit is a production-ready booking application that demonstrates enterprise-level architecture with a clean separation between frontend and backend services. Built with modern technologies and best practices, it showcases scalable design patterns suitable for real-world applications.

## ✨ Features

- **Real-time Availability** - Dynamic experience scheduling with instant availability checking
- **Smart Booking System** - Seamless reservation flow with validation and confirmation
- **Promo Code Engine** - Flexible discount system with code validation
- **Responsive Design** - Mobile-first UI built with Tailwind CSS and shadcn/ui
- **Type-Safe Architecture** - End-to-end TypeScript for reliability and maintainability
- **RESTful API** - Well-documented backend with clean endpoint structure

## 🏗️ Architecture

### Tech Stack

**Frontend**
- **React 18** with **Vite** for lightning-fast development
- **TypeScript** for type safety and developer experience
- **Tailwind CSS** + **shadcn/ui** for modern, accessible components
- **React Router** for client-side routing

**Backend**
- **Node.js** + **Express** REST API
- **TypeScript** for consistent typing across the stack
- **Supabase** (PostgreSQL) for reliable data persistence
- Modular architecture with services, models, and routes

### Project Structure

```
bookit/
├── backend/                    # Express API Server
│   ├── src/
│   │   ├── config/            # Database & environment config
│   │   ├── models/            # Data models & types
│   │   ├── routes/            # API endpoint definitions
│   │   ├── services/          # Business logic layer
│   │   └── server.ts          # Application entry point
│   ├── sql/
│   │   └── schema.sql         # Database schema definition
│   └── package.json
│
└── bookit/                     # React Frontend
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Route-level components
    │   ├── lib/               # API client & utilities
    │   └── main.tsx           # Application entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bookit.git
   cd bookit
   ```

2. **Set up environment variables**

   Backend (`backend/.env`):
   ```env
   PORT=5000
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   Frontend (`bookit/.env`):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../bookit
   npm install
   ```

4. **Start development servers**

   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd bookit
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📡 API Reference

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/experiences` | Retrieve all experiences |
| `GET` | `/api/experiences/:id` | Get experience details with availability |
| `POST` | `/api/bookings` | Create a new booking |
| `POST` | `/promo/validate` | Validate promotional code |

## 🛠️ Development

### Available Scripts

**Backend**
```bash
npm run dev      # Start development server with hot reload
npm start        # Start production server
npm run seed     # Populate database with sample data
```

**Frontend**
```bash
npm run dev      # Start Vite development server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Database Setup

The application uses Supabase (PostgreSQL). Database schema is located in `backend/sql/schema.sql`. 

To initialize:
1. Create a Supabase project
2. Run the schema file in the SQL editor
3. Optional: Run `npm run seed` to populate with sample data

## 🎨 Frontend Highlights

- **Component Library**: Built on shadcn/ui for consistent, accessible design
- **State Management**: React hooks with custom API client
- **Routing**: React Router for seamless navigation
- **Styling**: Utility-first Tailwind CSS with custom theme

## 🔐 Backend Highlights

- **Layered Architecture**: Clean separation of routes, services, and models
- **Type Safety**: Comprehensive TypeScript interfaces
- **Error Handling**: Centralized error management
- **Database Integration**: Supabase client with connection pooling

## 📦 Deployment

### Production Build

**Frontend**
```bash
cd bookit
npm run build
# Output in bookit/dist/
```

**Backend**
```bash
cd backend
npm run build  # If build script exists
npm start
```

### Environment Considerations

- Update `VITE_API_URL` to your production API endpoint
- Ensure Supabase credentials are set in production environment
- Configure CORS settings for your domain
- Consider using a process manager like PM2 for the backend

---

**Built with** ❤️ **using React, TypeScript, and Node.js**

*This project showcases full-stack development skills including system design, API development, database modeling, and modern frontend architecture.*


# AiAppsy Web Studio

🚀 AI-powered visual website builder - Create, edit, and deploy websites using AI

## Overview

AiAppsy Web Studio is an AI-powered visual website builder similar to Lovable.dev that allows users to:

- Describe their business in natural language
- Automatically generate complete multi-page websites
- Edit and refine pages via AI-driven assistant
- Preview websites live in an interactive UI
- Export to HTML/CSS, React, or Elementor JSON
- Deploy directly to Coolify servers with one click

## Tech Stack

### Frontend
- ⚛️ React 18
- ⚡ Vite 5
- 🎨 TailwindCSS 3
- 📘 TypeScript
- 🐻 Zustand (State Management)
- 🌐 React Router 6
- 🎭 Framer Motion

### Backend
- 🟢 Node.js + Express
- 🔷 TypeScript
- 🗄️ PostgreSQL
- ⚙️ Prisma ORM
- 🔐 JWT Authentication
- ✅ Zod Validation

### DevOps
- 🐳 Docker + Docker Compose
- 📝 ESLint + Prettier

## Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aiappsy/web-studio.git
cd web-studio
```

2. Start all services with Docker:
```bash
docker-compose up
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Development Setup (Without Docker)

#### Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
web-studio/
├── frontend/          # React + Vite application
├── backend/           # Express API microservice
├── docker-compose.yml # Development environment
├── docs/              # Documentation
└── README.md
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://webstudio:devpassword@localhost:5432/webstudio_db
JWT_SECRET=your-secret-key-change-in-production
PORT=3001
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

## Development Roadmap

- [x] **Phase 1**: Foundation (React UI + Backend API + Database)
- [ ] **Phase 2**: Real AI Integration (Claude/GPT)
- [ ] **Phase 3**: Export System (HTML/React/Elementor)
- [ ] **Phase 4**: Deployment Engine (Coolify/Hestia/GitHub Pages)
- [ ] **Phase 5**: Polish & Production

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

Proprietary - AiAppsy © 2025

## Support

For issues and questions, contact: support@aiappsy.com

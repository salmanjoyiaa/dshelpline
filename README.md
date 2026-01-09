# ServiceFlow - Multi-Tenant Service Dispatch Dashboard

A modern, production-ready service dispatch dashboard built with **Next.js 14+**, **Supabase**, and **TypeScript**. Perfect for managing service requests and providers across multiple organizations (locksmith, window cleaning, plumbing, etc.).

## 🌟 Features

### Core Functionality
- ✅ **Multi-tenant architecture** with Row Level Security (RLS)
- ✅ **Complete CRUD operations** for requests and providers
- ✅ **Advanced status management** with validation rules
- ✅ **Dashboard overview** with real-time KPI cards
- ✅ **Analytics page** with provider performance metrics
- ✅ **Mobile responsive design** with hamburger navigation
- ✅ **Form validation** with user-friendly error messages
- ✅ **Soft deletes** for data integrity and recovery

### Security & Performance
- ✅ **Database-level RLS** prevents cross-organization data leaks
- ✅ **Auth middleware** protects dashboard routes
- ✅ **Session management** with persistent cookies
- ✅ **Skeleton loaders** for faster perceived performance
- ✅ **Optimistic UI updates** for better UX
- ✅ **Error boundaries** catch and handle crashes gracefully

### Developer Experience
- ✅ **Full TypeScript** with comprehensive type definitions
- ✅ **Component composition** for reusability
- ✅ **Clean folder structure** for easy navigation
- ✅ **Utility functions** for common operations
- ✅ **Comprehensive documentation** and guides
- ✅ **Demo data** for immediate testing

---

## 🚀 Quick Start (5 minutes)

### 1. Setup Supabase Project
```bash
# Visit supabase.com → New Project
# Name: ServiceFlow
# Get credentials from Project Settings → API
```

### 2. Create Environment File
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Initialize Database
- SQL Editor in Supabase
- Copy `scripts/setup.sql`
- Run (creates schema + dummy data)

### 4. Create Auth Users
```
Email: salman@locksmith.com | Password: Test123456
Email: mustafa@windowcleaning.com | Password: Test123456
```

Then link users to organizations in SQL:
```sql
UPDATE users SET organization_id = (SELECT id FROM organizations WHERE business_type = 'locksmith' LIMIT 1) WHERE email = 'salman@locksmith.com';
UPDATE users SET organization_id = (SELECT id FROM organizations WHERE business_type = 'window_cleaning' LIMIT 1) WHERE email = 'mustafa@windowcleaning.com';
```

### 5. Start Development
```bash
npm install
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed installation & troubleshooting
- **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Comprehensive test cases
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical overview

---

## 🎯 Pages & Features

### Public Pages
| Route | Purpose |
|-------|---------|
| `/` | Marketing homepage with features & CTA |
| `/sign-in` | Login form with demo account info |

### Protected Dashboard
| Route | Purpose | Features |
|-------|---------|----------|
| `/dashboard` | Overview | 4 KPI cards + recent requests |
| `/dashboard/requests` | Requests CRUD | Filter, create, edit, delete with status validation |
| `/dashboard/providers` | Providers CRUD | Manage service providers, edit status |
| `/dashboard/analytics` | Analytics | KPI metrics, status distribution, provider performance |

---

## 🏗️ Architecture

### Database Schema
```sql
organizations
├── id, name, business_type, created_at

users
├── id (references auth.users)
├── email, full_name, organization_id, role

service_providers
├── id, organization_id, name, phone, email, status
├── total_jobs_completed, rating
├── deleted_at (soft delete), created_at, updated_at

service_requests
├── id, organization_id
├── customer_name, customer_phone, customer_address
├── problem_description, status
├── assigned_provider_id (nullable)
├── deleted_at (soft delete), created_at, updated_at

customers
├── id, organization_id, name, phone, address
├── total_requests, rating_given
├── deleted_at (soft delete), created_at
```

### Status Flow
```
pending ──→ assigned ──→ in_progress ──→ completed
   ↓         ↓ ↑             ↓
cancelled ←──┴─┴─────────────┘
```

### Row Level Security
All queries automatically filtered by user's organization:
```sql
WHERE organization_id = (SELECT organization_id FROM users WHERE id = auth.uid())
AND deleted_at IS NULL
```

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14+, React 19, TypeScript |
| **UI Components** | shadcn/ui (Radix UI) |
| **Styling** | TailwindCSS 4, PostCSS |
| **Forms** | React Hook Form, Zod validation |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth (email/password) |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn
- Supabase account

### Steps
```bash
# Clone or download project
cd service-flow-build

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Add your Supabase credentials to .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 🧪 Testing

Use provided test accounts:
```
Locksmith Account:
  Email: salman@locksmith.com
  Password: Test123456

Window Cleaning Account:
  Email: mustafa@windowcleaning.com
  Password: Test123456
```

See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for comprehensive test cases.

---

## 🔐 Security Features

- **Row Level Security (RLS)**: Database-enforced multi-tenancy
- **Auth Middleware**: Protects `/dashboard` routes
- **Soft Deletes**: Preserve data, prevent accidental loss
- **Form Validation**: Required fields, format checking
- **Session Persistence**: Cookies maintain user state
- **Error Handling**: User-friendly error messages

---

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| **Desktop (1920px)** | Full sidebar + content |
| **Tablet (768px)** | Hamburger menu, collapsible sidebar |
| **Mobile (375px)** | Hamburger menu, responsive tables |

---

## 🎨 UI Components

Built with shadcn/ui:
- **Button**, **Input**, **Label**, **Card**
- **Dialog**, **Alert Dialog**, **Select**
- **Table**, **Badge**, **Tabs**
- **Breadcrumb**, **Drawer**, **Dropdown Menu**
- Custom **Toast Notifications**

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# 1. Push code to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import to Vercel
# vercel.com → Import Project → Select repo

# 3. Add environment variables in Vercel settings
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. Deploy!
```

### Docker
```bash
# Build
docker build -t serviceflow .

# Run
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... serviceflow
```

### Other Platforms
- ✅ AWS (Lambda, ECS, EC2)
- ✅ Google Cloud (Cloud Run, App Engine)
- ✅ Heroku, Railway, Render

---

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Project Structure
```
app/                 # Next.js App Router
components/          # React components
lib/                 # Utilities, types, Supabase clients
scripts/            # SQL setup scripts
middleware.ts       # Auth middleware
```

---

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Real-time updates (Supabase subscriptions)
- Mapbox integration for location tracking
- Email notifications
- Advanced analytics charts
- Mobile app (React Native)
- Payment processing (Stripe)

---

## 📋 Roadmap

### v1.1 (Next)
- [ ] Real-time request updates
- [ ] Email notifications
- [ ] Advanced analytics dashboard

### v2.0
- [ ] Mapbox provider location tracking
- [ ] Mobile app (React Native)
- [ ] Payment processing
- [ ] Advanced scheduling

### v3.0
- [ ] AI-powered provider assignment
- [ ] Customer ratings system
- [ ] Automated invoicing
- [ ] Integration marketplace

---

## 🐛 Troubleshooting

### Cannot Sign In
- Verify credentials in Supabase Auth
- Check `.env.local` has correct keys
- Clear browser cookies

### No Data Showing
- Verify RLS policies in SQL Editor
- Check user's organization_id is set
- Ensure `deleted_at IS NULL` in queries

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Check `tsconfig.json` for errors

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.

---

## 📄 License

MIT - Free for personal and commercial use

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

## 📞 Support

For help:
1. Check documentation in this repo
2. Review [Supabase docs](https://supabase.com/docs)
3. Check browser console for errors
4. Verify database in Supabase SQL Editor

---

## 🎉 Get Started

Everything is ready! Follow [QUICKSTART.md](QUICKSTART.md) to get up and running in 5 minutes.

**Happy building!** 🚀

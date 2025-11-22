# Haven - Domestic Violence Support Platform

A production-grade, trauma-informed platform designed to support domestic violence victims with secure access to resources, risk assessment tools, community support, and specialist assistance.

## 🎯 Purpose

Haven provides a safe, discrete, and accessible space for individuals experiencing domestic violence to:
- Assess their safety with a validated risk assessment tool
- Access verified resources and hotlines
- Connect with specialists (lawyers, psychologists)
- Share experiences in a supportive community (public or private)
- Maintain private journals for documentation

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Validation**: Zod
- **Database**: SQLite (placeholder - see `/scripts` for schema)

### Project Structure

\`\`\`
├── app/                      # Next.js pages (App Router)
│   ├── page.tsx             # Homepage
│   ├── help/                # Emergency triage
│   ├── risk-form/           # Multi-step risk assessment
│   ├── community/           # Public/private posts
│   ├── resources/           # Information & hotlines
│   ├── specialist/          # Specialist dashboard
│   ├── support-flow/        # Case escalation flow
│   └── chat/[caseId]/       # Secure messaging
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── layout/              # Layout components (Quick Exit)
├── redux/
│   ├── store.ts            # Redux store configuration
│   ├── hooks.ts            # Typed Redux hooks
│   └── slices/             # State slices
│       ├── authSlice.ts
│       ├── riskFormSlice.ts
│       └── communitySlice.ts
├── validators/
│   └── risk-form.ts        # Zod schemas for forms
├── services/
│   └── api.ts              # API abstraction layer
└── lib/
    └── utils.ts            # Utility functions
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd haven-platform

# Install dependencies
pnpm install

# Run development server
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

This is a demo application running client-side. For production:

\`\`\`env
# Add to .env.local
DATABASE_URL=<your-sqlite-connection-string>
NEXT_PUBLIC_API_URL=<your-api-url>
\`\`\`

## 🧩 Core Features

### 1. Emergency Triage (`/help`)

**Flow:**
- User is asked: "Is it urgent?"
- **YES** → Immediate dial to 112 (emergency services)
- **NO** → Redirect to Risk Assessment Form

### 2. Risk Assessment Form (`/risk-form`)

**Features:**
- Multi-step wizard with progress indicator
- Zod validation for all inputs
- Autosave capability (Redux state)
- Scoring algorithm:
  - **0-40**: Low risk → Redirect to Resources
  - **41-80**: High risk → Initiate Support Flow
  - **81-100**: Critical risk → Auto-escalate + Call 112

**State Management:**
\`\`\`typescript
// Redux slice handles:
- Current step tracking
- Answer storage
- Score calculation
- Result routing
\`\`\`

### 3. Support Flow (`/support-flow`)

**Automatic Escalation:**
- Creates specialist case request
- Assigns priority based on risk score
- Enables secure chat with assigned specialist
- Tracks case status (Pending → Active → Resolved)

### 4. Community (`/community`)

**Features:**
- Public posts (visible to all users)
- Private journal entries (only visible to author)
- Like/support system for public posts
- Filter by All/Public/Private
- Trauma-informed UI patterns

**Privacy:**
- Private posts are styled distinctly
- No likes/comments on private posts
- Anonymous usernames by default

### 5. Resources (`/resources`)

**Content:**
- Emergency hotlines (24/7)
- Legal aid information
- Safety planning guides
- Financial assistance resources
- Search & filter functionality

### 6. Specialist Dashboard (`/specialist`)

**Features:**
- Pending cases queue (sorted by risk)
- Active conversations
- Case details & risk assessment results
- Secure messaging interface
- Response tracking & analytics

### 7. Chat Interface (`/chat/[caseId]`)

**Features:**
- End-to-end encrypted messaging (placeholder)
- File upload support (placeholder)
- Read receipts
- Specialist notes
- Case history access

## 🔒 Security Features

### Quick Exit Button
- **Global component** (visible on all pages)
- Immediately redirects to Google.com
- Clears browser history via `window.location.replace()`
- Prominent red button with keyboard accessibility

### Privacy Considerations
- No tracking of sensitive user actions
- Private posts isolated in state
- Session storage for autosave
- Content moderation placeholders

### Trauma-Informed Design
- Soft, calming color palette (no bright reds except emergencies)
- Clear escape routes on every screen
- Non-alarming language
- Large tap targets (mobile-first)
- WCAG 2.1 AA contrast ratios

## 📊 State Management

### Redux Slices

**authSlice:**
\`\`\`typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
\`\`\`

**riskFormSlice:**
\`\`\`typescript
interface RiskFormState {
  currentStep: number
  answers: Record<string, number>
  totalScore: number
  result: 'low' | 'high' | 'critical' | null
  isComplete: boolean
}
\`\`\`

**communitySlice:**
\`\`\`typescript
interface CommunityState {
  posts: Post[]
  filter: 'all' | 'private' | 'public'
}
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: `oklch(0.205 0 0)` - Dark gray (trustworthy, calming)
- **Secondary**: `oklch(0.97 0 0)` - Light gray (soft backgrounds)
- **Accent**: Minimal use
- **Destructive**: `oklch(0.577 0.245 27.325)` - Muted red (not alarming)

### Typography
- **Font**: Geist (sans-serif)
- **Scale**: Mobile-first with responsive breakpoints
- **Line Height**: 1.5-1.6 for readability

## 🧪 Testing Considerations

### Unit Tests
- Redux slice logic (reducers, actions)
- Form validation (Zod schemas)
- Risk scoring algorithm

### Integration Tests
- Risk form flow (multi-step navigation)
- Community post creation/filtering
- Support flow escalation

### E2E Tests
- Emergency triage flow
- Complete risk assessment
- Specialist case assignment

## 🚢 Deployment

### Vercel (Recommended)
\`\`\`bash
vercel deploy
\`\`\`

### Environment Setup
1. Set up SQLite database
2. Configure environment variables
3. Run database migrations (`/scripts`)
4. Deploy Next.js app

## 📖 API Layer

### Services Structure

\`\`\`typescript
// services/api.ts
export const api = {
  auth: {
    login: (creds) => apiRequest('/auth/login', { method: 'POST', body: creds }),
    register: (data) => apiRequest('/auth/register', { method: 'POST', body: data }),
  },
  riskForm: {
    submit: (data) => apiRequest('/risk-form', { method: 'POST', body: data }),
    getHistory: () => apiRequest('/risk-form/history'),
  },
  cases: {
    create: (data) => apiRequest('/cases', { method: 'POST', body: data }),
    list: () => apiRequest('/cases'),
  }
}
\`\`\`

### Error Handling
- Retry logic for failed requests
- Graceful degradation
- User-friendly error messages
- Fallback to cached data

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Enforced on commit
- **Prettier**: Auto-formatting
- **Naming**: kebab-case for files, PascalCase for components

### Component Guidelines
- One component per file
- Props typed with TypeScript
- Use shadcn/ui components
- Mobile-first responsive design

### State Management
- Redux for global state
- Local state for UI-only data
- No fetching in useEffect (use SWR or server components)

## 📝 Future Enhancements

- [ ] Real backend integration (Node.js + SQLite)
- [ ] End-to-end encryption for chat
- [ ] Push notifications for specialists
- [ ] Multilingual support
- [ ] Offline mode (PWA)
- [ ] Real-time messaging (WebSockets)
- [ ] Advanced analytics dashboard
- [ ] AI-powered risk assessment refinement

## 🆘 Support & Resources

### National Hotlines
- **National DV Hotline**: 1-800-799-7233
- **Emergency Services**: 911/112
- **Crisis Text Line**: Text HOME to 741741

### Contributing
This is a sensitive application. Please ensure all contributions:
- Maintain trauma-informed design principles
- Prioritize user safety and privacy
- Follow accessibility guidelines
- Include comprehensive tests

## 📄 License

This project is licensed under the MIT License.

---

**Important Note**: This application handles sensitive information. Always prioritize user safety, implement proper security measures, and comply with relevant data protection regulations (GDPR, HIPAA, etc.) in production.

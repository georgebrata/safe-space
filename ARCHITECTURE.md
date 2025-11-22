# SafeSpace Platform - Technical Architecture

## System Overview

SafeSpace is a Single Page Application (SPA) built with Next.js 15 that provides domestic violence support services. The platform is designed with security, accessibility, and trauma-informed principles at its core.

## Architecture Layers

### 1. Presentation Layer (UI)
- **Framework**: Next.js 15 App Router
- **Components**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Icons**: Lucide React

### 2. State Management Layer
- **Library**: Redux Toolkit
- **Slices**:
  - `authSlice`: User authentication & role management
  - `riskFormSlice`: Risk assessment state & scoring
  - `communitySlice`: Posts, filters, and interactions

### 3. Data Validation Layer
- **Library**: Zod
- **Schemas**: Form validation, API contracts
- **Location**: `/validators`

### 4. Service Layer
- **API Abstraction**: `/services/api.ts`
- **Functions**: HTTP requests, error handling, retries
- **Mock Implementation**: Currently client-side only

### 5. Data Layer (Future)
- **Database**: SQLite
- **Location**: `/scripts` for schema definitions
- **ORM**: Direct SQL (no ORM by design for simplicity)

## State Flow Diagram

\`\`\`
User Action → Component → Dispatch Redux Action → Reducer Updates State
                ↓                                          ↓
          Update UI ←───────────────────────── Selector Reads State
\`\`\`

## Risk Assessment Flow

\`\`\`
/help → Is Urgent?
         ├─ YES → Call 112 (tel: link)
         └─ NO → /risk-form
                   ↓
              Multi-step form (Redux state)
                   ↓
              Calculate Score (Redux reducer)
                   ↓
              ├─ 0-40 (LOW) → /resources
              ├─ 41-80 (HIGH) → /support-flow
              └─ 81-100 (CRITICAL) → /support-flow + Call 112
\`\`\`

## Component Architecture

### Atomic Design Pattern

**Atoms** (Basic UI Elements)
- Button, Input, Card, Badge, etc. (shadcn/ui)

**Molecules** (Combinations)
- Post Card (Card + Button + Text)
- Risk Question (Card + Buttons + Progress)

**Organisms** (Complex Components)
- Community Feed
- Risk Form Wizard
- Specialist Dashboard

**Templates** (Page Layouts)
- Main Layout (with Quick Exit)
- Specialist Layout
- Chat Layout

**Pages** (Routes)
- `/` - Homepage
- `/help` - Emergency Triage
- `/risk-form` - Assessment
- `/community` - Feed
- `/specialist` - Dashboard

## Redux State Shape

\`\`\`typescript
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean
  },
  riskForm: {
    currentStep: number,
    answers: Record<string, number>,
    totalScore: number,
    result: 'low' | 'high' | 'critical' | null,
    isComplete: boolean
  },
  community: {
    posts: Post[],
    filter: 'all' | 'private' | 'public'
  }
}
\`\`\`

## Routing Strategy

### Public Routes
- `/` - Homepage
- `/help` - Emergency triage
- `/resources` - Public resources
- `/community` - Community (requires guest access)

### Protected Routes (Future)
- `/risk-form` - Requires session
- `/chat/:id` - Requires authentication
- `/specialist` - Requires specialist role

### Route Guards (Future Implementation)
\`\`\`typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Check authentication
  // Check role permissions
  // Redirect if unauthorized
}
\`\`\`

## Security Architecture

### Client-Side Security
1. **Quick Exit Button**: Global component that replaces history
2. **Private Posts**: Isolated in Redux state with clear visual indicators
3. **Content Moderation**: Placeholder logic for filtering

### Future Server-Side Security
1. **Authentication**: JWT tokens with httpOnly cookies
2. **Authorization**: Role-based access control (RBAC)
3. **Rate Limiting**: Prevent abuse of API endpoints
4. **Data Encryption**: At-rest and in-transit encryption
5. **CSP Headers**: Content Security Policy for XSS prevention

## Performance Considerations

### Code Splitting
- Automatic route-based splitting (Next.js)
- Dynamic imports for heavy components

### State Optimization
- Memoized selectors (future)
- Normalized state shape (future)
- Throttled/debounced actions

### Rendering Strategy
- Server Components for static content
- Client Components for interactive features
- Streaming for large data sets (future)

## Accessibility (WCAG 2.1 AA)

### Implementation
- Semantic HTML (`<main>`, `<nav>`, `<article>`)
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Color contrast ratios

### Testing
- Automated (axe-core)
- Manual (keyboard-only navigation)
- Screen reader testing (NVDA, JAWS, VoiceOver)

## Error Handling Strategy

### Client-Side
\`\`\`typescript
try {
  // API call
} catch (error) {
  // Log error
  // Show user-friendly message
  // Fallback to cached data
}
\`\`\`

### Server-Side (Future)
\`\`\`typescript
// Global error handler
app.use((err, req, res, next) => {
  logger.error(err)
  res.status(500).json({ 
    error: 'Something went wrong',
    requestId: req.id 
  })
})
\`\`\`

## Deployment Architecture (Future)

\`\`\`
User → Vercel Edge Network → Next.js App
                                  ↓
                            SQLite Database
                                  ↓
                          External Services
                          (SMS, Email, etc.)
\`\`\`

## Monitoring & Observability (Future)

### Metrics
- Page load times
- API response times
- Error rates
- User flows (anonymized)

### Logging
- Client-side: Console + Remote logging
- Server-side: Structured logs (JSON)
- Log levels: ERROR, WARN, INFO, DEBUG

### Alerts
- High error rates
- Failed critical flows
- System downtime

## Testing Strategy

### Unit Tests
\`\`\`typescript
// Redux slices
describe('riskFormSlice', () => {
  it('should calculate score correctly', () => {
    // Test reducer logic
  })
})
\`\`\`

### Integration Tests
\`\`\`typescript
// API + State
describe('Risk Form Flow', () => {
  it('should save answers and calculate result', async () => {
    // Test full flow
  })
})
\`\`\`

### E2E Tests
\`\`\`typescript
// Playwright
test('User can complete risk assessment', async ({ page }) => {
  // Simulate user journey
})
\`\`\`

## Scalability Considerations

### Current Limitations
- Client-side only (no persistence)
- Single Redux store (could bottleneck with large state)
- No caching strategy

### Future Improvements
1. **Database**: Move to PostgreSQL for production scale
2. **Caching**: Redis for session/case data
3. **CDN**: Static assets on edge network
4. **Microservices**: Separate chat, notifications, etc.
5. **Message Queue**: For async tasks (email, SMS)

## Dependencies

### Core
- next@15.x
- react@19.x
- @reduxjs/toolkit@2.x
- zod@3.x

### UI
- @radix-ui/* (via shadcn/ui)
- tailwindcss@4.x
- lucide-react

### Development
- typescript@5.x
- eslint
- prettier

## Environment Variables

\`\`\`env
# Development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=file:./dev.db

# Production
NEXT_PUBLIC_API_URL=https://api.haven.com
DATABASE_URL=<production-connection-string>
ENCRYPTION_KEY=<secure-key>
JWT_SECRET=<secure-secret>
\`\`\`

---

This architecture is designed to be maintainable, scalable, and prioritizes user safety above all else.

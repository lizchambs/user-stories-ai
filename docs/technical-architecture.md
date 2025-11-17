# Technical Architecture - User Stories AI MVP

> **MVP Scope**: Client-side only, no database, no authentication
> See `future-enhancements.md` for post-MVP features

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React useState/useReducer (component-level only)

### Backend
- **API**: Next.js API Routes (serverless functions)
- **AI Integration**: OpenAI API (GPT-3.5-turbo for cost efficiency)
- **Database**: ❌ None (MVP)
- **Authentication**: ❌ None (MVP)

### Deployment
- **Platform**: Vercel
- **Environment Variables**: Vercel Environment Variables
- **Analytics**: Vercel Analytics (built-in)

---

## System Architecture (Simplified MVP)

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js App (React Components)               │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Story Generator Form                            │ │ │
│  │  │  - User input textarea                           │ │ │
│  │  │  - Optional fields (role, context)               │ │ │
│  │  │  - Criteria format selector                      │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Story Display                                   │ │ │
│  │  │  - Formatted user story                          │ │ │
│  │  │  - Acceptance criteria                           │ │ │
│  │  │  - INVEST badges                                 │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Export Actions                                  │ │ │
│  │  │  - Copy to clipboard                             │ │ │
│  │  │  - Download as .md                               │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS POST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js API Route (Vercel Serverless)           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  POST /api/generate-story                              │ │
│  │                                                        │ │
│  │  1. Validate request (Zod schema)                     │ │
│  │  2. Construct AI prompt from template                 │ │
│  │  3. Call OpenAI API                                   │ │
│  │  4. Parse and format response                         │ │
│  │  5. Return JSON story object                          │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
                  ┌──────────────────────┐
                  │    OpenAI API        │
                  │  (GPT-3.5-turbo)     │
                  └──────────────────────┘

Note: No database, no persistence, no authentication in MVP
```

---

## Data Models

### UserStory (Client-side only)
```typescript
interface UserStory {
  role: string;              // "As a [role]"
  goal: string;              // "I want [goal]"
  benefit: string;           // "So that [benefit]"
  acceptanceCriteria: AcceptanceCriterion[];
  investScore: InvestScore;  // Quality metrics
}

interface AcceptanceCriterion {
  id: string;
  type: 'given-when-then' | 'bullet';
  given?: string;            // For GWT format
  when?: string;
  then?: string;
  description?: string;      // For bullet format
}

interface InvestScore {
  independent: boolean;
  negotiable: boolean;
  valuable: boolean;
  estimable: boolean;
  small: boolean;
  testable: boolean;
}
```

### GenerateStoryRequest
```typescript
interface GenerateStoryRequest {
  userInput: string;         // Free-form description
  role?: string;             // Optional pre-filled role
  context?: string;          // Additional context
  criteriaFormat: 'given-when-then' | 'bullet' | 'both';
}
```

---

## API Endpoints

### POST `/api/generate-story`
**Purpose**: Generate a user story from user input

**Request Body**:
```json
{
  "userInput": "We need a login feature for customers",
  "role": "customer",
  "context": "E-commerce platform",
  "criteriaFormat": "given-when-then"
}
```

**Response**:
```json
{
  "success": true,
  "story": {
    "role": "returning customer",
    "goal": "log in to my account",
    "benefit": "I can access my order history and saved preferences",
    "acceptanceCriteria": [
      {
        "type": "given-when-then",
        "given": "I am on the login page",
        "when": "I enter valid credentials",
        "then": "I am redirected to my account dashboard"
      }
    ],
    "investScore": {
      "independent": true,
      "negotiable": true,
      "valuable": true,
      "estimable": true,
      "small": true,
      "testable": true
    }
  }
}
```

---

## AI Prompt Strategy

### System Prompt Template
```
You are an expert product manager and agile coach specializing in writing 
high-quality user stories following the INVEST criteria.

Your task is to transform user input into a well-structured user story with:
1. Clear role, goal, and benefit (As a [role], I want [goal], so that [benefit])
2. Acceptance criteria in [format] format
3. Adherence to INVEST principles

Guidelines:
- Be specific about the user role (not just "user")
- Focus on the problem, not the solution
- Keep stories small and testable
- Use clear, jargon-free language
- Ensure acceptance criteria are measurable
```

### User Prompt Template
```
Create a user story from this input:
"{userInput}"

Context: {context}
Preferred role: {role}
Acceptance criteria format: {criteriaFormat}

Return the story in JSON format matching this structure:
{schema}
```

---

## Component Architecture

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Home/Generator page
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── StoryGenerator/
│   │   ├── GeneratorForm.tsx  # Input form
│   │   ├── StoryDisplay.tsx   # Display generated story
│   │   ├── AcceptanceCriteria.tsx
│   │   ├── InvestBadges.tsx   # Visual INVEST indicators
│   │   └── ExportOptions.tsx  # Copy/Export buttons
│   └── Layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── openai.ts              # OpenAI client setup
│   ├── prompts.ts             # AI prompt templates
│   ├── validators.ts          # Zod schemas
│   └── utils.ts               # Utility functions
└── api/
    └── generate-story/
        └── route.ts           # API route handler
```

---

## Security Considerations

1. **API Key Protection**
   - Store OpenAI API key in Vercel environment variables
   - Never expose in client-side code

2. **Rate Limiting**
   - Implement rate limiting on API routes
   - Use Vercel's built-in edge middleware

3. **Input Validation**
   - Validate all inputs with Zod schemas
   - Sanitize user input before sending to OpenAI

4. **CORS**
   - Configure appropriate CORS headers
   - Restrict to production domain

---

## Performance Optimization

1. **Caching**
   - Cache common story patterns (optional)
   - Use React Server Components for static content

2. **Code Splitting**
   - Lazy load heavy components
   - Use Next.js dynamic imports

3. **API Optimization**
   - Stream responses from OpenAI (for better UX)
   - Implement loading states

---

## MVP Feature Scope

### Phase 1 (Initial MVP)
✅ Single-page story generator  
✅ AI-powered story generation  
✅ Display with INVEST indicators  
✅ Copy to clipboard functionality  
✅ Export as Markdown  

### Future Enhancements
See `future-enhancements.md` for:
- Database integration and story persistence
- User authentication
- Story history and editing
- Batch generation
- Custom templates
- Team collaboration features

---

## Environment Variables (MVP)

```env
# Required
OPENAI_API_KEY=sk-...

# Optional - Rate Limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

---

## Deployment Checklist

- [ ] Create Vercel project
- [ ] Configure environment variables
- [ ] Set up OpenAI API key
- [ ] Configure build settings (Next.js)
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Test production build locally
- [ ] Deploy to Vercel

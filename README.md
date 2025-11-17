# User Story Spark

Generate high-quality, well-structured user stories. Powered by AI.

## 🎯 Features

- ✅ **AI-Powered Generation** - Transform ideas into structured user stories
- ✅ **Acceptance Criteria** - Auto-generated in Given-When-Then or bullet format
- ✅ **Export Options** - Copy to clipboard or download as Markdown
- ✅ **Zero Friction** - No sign-up, no database, instant results
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd user-stories-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
user-stories-ai/
├── app/
│   ├── api/
│   │   └── generate-story/
│   │       └── route.ts          # API endpoint for story generation
│   ├── layout.tsx                # Root layout with Header and Toaster
│   ├── page.tsx                  # Main page with generator
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── story-generator-form.tsx  # Input form component
│   ├── story-display.tsx         # Story display component
│   ├── export-buttons.tsx        # Export actions component
│   └── header.tsx                # Header component
├── lib/
│   ├── openai.ts                 # OpenAI client configuration
│   ├── prompts.ts                # AI prompt templates
│   ├── validators.ts             # Zod schemas
│   ├── export-utils.ts           # Export utilities
│   └── utils.ts                  # General utilities
├── types/
│   └── story.ts                  # TypeScript interfaces
└── docs/                         # Project documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **AI**: OpenAI API (GPT-4o-mini)
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📖 Usage

1. **Enter your feature description** in the main text area
2. **(Optional)** Expand optional fields to specify:
   - User role (e.g., "customer", "admin")
   - Context (e.g., "E-commerce platform")
   - Acceptance criteria format preference
3. **Click "Generate Story"** and wait 2-5 seconds
4. **Review the generated story** with INVEST indicators
5. **Export** by copying to clipboard or downloading Markdown format

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key |
| `RATE_LIMIT_MAX_REQUESTS` | No | Max requests per window (default: 10) |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window in ms (default: 60000) |

### AI Model Configuration

Edit `lib/openai.ts` to change:
- Model (default: `gpt-4o-mini`)
- Temperature (default: `0.7`)
- Max tokens (default: `1000`)

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `OPENAI_API_KEY` environment variable
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 💰 Cost Estimation

Using GPT-4o-mini:
- ~$0.001 per story generation
- 1000 stories ≈ $1
- Free tier includes $5 credit

## 📝 Development Roadmap

See `docs/mvp-roadmap.md` for the complete development plan and `docs/future-enhancements.md` for post-MVP features.

### Current Status: MVP Complete ✅

- [x] Core story generation
- [x] INVEST evaluation
- [x] Export functionality
- [x] Responsive design

### Future Enhancements

- [ ] Database integration
- [ ] User authentication
- [ ] Story history
- [ ] Batch generation
- [ ] Custom templates
- [ ] Team collaboration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

See LICENSE file for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by [OpenAI](https://openai.com)

---

**Just clean, excellent user stories. No prioritization. No filtering. No roadmapping.**

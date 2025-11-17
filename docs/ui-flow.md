# UI Flow & Wireframes - User Stories AI MVP

## User Flow Overview

```
┌─────────────┐
│   Landing   │
│    Page     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Story Generator (Main Interface)   │
│  ┌───────────────────────────────┐  │
│  │  Input Form                   │  │
│  │  - Description textarea       │  │
│  │  - Optional fields            │  │
│  │  - Generate button            │  │
│  └───────────────────────────────┘  │
└──────┬──────────────────────────────┘
       │
       │ [User clicks Generate]
       ▼
┌─────────────────────────────────────┐
│  Loading State                      │
│  - Spinner/skeleton                 │
│  - "Crafting your story..."         │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Generated Story Display            │
│  ┌───────────────────────────────┐  │
│  │  User Story Card              │  │
│  │  - Role/Goal/Benefit          │  │
│  │  - Acceptance Criteria        │  │
│  │  - INVEST Badges              │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  Action Buttons               │  │
│  │  - Copy to Clipboard          │  │
│  │  - Export as Markdown         │  │
│  │  - Generate Another           │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## Page Layouts

### 1. Landing/Generator Page (Single Page App)

```
┌────────────────────────────────────────────────────────────┐
│  Header                                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📝 User Stories AI          [About] [GitHub]        │  │
│  └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Hero Section                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │     Generate High-Quality User Stories in Seconds    │  │
│  │                                                       │  │
│  │     Transform your ideas into well-structured        │  │
│  │     user stories following INVEST best practices     │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Generator Section                                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  What feature or need do you want to capture?        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │                                                 │  │  │
│  │  │  [Large textarea for user input]               │  │  │
│  │  │  e.g., "Users need to reset their password"    │  │  │
│  │  │                                                 │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  Optional Details (Collapsible)                      │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  User Role: [input]                            │  │  │
│  │  │  Context: [input]                              │  │  │
│  │  │  Criteria Format: [dropdown]                   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │              [Generate Story Button]                 │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Results Section (appears after generation)                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Your Generated Story                                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  📋 User Story                                  │  │  │
│  │  │                                                 │  │  │
│  │  │  As a [returning customer]                     │  │  │
│  │  │  I want [to reset my password]                 │  │  │
│  │  │  So that [I can regain access to my account]   │  │  │
│  │  │                                                 │  │  │
│  │  │  ✓ Acceptance Criteria                         │  │  │
│  │  │  • Given I'm on the login page...              │  │  │
│  │  │  • When I click "Forgot Password"...           │  │  │
│  │  │  • Then I receive a reset email...             │  │  │
│  │  │                                                 │  │  │
│  │  │  INVEST Quality Indicators                     │  │  │
│  │  │  [I] [N] [V] [E] [S] [T] ✓                     │  │  │
│  │  │                                                 │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  [📋 Copy] [📄 Export MD] [🔄 Generate Another]     │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
├────────────────────────────────────────────────────────────┤
│  Footer                                                     │
│  Made with ❤️ | Powered by OpenAI                          │
└────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Header Component
**Purpose**: Navigation and branding

**Elements**:
- Logo/App name (left)
- Navigation links (right): About, GitHub
- Clean, minimal design

**Styling**:
- Fixed/sticky header
- Subtle border bottom
- Background: white/transparent

---

### 2. Hero Section
**Purpose**: Explain value proposition

**Elements**:
- Main headline (H1)
- Subheadline explaining benefits
- Optional: Quick feature highlights

**Styling**:
- Centered text
- Large, readable typography
- Gradient or subtle background

---

### 3. Generator Form Component
**Purpose**: Collect user input for story generation

**Fields**:

1. **Primary Input** (Required)
   - Label: "What feature or need do you want to capture?"
   - Type: Textarea (4-6 rows)
   - Placeholder: "e.g., Users need to reset their password"
   - Validation: Min 10 characters

2. **Optional Details** (Collapsible/Accordion)
   - **User Role**: Text input
     - Placeholder: "e.g., customer, admin, new user"
   - **Context**: Text input
     - Placeholder: "e.g., E-commerce platform, mobile app"
   - **Criteria Format**: Dropdown
     - Options: "Given-When-Then", "Bullet Points", "Both"

3. **Generate Button**
   - Primary CTA button
   - Loading state with spinner
   - Disabled when input is invalid

**Styling**:
- Card/panel with subtle shadow
- Clear visual hierarchy
- Responsive padding
- Focus states for accessibility

---

### 4. Story Display Component
**Purpose**: Show generated user story in readable format

**Sections**:

1. **Story Header**
   - Icon: 📋
   - Title: "Your Generated Story"

2. **Story Body**
   - **As a** [role] - highlighted/bold
   - **I want** [goal] - highlighted/bold
   - **So that** [benefit] - highlighted/bold
   - Clean typography with spacing

3. **Acceptance Criteria Section**
   - Header: "✓ Acceptance Criteria"
   - List format (numbered or bulleted)
   - Each criterion on separate line
   - Proper indentation for GWT format

4. **INVEST Indicators**
   - Badge/chip for each letter
   - Green checkmarks for met criteria
   - Tooltip on hover explaining each principle

**Styling**:
- Card with border
- Monospace font for story format (optional)
- Adequate line spacing
- Subtle background color for sections

---

### 5. Action Buttons Component
**Purpose**: Allow users to use generated story

**Buttons**:

1. **Copy to Clipboard**
   - Icon: 📋
   - Text: "Copy to Clipboard"
   - Feedback: Toast notification on success
   - Copies formatted markdown

2. **Export as Markdown**
   - Icon: 📄
   - Text: "Export as Markdown"
   - Downloads .md file

3. **Generate Another**
   - Icon: 🔄
   - Text: "Generate Another"
   - Clears results, scrolls to form

**Styling**:
- Horizontal button group
- Secondary/outline style
- Hover states
- Mobile: Stack vertically

---

### 6. Loading State Component
**Purpose**: Provide feedback during generation

**Elements**:
- Skeleton loader or spinner
- Loading message: "Crafting your story..."
- Optional: Progress indicator

**Styling**:
- Smooth transition
- Centered in results area
- Subtle animation

---

## Responsive Design

### Desktop (1024px+)
- Two-column layout option (form | results)
- Wider max-width container (1200px)
- Larger typography

### Tablet (768px - 1023px)
- Single column
- Moderate padding
- Adjusted font sizes

### Mobile (< 768px)
- Full-width components
- Stacked buttons
- Larger touch targets
- Collapsible optional fields by default

---

## Color Scheme Suggestions

### Option 1: Professional Blue
- Primary: `#2563eb` (Blue)
- Secondary: `#64748b` (Slate)
- Success: `#10b981` (Green)
- Background: `#f8fafc` (Light gray)
- Text: `#1e293b` (Dark slate)

### Option 2: Modern Purple
- Primary: `#7c3aed` (Purple)
- Secondary: `#6366f1` (Indigo)
- Success: `#059669` (Emerald)
- Background: `#fafaf9` (Warm gray)
- Text: `#18181b` (Zinc)

### Option 3: Clean Minimal
- Primary: `#0f172a` (Dark)
- Secondary: `#475569` (Gray)
- Accent: `#0ea5e9` (Sky blue)
- Background: `#ffffff` (White)
- Text: `#0f172a` (Dark)

---

## Interaction States

### Form States
1. **Empty**: Placeholder text visible
2. **Typing**: Character count (optional)
3. **Valid**: Green border/checkmark
4. **Invalid**: Red border + error message
5. **Submitting**: Button disabled + spinner

### Result States
1. **Loading**: Skeleton/spinner
2. **Success**: Smooth fade-in animation
3. **Error**: Error message with retry button

### Button States
1. **Default**: Normal appearance
2. **Hover**: Slight color change + shadow
3. **Active**: Pressed effect
4. **Disabled**: Reduced opacity
5. **Success** (Copy): Checkmark + color change

---

## Accessibility Considerations

- **Keyboard Navigation**: All interactive elements accessible via Tab
- **ARIA Labels**: Proper labels for screen readers
- **Focus Indicators**: Clear focus outlines
- **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- **Error Messages**: Associated with form fields
- **Loading States**: Announced to screen readers

---

## Animation & Transitions

### Micro-interactions
- Button hover: 150ms ease
- Card appearance: 300ms fade-in
- Copy success: 200ms scale + color change
- Form validation: 200ms border color

### Page Transitions
- Smooth scroll to results
- Fade-in for generated content
- Skeleton to content transition

---

## Empty & Error States

### Empty State (No Story Generated)
```
┌────────────────────────────────────┐
│                                    │
│         📝                         │
│                                    │
│    No story generated yet          │
│                                    │
│    Fill out the form above to      │
│    create your first user story    │
│                                    │
└────────────────────────────────────┘
```

### Error State
```
┌────────────────────────────────────┐
│                                    │
│         ⚠️                         │
│                                    │
│    Oops! Something went wrong      │
│                                    │
│    [Error message details]         │
│                                    │
│         [Try Again Button]         │
│                                    │
└────────────────────────────────────┘
```

---

## Copy Format (Markdown Output)

When user clicks "Copy to Clipboard", the following format is copied:

```markdown
# User Story

**As a** [role]  
**I want** [goal]  
**So that** [benefit]

## Acceptance Criteria

### Given-When-Then
- **Given** [context]
- **When** [action]
- **Then** [outcome]

### Additional Criteria
- Must allow user to...
- Must validate that...
- Must prevent...

---
*Generated by User Stories AI*
```

---

## Future UI Enhancements (Post-MVP)

- Dark mode toggle
- Story history sidebar
- Inline editing of generated stories
- Template selection
- Batch generation interface
- Export to Jira/Linear integration
- Collaborative features (comments, sharing)

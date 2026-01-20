# KatyPlan - Design System

## Design Philosophy

### Color Palette
- **Primary**: Calm Blue (#4A90E2) - Trust, productivity, focus
- **Secondary**: Muted Green (#7ED321) - Success, balance, completion  
- **Warning**: Amber (#F5A623) - Caution, heavy workload
- **Error**: Coral (#D0021B) - Minimal usage, critical alerts
- **Background**: Off-white (#FAFAFA) - Clean, spacious
- **Text**: Charcoal (#2C2C2C) - High contrast, readable

### Typography
- **Display Font**: Inter (700) - Modern, clean headers
- **Body Font**: Inter (400/500) - System font stack for performance
- **Monospace**: JetBrains Mono - Code/assignment display
- **Font Sizes**: Mobile-first scaling (14px base, 18px/24px/32px headings)

### Visual Language
- **Minimalist Productivity**: Clean lines, generous whitespace, purposeful elements
- **Student-Friendly**: Approachable but not childish, professional yet accessible
- **Calm Focus**: Reduced visual noise, emphasis on content over decoration
- **Data-Driven**: Clear hierarchy, scannable information architecture

## Visual Effects & Animation

### Used Libraries
- **Anime.js**: Smooth micro-interactions and state transitions
- **Typed.js**: Typewriter effect for hero tagline
- **Splitting.js**: Character-level text animations for emphasis
- **ECharts.js**: Workload visualization and progress charts
- **Pixi.js**: Subtle particle effects for background ambiance

### Effect Implementation
- **Hero Animation**: Typewriter effect for main tagline with gradient color cycling
- **Input Validation**: Gentle shake animation for errors, success pulse for valid input
- **Schedule Generation**: Loading spinner with progress indicator, smooth reveal animation
- **Day Cards**: Staggered entrance animation, hover lift effect (desktop), tap feedback (mobile)
- **Workload Indicators**: Color-coded pills with subtle glow effects
- **Background**: Minimal particle system with floating geometric shapes in brand colors

### Header Effect
- **Sticky Navigation**: Smooth opacity transition on scroll
- **Logo Animation**: Subtle bounce on page load
- **Progress Bar**: Thin blue line showing completion through multi-step process

### Scroll Motion
- **Reveal Animations**: Content slides up 20px with fade-in as it enters viewport
- **Parallax Elements**: Background shapes move at 0.5x scroll speed for depth
- **Smooth Scrolling**: Automatic scroll to sections with easing

### Interactive Feedback
- **Button States**: Scale transform on press, color transitions
- **Form Elements**: Focus states with blue outline, validation feedback
- **Toggle Switches**: Smooth slide animation with color change
- **Slider Controls**: Real-time value updates with visual feedback

## Layout & Styling

### Grid System
- **Mobile**: Single column, full-width components
- **Tablet**: Two-column settings panel, single-column output
- **Desktop**: Three-column layout (input, settings, output)

### Component Hierarchy
1. **Hero Section**: Minimal height (25vh), clear value proposition
2. **Input Section**: Prominent textarea, primary CTA button
3. **Settings Panel**: Collapsible on mobile, expanded on desktop
4. **Output Schedule**: Card-based layout, chronological flow
5. **Footer**: Minimal, privacy-focused messaging

### Responsive Behavior
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg)
- **Touch Targets**: Minimum 44px for mobile accessibility
- **Content Priority**: Input and output always visible, settings accessible

## Accessibility & Performance
- **High Contrast**: 4.5:1 minimum ratio for all text
- **Focus Management**: Clear focus indicators, logical tab order
- **Screen Reader**: Proper ARIA labels, semantic HTML structure
- **Performance**: Sub-200ms generation time, optimized animations
- **Progressive Enhancement**: Core functionality works without JavaScript
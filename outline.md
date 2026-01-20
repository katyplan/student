# KatyPlan - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Main application page
├── privacy.html            # Privacy policy page
├── main.js                 # Core application logic
├── resources/              # Images and assets
│   ├── hero-workspace.png  # Generated hero image
│   ├── productivity-*.jpg  # Searched productivity images
│   └── icons/              # UI icons and graphics
├── interaction.md          # Interaction design document
├── design.md              # Design system guide
└── outline.md             # This file
```

## Page Sections

### index.html - Main Application
1. **Navigation Header**
   - KatyPlan logo text
   - "How it works" scroll link
   - Sticky positioning on mobile

2. **Hero Section**
   - Minimal height (25vh)
   - App title with typewriter animation
   - Tagline: "Paste your assignments. Get a fair daily plan."
   - Subtitle about no login/nothing saved

3. **Input Section**
   - Large textarea for assignment pasting
   - Smart placeholder with examples
   - Primary "Generate Plan" button
   - Secondary "Clear" and "Load Example" buttons
   - Inline validation messages

4. **Settings Panel**
   - Start date picker (defaults to today)
   - Work day toggles (Mon-Sun)
   - Daily workload limit selector
   - Difficulty mode dropdown (Simple/Custom)
   - Expandable/collapsible on mobile

5. **Missing Info Section**
   - Dynamic list for unresolved assignments
   - Date pickers for missing due dates
   - Skip options for each item

6. **Output Schedule**
   - Summary statistics strip
   - Day-by-day cards with workload indicators
   - Expandable task lists per day
   - Copy/Print/Download controls
   - Regenerate button

7. **How It Works Section**
   - Brief explanation of the algorithm
   - Tips for best results
   - FAQ items

8. **Footer**
   - Privacy message
   - Copyright notice
   - Links to privacy policy

### privacy.html - Privacy Policy
- Simple, text-focused layout
- Clear explanation of data handling
- No tracking/storage policy
- Contact information

## Core JavaScript Modules

### Assignment Parser
- Pattern recognition for due dates
- Class/subject detection
- Assignment type classification
- Time estimation based on keywords

### Scheduling Algorithm
- Task splitting for large assignments
- Workload balancing across days
- Conflict resolution
- Optimization for earliest completion

### UI Controllers
- Form validation and feedback
- Settings management
- Schedule rendering
- Export functionality

### Animation Controllers
- Page load animations
- Scroll-triggered reveals
- Interactive feedback
- Loading states

## Interactive Features

### Primary Interactions
1. **Assignment Input**: Paste and parse with real-time feedback
2. **Settings Configuration**: Adjust work days and limits
3. **Schedule Generation**: One-click planning with progress indicator
4. **Schedule Management**: View, edit, and export plans

### Secondary Interactions
1. **Example Loading**: Pre-fill with sample assignments
2. **Custom Time Editing**: Adjust individual assignment times
3. **Task Completion**: Check off completed items
4. **Plan Regeneration**: Update with same or modified inputs

### Accessibility Features
- Keyboard navigation support
- Screen reader compatibility
- High contrast text
- Touch-friendly controls
- Focus management

## Technical Implementation

### Libraries Used
- Anime.js for smooth animations
- Typed.js for typewriter effects
- ECharts.js for workload visualization
- Splitting.js for text effects
- Pixi.js for background ambiance

### Performance Targets
- <200ms plan generation time
- Sub-3s initial page load
- Smooth 60fps animations
- Mobile-responsive design

### Browser Support
- Modern mobile browsers (iOS Safari, Chrome)
- Desktop Chrome, Firefox, Safari
- Progressive enhancement for older browsers
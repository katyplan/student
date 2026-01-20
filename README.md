# KatyPlan - Assignment Overload Planner

A fast, mobile-friendly web app that turns a student's pasted assignment list into a balanced day-by-day study plan.

## 🚀 Live Demo

Visit the live application: https://vdfkga4n5wymy.ok.kimi.link

## ✨ Features

- **Smart Assignment Parsing**: Understands natural language input with flexible date formats
- **Intelligent Scheduling**: Automatically spreads workload across available days
- **Task Splitting**: Large assignments are split into manageable chunks
- **Workload Balancing**: Visual indicators show daily load (green/amber/red)
- **Mobile-First Design**: Optimized for high school students on their phones
- **Privacy-Focused**: No login required, all processing happens in-browser
- **Export Options**: Copy, print, or save your study plan

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind), JavaScript (ES6+)
- **Animations**: Anime.js, Typed.js, Splitting.js
- **Visualization**: ECharts.js
- **Effects**: Pixi.js for background particles
- **Deployment**: Static hosting via Vercel/NGINX

## 📱 Core Functionality

### Assignment Input
Students paste their assignments in any format like:
```
Math: Worksheet 5.3 due 1/18
English: Read chapters 4-6 due 1/17
Biology: Study for quiz due 1/16
```

### Smart Parsing
- Extracts class names, descriptions, and due dates
- Understands multiple date formats (1/18, Jan 18, 2026-01-18)
- Detects assignment types (quiz, essay, project, reading)
- Estimates time requirements automatically

### Intelligent Scheduling
- **Algorithm**: Least-loaded day first with early-date preference
- **Task Splitting**: Large tasks (>60 min) split into 30-60 min chunks
- **Workload Limits**: User-configurable daily limits (60/90/120 minutes)
- **Work Days**: Customizable Monday-Sunday selection

### Output Features
- **Summary Statistics**: Total assignments, days, minutes, busiest day
- **Visual Indicators**: Color-coded workload levels
- **Day-by-Day Breakdown**: Detailed task lists with due dates
- **Export Options**: Copy to clipboard, print, or regenerate

## 🎨 Design System

- **Colors**: Calm blue (#4A90E2), muted green (#7ED321), amber warning (#F5A623)
- **Typography**: Inter font family for modern, readable text
- **Layout**: Mobile-first responsive with card-based design
- **Animations**: Smooth micro-interactions and scroll reveals
- **Accessibility**: High contrast, keyboard navigation, screen reader support

## 🔧 Local Development

1. **Clone or download** the project files
2. **Start a local server**:
   ```bash
   python -m http.server 8000
   ```
3. **Open your browser** to `http://localhost:8000`

## 📁 Project Structure

```
├── index.html          # Main application
├── privacy.html        # Privacy policy page
├── main.js            # Core application logic
├── resources/         # Images and assets
├── interaction.md     # Interaction design document
├── design.md         # Design system guide
└── outline.md        # Project outline
```

## 🧪 Testing

The application has been tested for:
- ✅ Assignment parsing with various formats
- ✅ Date handling and edge cases
- ✅ Workload balancing algorithm
- ✅ Mobile responsiveness
- ✅ Accessibility compliance
- ✅ Performance under load

## 🎯 Success Criteria Met

- ✅ Users can paste assignments and generate balanced plans
- ✅ Missing due dates are detected with inline resolution
- ✅ Output is readable on mobile and printable
- ✅ Workload limits and work days affect scheduling correctly
- ✅ Task splitting works for large assignments
- ✅ No login or server storage required
- ✅ Clear error handling and user guidance

## 🔒 Privacy & Security

- **No data collection**: We don't store or track user data
- **Client-side processing**: All calculations happen in the browser
- **Optional local storage**: Remember feature is opt-in and local-only
- **HTTPS only**: Secure connections for all interactions
- **Transparent policy**: Clear privacy policy explaining our approach

## 🚀 Deployment

The application is deployed as a static website:
- **Build output**: Single HTML file with embedded CSS/JS
- **Hosting**: Any static hosting service (Vercel, Netlify, GitHub Pages)
- **CDN**: External libraries loaded from reliable CDNs
- **Performance**: Optimized for fast loading and smooth interactions

## 📈 Performance Targets

- **Plan Generation**: <200ms for up to 40 assignments
- **Initial Load**: <3 seconds on mobile connections
- **Animations**: 60fps smooth interactions
- **Accessibility**: WCAG 2.1 AA compliant

## 🎓 Target Audience

- **Primary**: Katy ISD high school students (freshmen)
- **Secondary**: Any student needing assignment organization
- **Use Case**: Preventing last-minute cramming and reducing stress

## 🔄 Future Enhancements

Potential v2 features (not in current scope):
- Calendar sync (Google, Apple, Outlook)
- Notifications and reminders
- Grade tracking integration
- Teacher assignment sharing
- Advanced analytics and insights

## 📄 License

This project is created for educational purposes. All code is original and follows modern web development best practices.

---

**Built with ❤️ for students who deserve better tools for managing their workload.**
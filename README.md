# 🖥️ Virtual Memory Simulator - Web Edition

A beautiful, interactive web-based virtual memory simulator implementing SJF (Shortest Job First) scheduling with real-time visual feedback.

## ✨ Features

- **Visual Memory Management** - See frames allocate/deallocate in real-time
- **SJF Scheduling** - Processes execute in shortest-burst-first order
- **Live Page Tables** - Watch page-to-frame mappings update
- **Animated UI** - Smooth transitions and visual feedback
- **Real-time Logging** - Track every step of the simulation

## 🚀 Quick Start

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or visit [vercel.com](https://vercel.com) and import this repository.

### Run Locally

**Option 1:** Open `index.html` in any web browser

**Option 2:** Local Server

```bash
# Python:
python -m http.server 8000

# Node.js:
npx serve
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🎮 How to Use

1. **Configure Memory**

   - Set total frames (4-32)
   - Click "Configure"

2. **Add Processes**

   - Enter Process ID (optional - auto-generated if empty)
   - Set size in pages
   - Set burst time
   - Click "Add Process"

3. **Run Simulation**

   - Click "▶️ Run Simulation"
   - Watch processes execute in SJF order
   - See memory allocate/deallocate in real-time

4. **Reset**
   - Click "🔄 Reset" to clear and start over

## 📊 What You'll See

### Process Queue

- Shows all processes with their state (waiting/running/completed)
- Color-coded by status
- Displays size and burst time

### Frame Table

- Visual grid of all memory frames
- White = Free, Blue = Occupied
- Shows which process owns each frame
- Hover to highlight individual frames

### Page Tables

- Live page-to-frame mappings
- Updates as processes execute
- Disappears when process completes

### Simulation Log

- Timestamped events
- Color-coded messages (info/success/warning/error)
- Tracks allocation, execution, and deallocation

## 🎨 Design Highlights

- **Clean & Professional** - Minimalist design with Tailwind CSS
- **Inter Typography** - Modern, readable font family
- **Subtle Interactions** - Smooth hover effects and transitions
- **Responsive Layout** - Adapts perfectly to any screen size
- **Color-Coded States** - Clear visual feedback for process states

## 🧪 Try These Scenarios

### Scenario 1: Basic SJF

```
Memory: 16 frames
Processes:
- P1: Size=4, Burst=10
- P2: Size=3, Burst=5
- P3: Size=2, Burst=3

Result: P3 → P2 → P1 (shortest first)
```

### Scenario 2: Memory Constraint

```
Memory: 8 frames
Processes:
- P1: Size=5, Burst=8
- P2: Size=6, Burst=4

Result: P2 executes first (shorter burst), then P1
```

### Scenario 3: Full Queue

```
Memory: 20 frames
Add 5-6 processes with varying sizes and burst times
Watch them execute in perfect SJF order!
```

## 🛠️ Technical Stack

- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first styling via CDN
- **Inter Font** - Professional typography from Google Fonts
- **Vanilla JavaScript** - Pure JS, no frameworks
- **CSS Grid/Flexbox** - Responsive layout system

## 📱 Browser Support

Works on all modern browsers:

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🎯 Key Algorithms

### SJF Scheduling

```javascript
// Sort by burst time (ascending)
processes.sort((a, b) => a.burstTime - b.burstTime);
```

### First-Fit Allocation

```javascript
// Find first available consecutive frames
for (let i = 0; i < frames.length; i++) {
  if (!frames[i].occupied) {
    allocate(frames[i]);
  }
}
```

## 🎓 Perfect For

- Operating Systems courses
- Memory management demonstrations
- Scheduling algorithm visualization
- Interactive learning
- Project presentations

## 📝 Notes

- No backend required - runs entirely in browser
- State managed in JavaScript
- Animations use CSS transitions
- Responsive design works on mobile

## 🚀 Deployment

This project is optimized for **Vercel** deployment.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide including:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Custom domains

## 🎉 Enjoy!

This simulator makes memory management visual and fun. Perfect for understanding SJF scheduling and virtual memory concepts!

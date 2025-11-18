# Virtual Memory Simulator

A clean, interactive web-based virtual memory simulator implementing SJF (Shortest Job First) scheduling with real-time visual feedback.

## Features

- **Visual Memory Management** - See frames allocate/deallocate in real-time
- **SJF Scheduling** - Processes execute in shortest-burst-first order
- **Auto Process IDs** - Leave ID empty for auto-generation (P1, P2, P3...)
- **Live Page Tables** - Watch page-to-frame mappings update
- **Real-time Logging** - Track every step of the simulation

## Quick Start

### Local

Open `index.html` in your browser. That's it!

### Deploy to Vercel

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Deploy (auto-detected as static site)

**No npm install needed** - this is pure HTML/CSS/JS.

## How to Use

1. **Configure Memory** - Set total frames (4-32)
2. **Add Processes** - Leave ID empty for auto-generation, set size and burst time
3. **Run Simulation** - Watch processes execute in SJF order
4. **Reset** - Clear and start over

## Try This

```
Memory: 16 frames

Add processes (leave ID empty):
- Size: 4, Burst: 10
- Size: 3, Burst: 5
- Size: 2, Burst: 3

Run → Watch P1, P2, P3 execute in order: P3 → P2 → P1 (shortest first)
```

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Inter Font (Google Fonts)
- Vanilla JavaScript

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

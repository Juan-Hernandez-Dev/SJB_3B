# Design System

## Visual Identity

### Color Palette

**Primary Colors:**

- Blue 600: `#2563eb` - Primary actions, occupied frames
- Green 600: `#16a34a` - Success states, running processes
- Gray 600: `#4b5563` - Secondary actions, neutral elements

**State Colors:**

- Yellow: Waiting processes
- Green: Running processes
- Gray: Completed processes

**Background:**

- Gray 50: `#f9fafb` - Page background
- White: `#ffffff` - Card backgrounds

### Typography

**Font Family:** Inter (Google Fonts)

- Weights: 300, 400, 500, 600, 700
- Clean, modern, highly readable
- Professional appearance

**Text Sizes:**

- Headings: 3xl (30px), lg (18px)
- Body: sm (14px), base (16px)
- Labels: sm (14px)
- Monospace: sm (14px) for logs

### Layout

**Grid System:**

- Desktop: 3-column layout (1 sidebar + 2 main)
- Mobile: Single column stack
- Gap: 24px (1.5rem)

**Spacing:**

- Card padding: 24px
- Element spacing: 12px - 16px
- Section gaps: 24px

### Components

**Cards:**

- White background
- 1px gray border
- 8px border radius
- Subtle shadow on hover

**Buttons:**

- Primary: Blue 600, white text
- Success: Green 600, white text
- Secondary: Gray 600, white text
- Hover: Darker shade + smooth transition

**Inputs:**

- 1px gray border
- 6px border radius
- Blue focus ring
- Full width in forms

**Process Items:**

- Colored background based on state
- Rounded corners
- Flex layout for content
- Badge for state indicator

**Frame Boxes:**

- Square aspect ratio
- Blue when occupied, white when free
- Hover scale effect
- Centered text

**Page Tables:**

- Grid layout (3 columns)
- Alternating row backgrounds
- Header row with gray background
- Bordered container

**Log Entries:**

- Monospace font
- Color-coded by type
- Rounded background
- Auto-scroll to bottom

## Design Principles

1. **Minimalism** - Clean, uncluttered interface
2. **Clarity** - Clear visual hierarchy
3. **Consistency** - Uniform spacing and styling
4. **Accessibility** - Good contrast, readable fonts
5. **Responsiveness** - Works on all screen sizes
6. **Professionalism** - Mature, business-appropriate aesthetic

## Interactions

**Hover Effects:**

- Buttons: Darker background
- Frames: Scale up slightly
- Process items: Subtle highlight
- All transitions: 200-300ms

**Focus States:**

- Inputs: Blue ring
- Buttons: Outline on keyboard focus

**Animations:**

- Smooth transitions on state changes
- No excessive motion
- Subtle, professional feel

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Form labels for all inputs
- Sufficient color contrast
- Keyboard navigable
- Screen reader friendly

## Mobile Optimization

- Single column layout
- Touch-friendly button sizes
- Scrollable containers
- Responsive grid
- Readable text sizes

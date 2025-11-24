# Animated Characters Component

## Overview
The AnimatedCharacters component displays animated character progress based on user's staking category and category percentage from the blockchain.

## Features
- ✨ **Fill/Unfill Animation**: Characters fill from bottom to top based on category percentage
- 🎨 **Smooth Scaling (Breathe Effect)**: Active characters smoothly scale up and down
- 🌓 **Day/Night Mode**: Toggle between light and dark themes
- 🎵 **Sound Controls**: Enable/disable sound effects (for future implementation)
- ✨ **Particle Effects**: Sparkling particles for active characters
- 📱 **Responsive Design**: Works on all screen sizes

## How It Works

### Data Source
The component fetches data from the blockchain using the `getUserDetails` function from the Community contract:

```javascript
const userDetailsResult = await getUserDetails(provider, address);
```

The userDetails array contains:
- **Second-to-last index**: `category` (0-4)
- **Last index**: `categoryPercentage` (0-100)

### Character Categories
```javascript
0: Baby Gorilla 🦍
1: Lion 🦁
2: Eagle 🦅
3: Dragon 🐉
4: Phoenix 🔥
```

### Fill Logic
- If `userCategory > character.category`: Fill 100%
- If `userCategory === character.category`: Fill based on `categoryPercentage`
- If `userCategory < character.category`: Fill 0% (grayscale)

## Customization

### Adding New Characters
Edit the `characters` array in `AnimatedCharacters.tsx`:

```javascript
const characters = [
  {
    name: 'Your Character Name',
    emoji: '🎯', // Choose any emoji
    category: 5, // Category number
    color: '#FF5733' // Character color
  },
  // ... add more
];
```

### Changing Animations

#### Breathe Animation (Smooth Scaling)
Adjust in `AnimatedCharacters.css`:
```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08); /* Change this value */
  }
}
```

Duration: Change `animation: breathe 3s` in `getBreatheStyle()`

#### Fill Speed
Change transition duration in `.character-fill`:
```css
transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Particle Speed
Modify `float-up` animation duration:
```css
animation: float-up 2s ease-in infinite;
```

### Colors
Change character colors in the `characters` array or modify theme colors in CSS:

```css
/* Day Mode */
.animated-characters-section.day-mode {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
}

/* Night Mode */
.animated-characters-section.night-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}
```

## Usage

### Basic Usage
```jsx
import AnimatedCharacters from './AnimatedCharacters';

<AnimatedCharacters showControls={true} />
```

### Props
- `showControls` (boolean): Show/hide control buttons (default: `true`)

## Integration

The component is already integrated in the staking page (`ZillowStake.tsx`):

```jsx
{/* Animated Characters Section */}
<AnimatedCharacters showControls={true} />
```

## Browser Console Debugging

When a wallet is connected, check the console for:
```
🔍 Full userDetails data: [...]
📊 UserDetails array length: 10
Index 0: ...
Index 1: ...
...
✅ User Category: 2
✅ Category Percentage: 75
```

Use this to verify the correct indices for your contract.

## Performance Notes

- Characters use CSS transitions for smooth animations
- Breathe animation uses `transform: scale()` for optimal performance
- Particle effects can be disabled for better performance on mobile

## Future Enhancements

- [ ] Add sound effects on category completion
- [ ] Add hover tooltips with detailed info
- [ ] Add character unlock animations
- [ ] Add achievement badges
- [ ] Add progress history chart
- [ ] Add share progress feature

## Troubleshooting

### Characters not filling
1. Check browser console for userDetails data
2. Verify category and categoryPercentage indices
3. Ensure wallet is connected
4. Check blockchain data is returning correctly

### Animations not working
1. Clear browser cache
2. Check CSS file is loaded
3. Verify browser supports CSS animations

### Performance issues
1. Disable particle effects
2. Reduce number of characters
3. Increase animation durations for smoother rendering

## Example Screenshots

### Day Mode
Characters displayed with light background and vibrant colors.

### Night Mode
Characters displayed with dark background and glowing effects.

### Active Category
Current category shows particle effects and breathe animation.

## License
Part of the Zillow Staking Platform



# StakingLevelsTable Component

A reusable table component for displaying staking levels with dynamic data and interactive features.

## Features

- **Dynamic Data**: Accepts levels data as props
- **Interactive**: Click to select levels
- **Status Management**: Shows active, inactive, and locked states
- **Responsive Design**: Works on all screen sizes
- **Customizable**: Flexible props for different use cases
- **Reusable**: Can be used anywhere in the app

## Usage

### Basic Usage

```tsx
import StakingLevelsTable from '@/components/common/StakingLevelsTable';

const levels = [
  {
    id: 1,
    level: 'Bronze',
    requiredStake: '100',
    reward: '5',
    duration: '7 days',
    status: 'active'
  },
  // ... more levels
];

function MyComponent() {
  return (
    <StakingLevelsTable
      levels={levels}
      onLevelSelect={(level) => console.log('Selected:', level)}
    />
  );
}
```

### With Hook

```tsx
import StakingLevelsTable from '@/components/common/StakingLevelsTable';
import { useStakingLevels } from '@/hooks/useStakingLevels';

function MyComponent() {
  const {
    levels,
    isLoading,
    selectedLevel,
    selectLevel
  } = useStakingLevels();

  return (
    <StakingLevelsTable
      levels={levels}
      onLevelSelect={selectLevel}
      selectedLevel={selectedLevel}
      showActions={true}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `levels` | `StakingLevel[]` | ✅ | - | Array of staking level objects |
| `onLevelSelect` | `(level: StakingLevel) => void` | ❌ | - | Callback when a level is selected |
| `selectedLevel` | `number` | ❌ | - | ID of currently selected level |
| `showActions` | `boolean` | ❌ | `true` | Whether to show action buttons |
| `className` | `string` | ❌ | `''` | Additional CSS classes |

## StakingLevel Interface

```tsx
interface StakingLevel {
  id: number;
  level: string;           // Level name (e.g., "Bronze", "Silver")
  requiredStake: string;   // Required stake amount
  reward: string;         // Reward percentage
  duration: string;       // Staking duration
  status: 'active' | 'inactive' | 'locked';
}
```

## Status Types

- **active**: Level is available for selection
- **inactive**: Level is not available
- **locked**: Level is locked (requires unlocking)

## Styling

The component uses CSS classes that can be customized:

- `.staking-levels-table` - Main container
- `.levels-table` - Table element
- `.table-row` - Table row
- `.status-badge` - Status indicators
- `.select-btn` - Action buttons

## Examples

### In Staking Page

```tsx
// In your staking page
<StakingLevelsTable
  levels={stakingLevels}
  onLevelSelect={handleLevelSelection}
  selectedLevel={currentLevel}
  showActions={true}
/>
```

### In Home Page

```tsx
// In your home page
<StakingLevelsTable
  levels={levels}
  onLevelSelect={redirectToStaking}
  showActions={false}
  className="home-levels-table"
/>
```

### In Modal

```tsx
// In a modal
<StakingLevelsTable
  levels={levels}
  onLevelSelect={handleModalSelection}
  selectedLevel={modalSelectedLevel}
  showActions={true}
  className="modal-table"
/>
```

## Customization

You can customize the appearance by overriding CSS classes:

```css
.staking-levels-table {
  /* Custom styles */
}

.levels-table th {
  /* Custom header styles */
}

.status-active {
  /* Custom active status styles */
}
```

## Integration with Blockchain

To integrate with blockchain data:

```tsx
const { levels, updateLevelStatus } = useStakingLevels();

// Update level status based on user's stake
useEffect(() => {
  if (userStake >= 100) {
    updateLevelStatus(1, 'active'); // Unlock Bronze
  }
  if (userStake >= 500) {
    updateLevelStatus(2, 'active'); // Unlock Silver
  }
}, [userStake]);
```


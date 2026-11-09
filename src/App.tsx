// import React from 'react'; // unused
import { MainLayout } from './components/layout/MainLayout';
import { useGameStore } from './store/gameStore';

import { AlphabetStage } from './features/alphabet/AlphabetStage';

import { NumberStage } from './features/numbers/NumberStage';

import { MathStage } from './features/math/MathStage';

function App() {
  const currentMode = useGameStore((state) => state.currentMode);

  const renderStage = () => {
    switch (currentMode) {
      case 'alphabet':
        return <AlphabetStage />;
      case 'numbers':
        return <NumberStage />;
      case 'math':
        return <MathStage />;
      default:
        return <AlphabetStage />;
    }
  };

  return (
    <MainLayout>
      {renderStage()}
    </MainLayout>
  );
}

export default App;

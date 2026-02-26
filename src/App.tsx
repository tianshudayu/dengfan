import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import Recipe from './components/Recipe';
import Terminal from './components/Terminal';
import Timers from './components/Timers';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentView, setCurrentView] = useState('DASH');

  return (
    <div className="bg-background-dark text-text-main font-body h-screen flex flex-col overflow-hidden selection:bg-primary selection:text-background-dark">
      {currentView === 'DASH' && <Dashboard onNavigate={setCurrentView} />}
      {currentView === 'SCAN' && <Scanner onNavigate={setCurrentView} />}
      {currentView === 'RECIPE' && <Recipe onNavigate={setCurrentView} />}
      {currentView === 'TERMINAL' && <Terminal onNavigate={setCurrentView} />}
      {currentView === 'TIMERS' && <Timers onNavigate={setCurrentView} />}
      
      {['DASH', 'SCAN', 'RECIPE', 'TIMERS'].includes(currentView) && (
        <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      )}
    </div>
  );
}

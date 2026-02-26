import React, { useState, useEffect } from 'react';

interface TimersProps {
  onNavigate: (view: string) => void;
}

interface TimerData {
  id: number;
  name: string;
  duration: number; // in seconds
  remaining: number; // in seconds
  status: 'active' | 'paused' | 'complete';
  target?: string;
}

const PRESETS = [
  { name: '溏心蛋', duration: 6 * 60 + 30, target: '100°C' },
  { name: '泡茶', duration: 3 * 60, target: '80°C' },
  { name: '煮意面', duration: 10 * 60, target: '沸水' },
  { name: '牛排静置', duration: 5 * 60, target: '室温' },
];

export default function Timers({ onNavigate }: TimersProps) {
  const [timers, setTimers] = useState<TimerData[]>([
    { id: 1, name: '溏心蛋', duration: 390, remaining: 390, status: 'active', target: '100°C' },
    { id: 2, name: '蒸玉米', duration: 900, remaining: 900, status: 'paused' },
  ]);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (timer.status === 'active' && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            return {
              ...timer,
              remaining: newRemaining,
              status: newRemaining === 0 ? 'complete' : 'active'
            };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = (id: number) => {
    setTimers(prev => prev.map(t => {
      if (t.id === id) {
        if (t.status === 'active') return { ...t, status: 'paused' };
        if (t.status === 'paused' && t.remaining > 0) return { ...t, status: 'active' };
        if (t.status === 'complete') return { ...t, remaining: t.duration, status: 'active' }; // Restart
      }
      return t;
    }));
  };

  const addPreset = (preset: typeof PRESETS[0]) => {
    setTimers(prev => [
      {
        id: Date.now(),
        name: preset.name,
        duration: preset.duration,
        remaining: preset.duration,
        status: 'active',
        target: preset.target
      },
      ...prev
    ]);
    setShowPresets(false);
  };

  const clearAll = () => {
    setTimers([]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background-dark relative">
      <div className="absolute inset-0 pointer-events-none z-50 noise-bg opacity-5 mix-blend-overlay"></div>
      
      <header className="flex-none px-5 pt-8 pb-4 border-b border-border-color bg-background-dark z-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-display font-bold text-2xl tracking-tighter text-text-main">计时器</h1>
          <div className="flex items-center gap-3">
            <button className="text-text-mute hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </button>
            <div className="h-4 w-[1px] bg-border-color"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-text-mute text-[11px] font-bold tracking-[0.05em] uppercase font-body">活动线程: {timers.filter(t => t.status === 'active').length}</p>
          <button onClick={clearAll} className="text-primary text-[11px] font-bold tracking-[0.05em] uppercase hover:opacity-80 transition-opacity">
            清除全部
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-3 pb-24 relative">
        {timers.map(timer => {
          const progress = ((timer.duration - timer.remaining) / timer.duration) * 100;
          const dashArray = `${progress}, 100`;
          
          const isComplete = timer.status === 'complete';
          const isActive = timer.status === 'active';
          
          return (
            <div key={timer.id} className={`group relative flex h-[100px] w-full bg-surface border rounded-sm overflow-hidden transition-all active:scale-[0.99] ${isComplete ? 'border-alert animate-blink-border timer-glow-alert' : isActive ? 'border-border-color timer-glow-active' : 'border-border-color'}`}>
              
              {isComplete ? (
                <div className="absolute inset-y-0 left-0 bg-alert/10 w-full z-0"></div>
              ) : (
                <div className="absolute inset-y-0 left-0 bg-primary/5 z-0 transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
              )}

              <div className={`relative z-10 flex flex-1 items-center justify-between px-5 ${!isActive && !isComplete ? 'opacity-60 group-hover:opacity-100 transition-opacity' : ''}`}>
                <div className="flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-alert animate-pulse' : isActive ? 'bg-primary' : 'bg-text-mute'}`}></span>
                    <span className={`text-[11px] font-bold uppercase tracking-[0.05em] ${isComplete ? 'text-alert' : 'text-text-mute'}`}>{timer.name}</span>
                  </div>
                  <div className={`font-mono font-medium text-[42px] leading-none tracking-tight tabular-nums ${isComplete ? 'text-text-main' : isActive ? 'text-text-main' : 'text-text-mute'}`}>
                    {formatTime(timer.remaining)}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    {isComplete ? (
                      <span className="text-alert text-[10px] font-mono">已完成 • 立即取出</span>
                    ) : (
                      <span className="text-text-mute text-[10px] font-mono">
                        {isActive ? (timer.target ? `目标: ${timer.target}` : '运行中') : '已暂停'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-[64px] w-[64px] flex items-center justify-center cursor-pointer" onClick={() => toggleTimer(timer.id)}>
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path className={isComplete ? "text-alert/30" : "text-border-color"} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    <path className={`${isComplete ? "text-alert" : isActive ? "text-primary" : "text-text-mute"} ring-circle`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={isComplete ? "100, 100" : dashArray} strokeLinecap="round" strokeWidth="2"></path>
                  </svg>
                  <button className={`absolute inset-0 flex items-center justify-center transition-colors ${isComplete ? 'text-alert hover:text-text-main' : isActive ? 'text-primary hover:text-text-main' : 'text-text-mute hover:text-text-main'}`}>
                    <span className="material-symbols-outlined text-[24px]">
                      {isComplete ? 'stop' : isActive ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {showPresets && (
        <div className="absolute bottom-[90px] right-4 z-30 bg-surface border border-border-color rounded-sm shadow-lg p-2 flex flex-col gap-2 min-w-[160px]">
          <div className="text-xs text-text-mute font-mono mb-1 px-2 uppercase tracking-widest">预设计时器</div>
          {PRESETS.map((preset, idx) => (
            <button 
              key={idx} 
              onClick={() => addPreset(preset)}
              className="flex items-center justify-between px-2 py-2 hover:bg-surface-highlight rounded-sm transition-colors text-left"
            >
              <span className="text-sm text-text-main font-body">{preset.name}</span>
              <span className="text-xs text-primary font-mono">{formatTime(preset.duration)}</span>
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-6 right-4 z-20">
        <button 
          onClick={() => setShowPresets(!showPresets)}
          className={`flex h-14 w-14 items-center justify-center rounded-sm text-background-dark shadow-[0_4px_20px_rgba(0,255,148,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-black ${showPresets ? 'bg-text-main' : 'bg-primary hover:bg-text-main'}`}
        >
          <span className={`material-symbols-outlined text-[32px] font-bold transition-transform ${showPresets ? 'rotate-45' : ''}`}>add</span>
        </button>
      </div>
    </div>
  );
}

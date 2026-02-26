import React from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'DASH', icon: 'dashboard', label: '主控台' },
    { id: 'SCAN', icon: 'center_focus_strong', label: '扫描' },
    { id: 'RECIPE', icon: 'receipt_long', label: '食谱' },
    { id: 'TIMERS', icon: 'timer', label: '计时' },
  ];

  return (
    <nav className="flex-none bg-[#0a120e] border-t border-border-color px-4 pb-6 pt-2 z-30">
      <div className="flex justify-between items-end">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-1 flex-col items-center justify-end gap-1 group relative"
            >
              {isActive && (
                <div className="absolute -top-2 w-8 h-[2px] bg-primary shadow-[0_0_10px_#00FF94]"></div>
              )}
              <div
                className={`flex h-8 items-center justify-center transition-colors ${
                  isActive ? 'text-primary' : 'text-text-mute group-hover:text-primary'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>
              <p
                className={`text-[10px] font-bold tracking-[0.1em] font-display transition-colors ${
                  isActive ? 'text-primary' : 'text-text-mute group-hover:text-primary'
                }`}
              >
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { apiFetch } from '../utils/api';

interface TerminalProps {
  onNavigate: (view: string) => void;
}

export default function Terminal({ onNavigate }: TerminalProps) {
  const [queries, setQueries] = useState<any[]>([
    {
      id: 1,
      type: 'system',
      title: '溏心蛋',
      ref: '#EGG_01',
      time: '18:04:22',
      query: '溏心蛋 (Soft Boiled Egg)',
      stats: [
        { label: '总时间', value: '06:30' },
        { label: '目标温度', value: '100', unit: '°C' }
      ],
      content: '沸水下锅。轻轻放入鸡蛋。保持沸腾。取出后立即放入冰水浴中停止加热。',
      action: { label: '开始 (06:30)', icon: 'timer' }
    },
    {
      id: 2,
      type: 'system',
      title: '牛肉_内部_温度',
      ref: 'USDA',
      time: '18:05:10',
      query: 'Steak Medium Rare Temp?',
      stats: [
        { label: '目标内部温度', value: '54', unit: '°C' },
        { label: '静置时间', value: '5-10m' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [queries, isLoading]);

  const handleQuery = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userQuery = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    const newQuery = {
      id: Date.now(),
      type: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      query: userQuery,
    };

    setQueries((prev) => [...prev, newQuery]);

    const response = await apiFetch('/query', {
      method: 'POST',
      body: JSON.stringify({ query: userQuery })
    });

    setQueries((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        type: 'system',
        title: 'AI_RESPONSE',
        ref: 'GENAI',
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        query: userQuery,
        content: response.text,
      }
    ]);
  } catch (error) {
    console.error(error);
    setQueries((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        type: 'system',
        title: 'ERROR',
        ref: 'SYS',
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        query: userQuery,
        content: 'Failed to connect to global cooking database.',
      }
    ]);
  } finally {
    setIsLoading(false);
  }
};

return (
  <div className="flex-1 flex flex-col overflow-hidden bg-background-dark relative">
    <div className="absolute inset-0 noise-bg opacity-5 pointer-events-none z-50"></div>

    <header className="flex-none flex items-center justify-between px-4 py-3 bg-background-dark border-b border-border-color z-10">
      <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => onNavigate('DASH')}>
        <span className="material-symbols-outlined text-xl">arrow_back</span>
        <span className="material-symbols-outlined text-xl">terminal</span>
        <h1 className="font-display font-bold text-lg tracking-tight uppercase">查询_终端_V1</h1>
      </div>
      <button className="flex items-center justify-center w-10 h-10 text-text-mute hover:text-text-main transition-colors active:scale-95">
        <span className="material-symbols-outlined text-xl">delete_sweep</span>
      </button>
    </header>

    <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 pb-24 scroll-smooth">
      <div className="flex flex-col gap-1 items-start opacity-60">
        <div className="font-mono text-xs text-primary flex gap-2">
          <span>系统_就绪</span>
          <span>::</span>
          <span>V.1.0.4</span>
        </div>
        <p className="font-mono text-xs text-text-mute">连接到全球烹饪数据库... 成功。</p>
      </div>

      {queries.map((q) => (
        <div key={q.id} className="flex flex-col gap-2">
          {q.type === 'user' || q.query ? (
            <div className="flex items-center gap-2 self-start font-mono text-sm text-text-mute">
              <span className="text-primary">&gt;</span>
              <span>查询: {q.query}</span>
              <span className="text-[10px] ml-2 opacity-50">{q.time}</span>
            </div>
          ) : null}

          {q.type === 'system' && (
            <div className="bg-surface border border-border-color p-0 w-full max-w-md relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-border-color group-hover:bg-primary transition-colors duration-300"></div>
              <div className="p-4 pl-5">
                <div className="flex justify-between items-start mb-4 border-b border-border-color pb-2 border-dashed">
                  <h3 className="font-display font-bold text-xl text-text-main tracking-tight">{q.title}</h3>
                  <span className="font-mono text-xs bg-border-color px-1 py-0.5 text-text-mute">ID: {q.ref}</span>
                </div>

                {q.stats && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {q.stats.map((stat: any, i: number) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-mono text-[10px] text-text-mute uppercase tracking-widest mb-1">{stat.label}</span>
                        <div className="flex items-baseline gap-1">
                          <span className={`font-mono text-xl font-bold ${i === 0 ? 'text-primary' : 'text-text-main'}`}>{stat.value}</span>
                          {stat.unit && <span className="font-mono text-xs text-text-mute">{stat.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {q.content && (
                  <div className="bg-background-dark/30 p-3 border border-border-color mb-4 font-mono text-sm leading-relaxed text-gray-300">
                    <span className="text-primary mr-2">&gt;&gt;</span>{q.content}
                  </div>
                )}

                {q.action && (
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 h-10 border border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary transition-all active:translate-y-0.5 group/btn" onClick={() => onNavigate('TIMERS')}>
                      <span className="material-symbols-outlined text-lg">{q.action.icon}</span>
                      <span className="font-mono text-xs font-bold tracking-wider">{q.action.label}</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center border border-border-color hover:border-text-main/50 text-text-mute hover:text-text-main transition-colors">
                      <span className="material-symbols-outlined text-lg">bookmark_add</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 self-start font-mono text-sm text-text-mute">
          <span className="text-primary">&gt;</span>
          <span>处理中...</span>
          <span className="cursor-blink"></span>
        </div>
      )}
      <div className="h-8"></div>
    </main>

    <footer className="flex-none bg-background-dark border-t border-border-color p-0 z-20">
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        <div className="flex gap-2 overflow-x-auto px-4 py-2 border-b border-border-color/50 scrollbar-hide">
          <button onClick={() => setInputValue('意面弹牙口感？')} className="flex-shrink-0 px-3 py-1 bg-surface border border-border-color text-xs font-mono text-text-mute hover:text-text-main hover:border-primary/50 transition-colors whitespace-nowrap">
            意面弹牙口感？
          </button>
          <button onClick={() => setInputValue('鸡腿温度')} className="flex-shrink-0 px-3 py-1 bg-surface border border-border-color text-xs font-mono text-text-mute hover:text-text-main hover:border-primary/50 transition-colors whitespace-nowrap">
            鸡腿温度
          </button>
          <button onClick={() => setInputValue('煮饭水米比例')} className="flex-shrink-0 px-3 py-1 bg-surface border border-border-color text-xs font-mono text-text-mute hover:text-text-main hover:border-primary/50 transition-colors whitespace-nowrap">
            煮饭水米比例
          </button>
        </div>
        <form onSubmit={handleQuery} className="flex items-center px-4 py-4 gap-3 bg-surface">
          <span className="text-primary font-bold text-lg select-none">&gt;</span>
          <div className="flex-1 relative">
            <input
              autoFocus
              className="w-full bg-transparent border-none p-0 text-text-main font-mono text-base focus:ring-0 placeholder-gray-600 caret-primary"
              placeholder="输入_查询..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading} className="group flex items-center justify-center w-10 h-10 bg-border-color/50 hover:bg-primary hover:text-background-dark text-text-main rounded-sm transition-all active:scale-95 disabled:opacity-50">
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">arrow_upward</span>
          </button>
        </form>
      </div>
      <div className="h-6 bg-surface"></div>
    </footer>
  </div>
);
}

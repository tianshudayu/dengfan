import React from 'react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <header className="flex items-center justify-between px-5 py-4 border-b border-border-color bg-background-dark z-20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">terminal</span>
          <h1 className="font-display font-bold text-lg tracking-tight">
            DENGFAN // OS <span className="text-text-mute font-normal text-xs ml-2">v2.4.1</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <span className="material-symbols-outlined text-text-mute text-xl hover:text-text-main transition-colors cursor-pointer">
            notifications
          </span>
          <span className="material-symbols-outlined text-text-mute text-xl hover:text-text-main transition-colors cursor-pointer">
            settings
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative p-4 pb-24">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <div className="relative bg-surface border border-border-color rounded-sm p-4 col-span-1 h-40 flex flex-col justify-between group hover:border-text-mute transition-colors overflow-hidden">
            <div className="absolute inset-0 noise-bg opacity-5 pointer-events-none"></div>
            <div className="relative z-10 flex justify-between items-start">
              <span className="font-display font-bold text-xs text-text-mute tracking-widest">环境数据</span>
              <span className="material-symbols-outlined text-text-mute text-lg">cloud</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-mono text-3xl font-bold text-text-main">22°</span>
                <span className="font-mono text-sm text-text-mute">C</span>
              </div>
              <div className="font-mono text-xs text-primary mb-2">湿度: 64% // 风速: 2ms</div>
              <p className="font-body text-xs text-text-mute leading-tight border-t border-border-color pt-2 mt-1">
                建议: <br />
                <span className="text-text-main font-medium">凉面</span>
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('TERMINAL')}
            className="relative bg-surface border border-border-color rounded-sm p-4 col-span-1 h-40 flex flex-col group hover:border-text-mute transition-colors overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 noise-bg opacity-5 pointer-events-none"></div>
            <div className="relative z-10 flex justify-between items-start mb-2">
              <span className="font-display font-bold text-xs text-text-mute tracking-widest">终端</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            <div className="relative z-10 flex-1 flex flex-col justify-end">
              <div className="font-mono text-xs text-text-mute mb-1 opacity-50">上次查询: "煮鸡蛋?"</div>
              <div className="bg-background-dark/40 border border-border-color rounded-sm p-2 h-full flex items-end">
                <div className="font-mono text-sm text-primary w-full break-all">
                  &gt; 查询...<span className="cursor-blink"></span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('SCAN')}
            className="relative col-span-2 h-48 bg-surface border border-border-color rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 noise-bg opacity-5 pointer-events-none z-0"></div>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAorbT9H-6P-295-vGxAH9gCm7bd6a-1NCTb5FUkdMfH3aw_P_jv-KcFOdnk1GutxgnulKlPBGDqOf7Zg2pQbKbJu3rq16CI6WxEU4xzazGRA5ZEUqL31Tejl04BTx8Cxezsea0Txp1huz7LHEt6vcTMl71PF2oIU1rgx2wFp8Uv8dzQN0HOVljPbCfsGjmxv4XyRWvec3rolL_OSEFIUWgWjxWCaAOqysJWfHnH3vk06wUvZmIib6XMUe6sCOYGTih7j5tAJWL')",
              }}
            ></div>
            <div className="scan-line"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xs text-primary tracking-widest mb-1">
                    库存扫描
                  </span>
                  <span className="font-mono text-[10px] text-text-mute">光学传感器 // 在线</span>
                </div>
                <div className="w-8 h-8 border-t-2 border-r-2 border-primary/50"></div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-display text-3xl font-bold text-text-main leading-none mb-1">扫描冰箱</h2>
                  <p className="font-body text-xs text-text-mute max-w-[160px]">
                    AI 分析可用食材。生成清单。
                  </p>
                </div>
                <div className="h-14 w-14 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-all duration-300 text-primary">
                  <span className="material-symbols-outlined text-3xl">photo_camera</span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-primary/50"></div>
            </div>
          </div>

          <div className="col-span-2 bg-surface border border-border-color rounded-sm p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background-dark rounded-sm border border-border-color">
                <span className="material-symbols-outlined text-text-mute text-lg">electric_bolt</span>
              </div>
              <div>
                <div className="font-display font-bold text-xs text-text-mute tracking-widest">能源</div>
                <div className="font-mono text-sm text-text-main">最佳</div>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-border-color"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background-dark rounded-sm border border-border-color">
                <span className="material-symbols-outlined text-text-mute text-lg">wifi</span>
              </div>
              <div>
                <div className="font-display font-bold text-xs text-text-mute tracking-widest">网络</div>
                <div className="font-mono text-sm text-text-main">5G // 已连接</div>
              </div>
            </div>
          </div>

          <div className="col-span-2 mt-2">
            <div className="flex justify-between items-end mb-3 px-1">
              <span className="font-display font-bold text-xs text-text-mute tracking-widest">最近清单</span>
              <span
                onClick={() => onNavigate('RECIPE')}
                className="font-mono text-[10px] text-primary cursor-pointer hover:underline"
              >
                查看日志 &gt;&gt;
              </span>
            </div>
            <div className="space-y-2">
              <div
                onClick={() => onNavigate('RECIPE')}
                className="bg-surface border border-border-color rounded-sm p-3 flex justify-between items-center hover:bg-surface-highlight transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-text-mute">01</span>
                  <div>
                    <div className="font-body font-medium text-sm text-text-main">麻婆豆腐</div>
                    <div className="font-mono text-[10px] text-text-mute">15 分钟 // 340 千卡</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-mute text-sm">arrow_forward_ios</span>
              </div>
              <div
                onClick={() => onNavigate('RECIPE')}
                className="bg-surface border border-border-color rounded-sm p-3 flex justify-between items-center hover:bg-surface-highlight transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-text-mute">02</span>
                  <div>
                    <div className="font-body font-medium text-sm text-text-main">蒸玉米和鸡蛋</div>
                    <div className="font-mono text-[10px] text-text-mute">08 分钟 // 120 千卡</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-mute text-sm">arrow_forward_ios</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-4 left-4 right-4 z-30">
        <div className="bg-background-dark/90 backdrop-blur-md border border-border-color pulse-border rounded-sm p-3 flex items-center justify-between shadow-lg cursor-pointer" onClick={() => onNavigate('TIMERS')}>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-alert animate-ping"></div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-[10px] text-primary tracking-widest">活动进程</span>
              <span className="font-mono text-sm text-text-main">
                煮鸡蛋: <span className="text-text-main">03:21</span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="h-8 w-8 flex items-center justify-center border border-border-color rounded-sm text-text-mute hover:text-text-main hover:border-text-main transition-colors" onClick={(e) => e.stopPropagation()}>
              <span className="material-symbols-outlined text-lg">pause</span>
            </button>
            <button className="h-8 w-8 flex items-center justify-center border border-border-color rounded-sm text-text-mute hover:text-alert hover:border-alert transition-colors" onClick={(e) => e.stopPropagation()}>
              <span className="material-symbols-outlined text-lg">stop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

interface ScannerProps {
  onNavigate: (view: string) => void;
}

export default function Scanner({ onNavigate }: ScannerProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-background-dark font-display">
      <div className="absolute inset-0 noise-bg opacity-5 pointer-events-none z-50"></div>
      
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLuNNEYJrj-5WDtEhH-5dITRsERpgqUe-ACmAYmVDWTRKAop5TCLwYqH2OZtqHfTdvCpbDG5nrR4h3J4AGQt9PvHsCqUl8W5SVzFzBE2P2hzeSQW93q0B5itf6ry8snwEMkOcrWrLjGJEQl5V8OQNB8SZ7OK2n4I7FN_PK55fJJ4-k7j5f8mVLrbqs-0HEFcCneab3zBsldScdTPbRolZraEc74-jlay4yjLFCeRGsFdPMP_Nu7oNNEu62ZWOavbDMT0ie90Ls')",
        }}
      >
        <div className="absolute inset-0 bg-background-dark/40"></div>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
        <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-text-main/80"></div>
        <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-text-main/80"></div>
        <div className="absolute bottom-32 left-6 w-16 h-16 border-l-2 border-b-2 border-text-main/80"></div>
        <div className="absolute bottom-32 right-6 w-16 h-16 border-r-2 border-b-2 border-text-main/80"></div>

        <div className="absolute left-0 w-full h-[1px] bg-primary/80 shadow-[0_0_15px_rgba(0,255,148,0.6)] animate-[scan_3s_linear_infinite]"></div>

        <div className="relative w-full flex justify-between items-start pt-2">
          <button onClick={() => onNavigate('DASH')} className="bg-surface/80 backdrop-blur-sm border border-border-color p-2 pointer-events-auto hover:bg-border-color transition-colors">
            <span className="material-symbols-outlined text-text-main text-[24px]">close</span>
          </button>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-background-dark/60 backdrop-blur border border-primary/30 px-3 py-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-mono text-primary text-xs tracking-widest uppercase">系统_活跃</span>
            </div>
            <span className="font-mono text-[10px] text-text-main/60 tracking-[0.2em]">V.4.02 // 矢量_分析</span>
          </div>
          <button className="bg-surface/80 backdrop-blur-sm border border-border-color p-2 pointer-events-auto hover:bg-border-color transition-colors">
            <span className="material-symbols-outlined text-text-main text-[24px]">help</span>
          </button>
        </div>

        <div className="absolute top-[35%] left-[20%] w-48 h-32 border border-primary/60 bg-primary/5 flex flex-col justify-between p-1">
          <div className="flex justify-between items-start">
            <span className="bg-primary text-background-dark font-mono font-bold text-[10px] px-1 py-0.5">老豆腐</span>
            <span className="text-primary font-mono text-[10px]">98%</span>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-2 h-2 border-l border-b border-primary/50"></div>
            <div className="w-2 h-2 border-r border-b border-primary/50"></div>
          </div>
        </div>

        <div className="absolute top-[50%] right-[15%] w-40 h-40 border border-text-main/30 bg-text-main/5 flex flex-col justify-between p-1 border-dashed">
          <div className="flex justify-between items-start">
            <span className="bg-text-main/20 text-text-main font-mono font-bold text-[10px] px-1 py-0.5 animate-pulse">检测中...</span>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-2 h-2 border-l border-b border-text-main/30"></div>
            <div className="w-2 h-2 border-r border-b border-text-main/30"></div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40">
          <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0V10M20 30V40M0 20H10M30 20H40" stroke="white" strokeWidth="1"></path>
            <circle cx="20" cy="20" fill="white" r="2"></circle>
          </svg>
        </div>

        <div className="absolute bottom-36 right-6 text-right hidden sm:block">
          <div className="font-mono text-[10px] text-primary/80 leading-tight">
            X: 42.091<br />
            Y: 11.205<br />
            Z: 00.992<br />
            ISO: 800
          </div>
        </div>
        <div className="absolute bottom-36 left-6 text-left hidden sm:block">
          <div className="font-mono text-[10px] text-text-main/50 leading-tight tracking-widest">
            模式: 原始输入<br />
            对象数量: 02<br />
            光线: 弱
          </div>
        </div>
      </div>

      <div className="w-full bg-surface/90 backdrop-blur-md border-t border-border-color px-8 pb-10 pt-6 flex flex-col gap-6 z-20">
        <div className="w-full text-center">
          <p className="font-mono text-primary text-xs tracking-widest animate-pulse uppercase">[ 正在处理视觉数据流 ]</p>
        </div>
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <button className="group flex flex-col items-center gap-2 outline-none">
            <div className="w-12 h-12 rounded-full border border-border-color bg-background-dark/50 flex items-center justify-center group-hover:border-text-main transition-colors">
              <span className="material-symbols-outlined text-text-main text-[20px] group-active:text-primary">flash_on</span>
            </div>
            <span className="font-mono text-[10px] text-text-mute uppercase tracking-widest">闪光灯</span>
          </button>
          
          <button className="relative w-[72px] h-[72px] rounded-full border-2 border-primary bg-transparent flex items-center justify-center group outline-none active:scale-95 transition-transform duration-100" onClick={() => onNavigate('RECIPE')}>
            <div className="w-[60px] h-[60px] rounded-full bg-primary/10 group-active:bg-primary transition-colors duration-150 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full group-active:bg-background-dark"></div>
            </div>
            <div className="absolute -inset-3 border border-dashed border-text-main/20 rounded-full animate-spin [animation-duration:10s]"></div>
          </button>
          
          <button className="group flex flex-col items-center gap-2 outline-none">
            <div className="w-12 h-12 rounded-full border border-border-color bg-background-dark/50 flex items-center justify-center group-hover:border-text-main transition-colors">
              <span className="material-symbols-outlined text-text-main text-[20px] group-active:text-primary">photo_library</span>
            </div>
            <span className="font-mono text-[10px] text-text-mute uppercase tracking-widest">导入</span>
          </button>
        </div>
      </div>
    </div>
  );
}

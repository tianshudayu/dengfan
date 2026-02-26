import React, { useState } from 'react';

interface RecipeProps {
  onNavigate: (view: string) => void;
}

export default function Recipe({ onNavigate }: RecipeProps) {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: '老豆腐', quantity: '400克', checked: false, missing: false },
    { id: 2, name: '花椒', quantity: '1 茶匙', checked: true, missing: false },
    { id: 3, name: '豆瓣酱', quantity: '2 汤匙', checked: false, missing: false },
    { id: 4, name: '猪肉/牛肉沫', quantity: '100克', checked: false, missing: false },
    { id: 5, name: '葱 (缺失)', quantity: '2 根', checked: false, missing: true },
  ]);

  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientQuantity, setNewIngredientQuantity] = useState('');
  const [newIngredientAdded, setNewIngredientAdded] = useState(false);

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredientName || !newIngredientQuantity) return;
    setIngredients([
      ...ingredients,
      {
        id: Date.now(),
        name: newIngredientName,
        quantity: newIngredientQuantity,
        checked: newIngredientAdded,
        missing: false,
      }
    ]);
    setNewIngredientName('');
    setNewIngredientQuantity('');
    setNewIngredientAdded(false);
  };

  const toggleIngredient = (id: number) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, checked: !ing.checked } : ing
    ));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background-dark relative">
      <header className="flex-none flex items-center justify-between px-4 py-4 border-b border-border-color bg-background-dark z-20">
        <button onClick={() => onNavigate('DASH')} className="w-10 h-10 flex items-center justify-center text-text-main hover:text-primary transition-colors rounded-sm active:bg-surface">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="font-display font-bold text-lg tracking-tight uppercase">食谱 // 清单</h1>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-text-main hover:text-primary transition-colors rounded-sm active:bg-surface">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-primary hover:text-text-main transition-colors rounded-sm active:bg-surface">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto scrollbar-hide relative bg-background-dark">
        <div className="relative w-full h-48 border-b border-border-color overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10 opacity-80"></div>
          <img
            alt="Mapo Tofu"
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy5FqmOiNJZDoJmT4UOt2vthX4l-nDhsjBU2hCNN8wdvSRJFBdosGF0c_atbFpBb9HeVEqeglA9Va5uZnX6uuYnhV5BnUPE-a1X_gQYStBYBn4hWpU7IuK0S_dGiA3l7dvhiIzatc4C1GRZRR-22jQUfLLw0KlClFrojPtEYV5wvBCrYmiXriPDnA8BzIFT27J6tq1VQ5KZG7w9ezoXdhQSYUqDtM55W9Ui9ECh140oIduOvrfajyngVdafTY9fw3wn8aspJuF"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary text-background-dark text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-sm uppercase">辛辣</span>
              <span className="bg-surface border border-border-color text-text-mute text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-sm uppercase">川味</span>
            </div>
            <h2 className="font-display font-bold text-3xl tracking-tight leading-none">
              Mapo Tofu <br /><span className="text-text-mute text-2xl">麻婆豆腐</span>
            </h2>
          </div>
        </div>

        <div className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur-sm border-b border-border-color py-3 px-4">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1">
            <button className="flex-shrink-0 bg-text-main text-background-dark px-4 py-2 rounded-sm border border-text-main transition-transform active:scale-95">
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="font-display font-bold text-xs uppercase tracking-widest">快速</span>
                <span className="font-mono text-[10px] font-medium">10 分钟</span>
              </div>
            </button>
            <button className="flex-shrink-0 bg-transparent text-text-mute px-4 py-2 rounded-sm border border-border-color hover:border-primary/50 hover:text-primary transition-colors">
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="font-display font-bold text-xs uppercase tracking-widest">健康</span>
                <span className="font-mono text-[10px] font-medium">300 千卡</span>
              </div>
            </button>
            <button className="flex-shrink-0 bg-transparent text-text-mute px-4 py-2 rounded-sm border border-border-color hover:border-primary/50 hover:text-primary transition-colors">
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="font-display font-bold text-xs uppercase tracking-widest">舒适</span>
                <span className="font-mono text-[10px] font-medium">丰富</span>
              </div>
            </button>
            <button className="flex-shrink-0 bg-transparent text-text-mute px-4 py-2 rounded-sm border border-border-color hover:border-primary/50 hover:text-primary transition-colors">
              <div className="flex flex-col items-start leading-none gap-1">
                <span className="font-display font-bold text-xs uppercase tracking-widest">纯素</span>
                <span className="font-mono text-[10px] font-medium">无肉</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-8 pb-24">
          <section>
            <div className="flex items-center justify-between mb-3 border-b border-border-color pb-1">
              <h3 className="font-mono text-xs text-text-mute uppercase tracking-widest">输入 // 材料</h3>
              <span className="font-mono text-xs text-primary">{ingredients.length} 项</span>
            </div>
            <div className="grid grid-cols-1 border-t border-border-color">
              {ingredients.map((ing) => (
                <div key={ing.id} className={`grid grid-cols-12 gap-4 py-3 border-b border-dashed border-border-color items-center ${ing.missing ? 'opacity-50' : ''}`}>
                  <div className="col-span-1 text-text-mute flex justify-center">
                    {ing.missing ? (
                      <span className="material-symbols-outlined text-[16px] text-alert">error</span>
                    ) : (
                      <input 
                        className="w-4 h-4 rounded-sm border-text-mute bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 text-primary transition-colors cursor-pointer" 
                        type="checkbox" 
                        checked={ing.checked}
                        onChange={() => toggleIngredient(ing.id)}
                      />
                    )}
                  </div>
                  <div className={`col-span-7 font-body font-bold text-sm ${ing.missing ? 'text-text-mute line-through' : ''}`}>
                    {ing.name}
                  </div>
                  <div className={`col-span-4 text-right font-mono text-sm ${ing.missing ? 'text-text-mute' : 'text-primary'}`}>
                    {ing.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 border border-border-color bg-surface/30 rounded-sm">
              <h4 className="font-mono text-[10px] text-text-mute uppercase tracking-widest mb-2">添加新材料</h4>
              <form onSubmit={handleAddIngredient} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="材料名称"
                    value={newIngredientName}
                    onChange={(e) => setNewIngredientName(e.target.value)}
                    className="flex-1 bg-background-dark border border-border-color rounded-sm px-2 py-1.5 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                  <input
                    type="text"
                    placeholder="数量"
                    value={newIngredientQuantity}
                    onChange={(e) => setNewIngredientQuantity(e.target.value)}
                    className="w-24 bg-background-dark border border-border-color rounded-sm px-2 py-1.5 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newIngredientAdded}
                      onChange={(e) => setNewIngredientAdded(e.target.checked)}
                      className="w-4 h-4 rounded-sm border-text-mute bg-transparent checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 text-primary transition-colors cursor-pointer"
                    />
                    <span className="text-xs text-text-mute">已加入清单</span>
                  </label>
                  <button
                    type="submit"
                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-sm text-xs font-mono transition-colors"
                  >
                    添加
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6 border-b border-border-color pb-1">
              <h3 className="font-mono text-xs text-text-mute uppercase tracking-widest">过程 // 执行</h3>
              <span className="font-mono text-xs text-primary">4 步</span>
            </div>
            <div className="relative space-y-0 pl-2">
              <div className="absolute left-[19px] top-2 bottom-4 w-px bg-border-color"></div>
              
              <div className="relative pl-10 pb-8 group">
                <div className="absolute left-0 top-0 w-10 flex justify-center bg-background-dark z-10 py-1">
                  <span className="font-mono text-primary font-bold text-lg">01</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="font-display font-bold text-text-main text-base mb-1">准备</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    沥干豆腐。切成 <span className="text-text-main font-medium border-b border-dotted border-text-mute">2厘米的方块</span>。将大蒜和生姜切碎。
                  </p>
                </div>
              </div>

              <div className="relative pl-10 pb-8 group">
                <div className="absolute left-0 top-0 w-10 flex justify-center bg-background-dark z-10 py-1">
                  <span className="font-mono text-primary font-bold text-lg">02</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="font-display font-bold text-text-main text-base mb-1">焯水</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    烧开水并加少许盐。小心地将豆腐块焯水使其定型。
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-surface hover:bg-text-main/10 border border-primary/30 text-primary px-3 py-1.5 rounded-sm transition-colors group/btn">
                      <span className="material-symbols-outlined text-[16px] animate-pulse">timer</span>
                      <span className="font-mono text-xs font-bold">02:00</span>
                    </button>
                    <span className="text-xs text-text-mute font-mono">100°C</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 pb-8 group">
                <div className="absolute left-0 top-0 w-10 flex justify-center bg-background-dark z-10 py-1">
                  <span className="font-mono text-primary font-bold text-lg">03</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="font-display font-bold text-text-main text-base mb-1">炒香</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    热锅烧油。将肉末炒至酥脆。加入豆瓣酱和花椒。炒出红油。
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-surface hover:bg-text-main/10 border border-primary/30 text-primary px-3 py-1.5 rounded-sm transition-colors">
                      <span className="material-symbols-outlined text-[16px]">timer</span>
                      <span className="font-mono text-xs font-bold">03:00</span>
                    </button>
                    <span className="text-xs text-text-mute font-mono">大火</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 pb-2 group">
                <div className="absolute left-0 top-0 w-10 flex justify-center bg-background-dark z-10 py-1">
                  <span className="font-mono text-primary font-bold text-lg">04</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="font-display font-bold text-text-main text-base mb-1">炖煮勾芡</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    加水和豆腐。炖煮。分3次加入水淀粉勾芡。
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 bg-surface hover:bg-text-main/10 border border-primary/30 text-primary px-3 py-1.5 rounded-sm transition-colors">
                      <span className="material-symbols-outlined text-[16px]">timer</span>
                      <span className="font-mono text-xs font-bold">05:00</span>
                    </button>
                    <span className="text-xs text-text-mute font-mono">关小火</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-8 border border-border-color bg-surface/50 p-4 rounded-sm flex justify-between items-center">
            <div>
              <div className="text-xs text-text-mute font-mono mb-1">总时间</div>
              <div className="text-xl font-display font-bold text-text-main">14分 30秒</div>
            </div>
            <div>
              <div className="text-xs text-text-mute font-mono mb-1 text-right">卡路里</div>
              <div className="text-xl font-display font-bold text-text-main text-right">420 <span className="text-xs font-normal text-text-mute">千卡</span></div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-6 right-6 z-30">
        <button onClick={() => onNavigate('TIMERS')} className="bg-primary hover:bg-[#00e082] text-background-dark h-14 w-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all hover:scale-105 active:scale-95 group">
          <span className="material-symbols-outlined text-[28px] group-hover:animate-spin">play_arrow</span>
        </button>
      </div>
    </div>
  );
}

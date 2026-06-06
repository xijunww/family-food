import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/store';
import { getDishesByCategory } from '../utils/data';
import { CATEGORIES } from '../utils/seed';
import CategoryTabs from '../components/CategoryTabs';
import DishCard from '../components/DishCard';
import EmptyState from '../components/EmptyState';

export default function Menu() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const addToCart = useAppStore((s) => s.addToCart);
  const [category, setCategory] = useState(params.get('cat') || 'home');
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState('');

  const dishes = useMemo(() => getDishesByCategory(category), [category, tick]);
  const catInfo = CATEGORIES.find(c => c.key === category);

  useEffect(() => {
    if (params.get('cat')) setCategory(params.get('cat'));
  }, [params]);

  const handleAdd = (dish) => {
    addToCart(dish.id);
    setTick(t => t + 1);
    setToast(`已加入：${dish.name}`);
    setTimeout(() => setToast(''), 1500);
  };

  return (
    <div className="px-5 pt-6 pb-24 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-text">菜单</h1>
        <button
          onClick={() => navigate('/dish-edit')}
          className="w-10 h-10 rounded-full bg-primary text-white text-2xl shadow-cute active:scale-95 emoji"
        >
          ＋
        </button>
      </div>

      <CategoryTabs active={category} onChange={setCategory} />

      <p className="text-text-sub text-xs mt-3 mb-3">
        {catInfo?.emoji} 共 {dishes.length} 道菜
      </p>

      {dishes.length === 0 ? (
        <EmptyState
          emoji="🍽️"
          title="这个分类还没有菜"
          desc="点击右上角 + 添加第一道菜"
          action={
            <button onClick={() => navigate('/dish-edit')} className="btn-primary">
              + 添加菜品
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {dishes.map((d) => (
            <DishCard key={d.id} dish={d} onAdd={handleAdd} />
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-text text-white px-4 py-2 rounded-full shadow-cute-lg text-sm z-30">
          ✅ {toast}
        </div>
      )}
    </div>
  );
}

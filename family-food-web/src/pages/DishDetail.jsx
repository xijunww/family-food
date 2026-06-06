import { useParams, useNavigate } from 'react-router-dom';
import { getDishById } from '../utils/data';
import { useAppStore } from '../utils/store';
import { CATEGORIES } from '../utils/seed';

export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useAppStore((s) => s.addToCart);
  const dish = getDishById(id);

  if (!dish) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-sub">菜品不存在</p>
        <button className="btn-secondary mt-4" onClick={() => navigate(-1)}>返回</button>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.key === dish.category);

  return (
    <div className="pb-32">
      <div className="bg-gradient-to-br from-bg to-primary-light px-6 pt-16 pb-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 w-10 h-10 rounded-full bg-white shadow-cute flex items-center justify-center"
        >
          ←
        </button>
        <div className="w-32 h-32 mx-auto rounded-full bg-white shadow-cute-lg flex items-center justify-center text-7xl emoji">
          {dish.emoji}
        </div>
        <h1 className="text-2xl font-bold text-text mt-4">{dish.name}</h1>
        <p className="text-text-sub text-sm mt-1">{cat?.emoji} {cat?.name}</p>
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {dish.tags.map((t) => (
              <span key={t} className="pill bg-white">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pt-6">
        <h3 className="font-semibold text-text mb-2">简介</h3>
        <p className="text-text-sub text-sm leading-relaxed">
          {dish.description || '暂无描述～'}
        </p>
      </div>

      <div className="px-5 mt-6 flex gap-3">
        <button
          className="btn-secondary flex-1"
          onClick={() => navigate(`/dish-edit/${dish.id}`)}
        >
          ✏️ 编辑
        </button>
        <button
          className="btn-primary flex-1"
          onClick={() => { addToCart(dish.id); navigate('/order'); }}
        >
          🛒 加入点单
        </button>
      </div>
    </div>
  );
}

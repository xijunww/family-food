// 菜品卡片
import { useNavigate } from 'react-router-dom';

export default function DishCard({ dish, onAdd }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dish/${dish.id}`)}
      className="card flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bg to-primary-light flex items-center justify-center text-4xl mb-2 shadow-cute emoji">
        {dish.emoji}
      </div>
      <h3 className="font-semibold text-text">{dish.name}</h3>
      {dish.tags && dish.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-1 mb-2">
          {dish.tags.slice(0, 2).map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
      )}
      {onAdd && (
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(dish); }}
          className="mt-1 px-3 py-1 bg-primary text-white text-sm rounded-full active:scale-95"
        >
          + 加入
        </button>
      )}
    </div>
  );
}

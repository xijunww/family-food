import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/seed';
import { getTodayOrders } from '../utils/data';
import { useAppStore } from '../utils/store';
import { ORDER_STATUS } from '../utils/seed';
import { formatTime } from '../utils/util';

export default function Home() {
  const user = useAppStore((s) => s.user);
  const orders = getTodayOrders();
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return '夜深啦';
    if (h < 11) return '早上好';
    if (h < 14) return '中午好';
    if (h < 18) return '下午好';
    return '晚上好';
  })();

  return (
    <div className="px-5 pt-8 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bg to-primary-light flex items-center justify-center text-2xl shadow-cute emoji">
          {user?.avatar}
        </div>
        <div>
          <p className="text-text-sub text-sm">{greeting}～</p>
          <h1 className="text-lg font-bold text-text">{user?.nickname}</h1>
        </div>
      </div>

      {/* Banner */}
      <div className="card bg-gradient-to-r from-primary to-primary-light text-white mb-6">
        <div className="flex items-center gap-3">
          <div className="text-5xl emoji">🍱</div>
          <div>
            <h2 className="text-lg font-bold">今天想吃点啥？</h2>
            <p className="text-sm opacity-90">家人们都点了什么，看看吧～</p>
          </div>
        </div>
      </div>

      {/* 分类入口 */}
      <h3 className="font-semibold text-text mb-3">菜品分类</h3>
      <div className="grid grid-cols-5 gap-3 mb-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            to={`/menu?cat=${c.key}`}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-white shadow-cute flex items-center justify-center text-3xl emoji active:scale-95 transition-transform">
              {c.emoji}
            </div>
            <span className="text-xs text-text mt-1.5">{c.name}</span>
          </Link>
        ))}
      </div>

      {/* 今日订单 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-text">今日订单</h3>
        <Link to="/orders" className="text-primary text-sm">查看全部 →</Link>
      </div>
      {orders.length === 0 ? (
        <div className="card text-center py-8">
          <div className="text-5xl mb-2 emoji">🍽️</div>
          <p className="text-text-sub text-sm">还没有人点菜哦，去菜单看看吧～</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.slice(-3).reverse().map((o) => (
            <Link to={`/order/${o.id}`} key={o.id} className="card flex items-center gap-3 active:scale-[0.98] transition-transform">
              <div className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-xl emoji">
                {o.userEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text text-sm truncate">
                  {o.userNickname} · {o.items.length} 道菜
                </p>
                <p className="text-xs text-text-sub">
                  {formatTime(o.createdAt)} · {o.items.slice(0, 2).map(i => i.dishName).join('、')}
                  {o.items.length > 2 && '...'}
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${ORDER_STATUS[o.status].class}`}>
                {ORDER_STATUS[o.status].name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

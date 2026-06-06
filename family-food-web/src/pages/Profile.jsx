import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/store';
import { getOrdersByUser } from '../utils/data';
import { CATEGORIES } from '../utils/seed';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAppStore();
  const orders = getOrdersByUser(user.id);
  const served = orders.filter((o) => o.status === 'served');
  const totalDishes = orders.reduce((s, o) => s + o.items.length, 0);

  // 统计常点菜（已上桌）
  const dishCount = {};
  served.forEach((o) => {
    o.items.forEach((it) => {
      dishCount[it.dishName] = (dishCount[it.dishName] || 0) + it.quantity;
    });
  });
  const favDishes = Object.entries(dishCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({ name, count }));

  const handleLogout = () => {
    if (!confirm('确定切换账号？将退出当前登录')) return;
    logout();
    navigate('/login');
  };

  return (
    <div className="px-5 pt-8 pb-24">
      {/* 头像区 */}
      <div className="card text-center bg-gradient-to-br from-bg to-primary-light mb-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-cute-lg flex items-center justify-center text-5xl emoji">
          {user.avatar}
        </div>
        <h2 className="text-xl font-bold text-text mt-2">{user.nickname}</h2>
        <p className="text-text-sub text-sm">@{user.username}</p>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary">{orders.length}</div>
          <div className="text-xs text-text-sub mt-1">累计订单</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary">{totalDishes}</div>
          <div className="text-xs text-text-sub mt-1">累计菜品</div>
        </div>
      </div>

      {/* 常点菜 */}
      <div className="card mb-4">
        <h3 className="font-semibold text-text mb-3">🍭 我最常点的</h3>
        {favDishes.length === 0 ? (
          <p className="text-text-sub text-sm text-center py-4">还没有上桌的菜，多点点吧～</p>
        ) : (
          <div className="space-y-2">
            {favDishes.map((d, i) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0 ? 'bg-yellow-300 text-yellow-800' :
                  i === 1 ? 'bg-gray-300 text-gray-700' :
                  'bg-orange-300 text-orange-800'
                }`}>{i + 1}</div>
                <span className="text-text flex-1">{d.name}</span>
                <span className="text-text-sub text-sm">×{d.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 菜单列表 */}
      <div className="card">
        <h3 className="font-semibold text-text mb-2">📋 功能</h3>
        <div className="divide-y divide-border">
          <Row emoji="🍱" label="我的订单" onClick={() => navigate('/orders')} />
          <Row emoji="📖" label="浏览菜单" onClick={() => navigate('/menu')} />
          <Row emoji="ℹ️" label="关于萌萌家厨" onClick={() => alert('版本 1.0.0\n家庭点菜 · 温馨共享 🌸')} />
          <Row emoji="🔄" label="切换账号" danger onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

function Row({ emoji, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 flex items-center gap-3 active:scale-[0.98] ${danger ? 'text-danger' : 'text-text'}`}
    >
      <span className="text-xl emoji">{emoji}</span>
      <span className="flex-1 text-left">{label}</span>
      <span className="text-text-sub">→</span>
    </button>
  );
}

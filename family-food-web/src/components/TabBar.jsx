// 底部 TabBar
import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/home', label: '首页', emoji: '🏠' },
  { to: '/menu', label: '菜单', emoji: '📖' },
  { to: '/order', label: '点单', emoji: '🛒' },
  { to: '/profile', label: '我的', emoji: '👤' },
];

export default function TabBar() {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-border flex justify-around py-2 z-20">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `flex flex-col items-center px-3 py-1 text-xs ${isActive ? 'text-primary' : 'text-text-sub'}`
          }
        >
          <span className="text-2xl emoji">{t.emoji}</span>
          <span className="mt-0.5">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

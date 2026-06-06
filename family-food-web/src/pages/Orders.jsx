import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../utils/data';
import { ORDER_STATUS, MEAL_TYPES } from '../utils/seed';
import { isToday, formatDate, formatTime } from '../utils/util';

export default function Orders() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('today');
  const orders = getOrders().slice().sort((a, b) => b.createdAt - a.createdAt);

  const filtered = useMemo(() => {
    if (tab === 'today') return orders.filter((o) => isToday(o.createdAt));
    return orders.filter((o) => !isToday(o.createdAt));
  }, [tab, orders]);

  // 历史订单按月分组
  const grouped = useMemo(() => {
    if (tab !== 'history') return null;
    const map = {};
    filtered.forEach((o) => {
      const key = formatDate(o.createdAt).slice(0, 7);
      if (!map[key]) map[key] = [];
      map[key].push(o);
    });
    return map;
  }, [tab, filtered]);

  return (
    <div className="px-5 pt-6 pb-24">
      <h1 className="text-xl font-bold text-text mb-4">我的订单</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('today')}
          className={`flex-1 py-2 rounded-full text-sm font-medium ${tab === 'today' ? 'bg-primary text-white' : 'bg-white text-text border border-border'}`}
        >🌅 今日</button>
        <button
          onClick={() => setTab('history')}
          className={`flex-1 py-2 rounded-full text-sm font-medium ${tab === 'history' ? 'bg-primary text-white' : 'bg-white text-text border border-border'}`}
        >📅 历史</button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-2 emoji">🍱</div>
          <p className="text-text-sub text-sm">还没有订单哦</p>
        </div>
      ) : tab === 'today' ? (
        <div className="space-y-3">
          {filtered.map((o) => <OrderCard key={o.id} order={o} />)}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([month, list]) => (
            <div key={month}>
              <p className="text-text-sub text-sm mb-2 font-semibold">{month}</p>
              <div className="space-y-3">
                {list.map((o) => <OrderCard key={o.id} order={o} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }) {
  const meal = MEAL_TYPES.find((m) => m.key === order.mealType);
  const status = ORDER_STATUS[order.status];
  return (
    <div
      onClick={() => (window.location.hash = `#/order/${order.id}`)}
      className="card active:scale-[0.98] transition-transform cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-bg flex items-center justify-center text-xl emoji">{order.userEmoji}</div>
        <div className="flex-1">
          <p className="font-semibold text-text text-sm">{order.userNickname}</p>
          <p className="text-xs text-text-sub">
            {formatDate(order.createdAt)} {formatTime(order.createdAt)} · {meal?.name}
          </p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${status.class}`}>{status.name}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {order.items.map((it, i) => (
          <span key={i} className="pill">
            <span className="emoji mr-0.5">{it.dishEmoji}</span>
            {it.dishName}×{it.quantity}
          </span>
        ))}
      </div>
    </div>
  );
}

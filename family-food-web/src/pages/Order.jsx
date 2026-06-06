import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../utils/store';
import { addOrder } from '../utils/data';
import { MEAL_TYPES } from '../utils/seed';
import EmptyState from '../components/EmptyState';

export default function Order() {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, clearCart, user } = useAppStore();
  const [mealType, setMealType] = useState('lunch');
  const [remark, setRemark] = useState('');
  const [error, setError] = useState('');

  const adjust = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    if (newQty > 10) return;
    updateCartItem(item.dishId, { quantity: newQty });
  };

  const submit = () => {
    setError('');
    if (cart.length === 0) return setError('购物车是空的');
    const order = addOrder({
      user,
      items: cart,
      mealType,
      mealTime: null,
      remark: remark.trim(),
    });
    clearCart();
    navigate(`/order/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="px-5 pt-6 pb-24">
        <h1 className="text-xl font-bold text-text mb-4">点单</h1>
        <EmptyState
          emoji="🛒"
          title="购物车空空如也"
          desc="去菜单选点想吃的吧～"
          action={
            <button onClick={() => navigate('/menu')} className="btn-primary">
              📖 去菜单
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-5 pt-6 pb-32 min-h-screen">
      <h1 className="text-xl font-bold text-text mb-4">点单 · 购物车</h1>

      <div className="space-y-3 mb-6">
        {cart.map((item) => (
          <div key={item.dishId} className="card flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bg to-primary-light flex items-center justify-center text-3xl shadow-cute emoji flex-shrink-0">
              {item.dishEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text">{item.dishName}</h3>
              <input
                className="w-full mt-1 text-xs px-2 py-1 rounded-lg border border-border bg-bg focus:border-primary focus:outline-none"
                placeholder="口味备注（选填）"
                value={item.note}
                onChange={(e) => updateCartItem(item.dishId, { note: e.target.value })}
                maxLength={30}
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => adjust(item, -1)}
                className="w-7 h-7 rounded-full bg-bg text-text font-bold active:scale-95"
              >−</button>
              <span className="w-7 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => adjust(item, 1)}
                className="w-7 h-7 rounded-full bg-primary text-white font-bold active:scale-95"
              >+</button>
            </div>
            <button
              onClick={() => removeFromCart(item.dishId)}
              className="text-text-sub text-lg ml-1"
            >×</button>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <h3 className="font-semibold text-text mb-2">用餐时间</h3>
        <div className="grid grid-cols-3 gap-2">
          {MEAL_TYPES.map((m) => (
            <button
              key={m.key}
              onClick={() => setMealType(m.key)}
              className={`py-2 rounded-2xl text-sm ${mealType === m.key ? 'bg-primary text-white' : 'bg-bg text-text'}`}
            >
              <span className="emoji mr-1">{m.emoji}</span>{m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <label className="label">整单备注（选填）</label>
        <textarea
          className="input min-h-[60px]"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="例：少油少盐 / 给宝宝的不辣"
          maxLength={100}
        />
      </div>

      {error && <p className="text-danger text-sm mb-3">{error}</p>}

      <div className="fixed left-0 right-0 max-w-[480px] mx-auto bottom-16 px-5">
        <button onClick={submit} className="btn-primary w-full py-4 text-base shadow-cute-lg">
          🍱 提交订单（{cart.length} 道菜）
        </button>
      </div>
    </div>
  );
}

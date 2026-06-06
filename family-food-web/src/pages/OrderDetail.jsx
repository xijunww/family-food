import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../utils/data';
import { useAppStore } from '../utils/store';
import { MEAL_TYPES, ORDER_STATUS } from '../utils/seed';
import { formatDateTime } from '../utils/util';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const [tick, setTick] = useState(0);
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-sub">订单不存在</p>
        <button className="btn-secondary mt-4" onClick={() => navigate(-1)}>返回</button>
      </div>
    );
  }

  const isMine = order.userId === user.id;
  const mealInfo = MEAL_TYPES.find((m) => m.key === order.mealType);
  const status = ORDER_STATUS[order.status];

  const changeStatus = (next) => {
    updateOrderStatus(order.id, next);
    setTick((t) => t + 1);
  };

  return (
    <div className="px-5 pt-6 pb-24">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white shadow-cute">←</button>
        <h1 className="text-xl font-bold text-text ml-3">订单详情</h1>
      </div>

      {/* 点单人 */}
      <div className="card flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bg to-primary-light flex items-center justify-center text-2xl shadow-cute emoji">
          {order.userEmoji}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-text">{order.userNickname}{isMine && '（我）'}</p>
          <p className="text-xs text-text-sub">{formatDateTime(order.createdAt)}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${status.class}`}>{status.name}</span>
      </div>

      {/* 用餐时间 */}
      <div className="card mb-3 flex items-center gap-2">
        <span className="text-2xl emoji">{mealInfo?.emoji}</span>
        <span className="text-text">{mealInfo?.name}</span>
      </div>

      {/* 菜品列表 */}
      <div className="card mb-3">
        <h3 className="font-semibold text-text mb-3">菜品（{order.items.length}）</h3>
        <div className="space-y-3">
          {order.items.map((it, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-xl emoji">
                {it.dishEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-text text-sm font-medium">{it.dishName} ×{it.quantity}</p>
                {it.note && <p className="text-xs text-text-sub">备注：{it.note}</p>}
              </div>
            </div>
          ))}
        </div>
        {order.remark && (
          <div className="mt-3 pt-3 border-t border-border text-sm text-text-sub">
            📝 整单备注：{order.remark}
          </div>
        )}
      </div>

      {/* 状态操作 */}
      {isMine && order.status !== 'served' && order.status !== 'cancelled' && (
        <div className="card">
          <h3 className="font-semibold text-text mb-3">操作</h3>
          <div className="flex flex-wrap gap-2">
            {order.status === 'pending' && (
              <>
                <button onClick={() => changeStatus('confirmed')} className="btn-primary flex-1">
                  ✅ 确认订单
                </button>
                <button onClick={() => changeStatus('cancelled')} className="btn-danger">
                  取消
                </button>
              </>
            )}
            {order.status === 'confirmed' && (
              <>
                <button onClick={() => changeStatus('served')} className="btn-primary flex-1">
                  🍽️ 已上桌
                </button>
                <button onClick={() => changeStatus('cancelled')} className="btn-danger">
                  取消
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

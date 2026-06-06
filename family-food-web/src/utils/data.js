// 业务数据层 - 用户、菜品、订单
import { KEYS, getItem, setItem, genId } from './storage';
import { PRESET_DISHES } from './seed';

// ====== 用户 ======
export function getUsers() {
  return getItem(KEYS.USERS, []);
}

export function findUser(username) {
  return getUsers().find((u) => u.username === username);
}

export function findUserById(id) {
  return getUsers().find((u) => u.id === id);
}

export function registerUser({ username, password, nickname, avatar }) {
  const users = getUsers();
  if (users.some((u) => u.username === username)) {
    return { ok: false, error: '用户名已被占用' };
  }
  const user = {
    id: genId(),
    username,
    password, // 本地玩具级，明文存储
    nickname,
    avatar,
    createdAt: Date.now(),
  };
  users.push(user);
  setItem(KEYS.USERS, users);
  return { ok: true, user };
}

export function loginUser({ username, password }) {
  const user = findUser(username);
  if (!user) return { ok: false, error: '用户不存在' };
  if (user.password !== password) return { ok: false, error: '密码不正确' };
  return { ok: true, user };
}

export function setCurrentUser(user) {
  if (user) {
    setItem(KEYS.CURRENT_USER, { id: user.id, username: user.username });
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function getCurrentUser() {
  const stored = getItem(KEYS.CURRENT_USER);
  if (!stored) return null;
  return findUserById(stored.id) || null;
}

export function logout() {
  localStorage.removeItem(KEYS.CURRENT_USER);
}

// ====== 菜品 ======
export function getDishes() {
  let dishes = getItem(KEYS.DISHES, null);
  if (dishes === null) {
    // 首次启动注入预置数据
    dishes = PRESET_DISHES.map((d) => ({
      id: genId(),
      ...d,
      createdBy: 'system',
      createdAt: Date.now(),
    }));
    setItem(KEYS.DISHES, dishes);
  }
  return dishes;
}

export function getDishesByCategory(category) {
  return getDishes().filter((d) => d.category === category);
}

export function getDishById(id) {
  return getDishes().find((d) => d.id === id);
}

export function addDish({ name, category, emoji, description, tags, createdBy }) {
  const dishes = getDishes();
  const dish = {
    id: genId(),
    name,
    category,
    emoji,
    description: description || '',
    tags: tags || [],
    createdBy,
    createdAt: Date.now(),
    isPreset: false,
  };
  dishes.push(dish);
  setItem(KEYS.DISHES, dishes);
  return dish;
}

export function updateDish(id, patch) {
  const dishes = getDishes();
  const idx = dishes.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  dishes[idx] = { ...dishes[idx], ...patch };
  setItem(KEYS.DISHES, dishes);
  return dishes[idx];
}

export function deleteDish(id) {
  const dishes = getDishes();
  const next = dishes.filter((d) => d.id !== id);
  setItem(KEYS.DISHES, next);
}

// ====== 订单 ======
export function getOrders() {
  return getItem(KEYS.ORDERS, []);
}

export function getOrderById(id) {
  return getOrders().find((o) => o.id === id);
}

export function addOrder({ user, items, mealType, mealTime, remark }) {
  const orders = getOrders();
  const order = {
    id: genId(),
    userId: user.id,
    userNickname: user.nickname,
    userEmoji: user.avatar,
    items: items.map((it) => ({
      dishId: it.dishId,
      dishName: it.dishName,
      dishEmoji: it.dishEmoji,
      quantity: it.quantity,
      note: it.note || '',
    })),
    mealType,
    mealTime: mealTime || null,
    status: 'pending',
    createdAt: Date.now(),
    remark: remark || '',
  };
  orders.push(order);
  setItem(KEYS.ORDERS, orders);
  return order;
}

export function updateOrderStatus(id, status) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  orders[idx].status = status;
  setItem(KEYS.ORDERS, orders);
  return orders[idx];
}

export function getOrdersByUser(userId) {
  return getOrders().filter((o) => o.userId === userId);
}

export function getTodayOrders() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = today.getTime();
  const end = start + 24 * 60 * 60 * 1000;
  return getOrders().filter((o) => o.createdAt >= start && o.createdAt < end);
}

// ====== 购物车 ======
export function getCart() {
  return getItem(KEYS.CART, []);
}

export function setCart(cart) {
  setItem(KEYS.CART, cart);
}

export function addToCart(dish) {
  const cart = getCart();
  const existing = cart.find((c) => c.dishId === dish.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      dishId: dish.id,
      dishName: dish.name,
      dishEmoji: dish.emoji,
      quantity: 1,
      note: '',
    });
  }
  setCart(cart);
  return cart;
}

export function updateCartItem(dishId, patch) {
  const cart = getCart();
  const idx = cart.findIndex((c) => c.dishId === dishId);
  if (idx < 0) return;
  cart[idx] = { ...cart[idx], ...patch };
  setCart(cart);
}

export function removeFromCart(dishId) {
  const cart = getCart().filter((c) => c.dishId !== dishId);
  setCart(cart);
}

export function clearCart() {
  setCart([]);
}

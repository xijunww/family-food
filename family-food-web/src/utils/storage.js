// localStorage 存储封装
const PREFIX = 'family_food_';

export const KEYS = {
  USERS: `${PREFIX}users`,
  DISHES: `${PREFIX}dishes`,
  ORDERS: `${PREFIX}orders`,
  CURRENT_USER: `${PREFIX}current_user`,
  CART: `${PREFIX}cart`,
};

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

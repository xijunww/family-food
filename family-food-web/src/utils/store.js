// 全局 store - 当前用户、购物车数量
import { create } from 'zustand';
import {
  getCurrentUser,
  setCurrentUser as persistUser,
  loginUser as dbLogin,
  registerUser as dbRegister,
  logout as dbLogout,
  getCart,
  addToCart as dbAddToCart,
  updateCartItem as dbUpdateCartItem,
  removeFromCart as dbRemoveFromCart,
  clearCart as dbClearCart,
  getDishById,
} from './data';

export const useAppStore = create((set, get) => ({
  user: getCurrentUser(),
  cart: getCart(),

  // ===== 账号 =====
  login: ({ username, password }) => {
    const res = dbLogin({ username, password });
    if (res.ok) {
      persistUser(res.user);
      set({ user: res.user });
    }
    return res;
  },

  register: ({ username, password, nickname, avatar }) => {
    const res = dbRegister({ username, password, nickname, avatar });
    if (res.ok) {
      persistUser(res.user);
      set({ user: res.user });
    }
    return res;
  },

  logout: () => {
    dbLogout();
    set({ user: null, cart: [] });
  },

  // ===== 购物车 =====
  addToCart: (dishId) => {
    const dish = getDishById(dishId);
    if (!dish) return;
    dbAddToCart(dish);
    set({ cart: getCart() });
  },

  updateCartItem: (dishId, patch) => {
    dbUpdateCartItem(dishId, patch);
    set({ cart: getCart() });
  },

  removeFromCart: (dishId) => {
    dbRemoveFromCart(dishId);
    set({ cart: getCart() });
  },

  clearCart: () => {
    dbClearCart();
    set({ cart: [] });
  },
}));

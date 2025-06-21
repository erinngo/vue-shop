// stores/counter.js
import { defineStore } from "pinia";

export interface ICartInfo {
  readonly id: string;
  readonly count: number;
}

// ICartInfo + IProduct
export interface ICartItems {
  readonly id: string;
  count: number;

  readonly title: string;
  readonly price: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as ICartItems[], //빈배열 + 타입명시
  }),
  persist: true, // localstorage 자동 연동 플러그인 - main.ts에 추가

  actions: {
    addItem(newItem: ICartItems) {
      const existing = this.cartItems.find((item) => item.id === newItem.id);
      if (existing) {
        existing.count += 1;
      } else {
        this.cartItems.push({ ...newItem, count: 1 });
      }
    },
    removeItem(id: string) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
    increase(id: string) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) item.count += 1;
    },
    decrease(id: string) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item && item.count > 1) {
        item.count -= 1;
      } else {
        // 수량 1 - decrease 하면 삭제
        this.removeItem(id);
      }
    },
  },
});

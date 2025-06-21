// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";

// 1. 페이지 컴포넌트 import
import Error from "@views/Error.vue";
import Index from "@views/Index.vue";
import Cart from "@components/carts/CartView.vue";
import Digital from "@views/Digital.vue";
import Accessory from "@views/Accessory.vue";
import Fashion from "@/views/Fashion.vue";
import ProductsDetail from "@components/products/ProductsDetail.vue";

// 2. 라우트 설정 배열 정의

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/fashion",
    name: "Fashion",
    component: Fashion,
  },
  {
    path: "/Digital",
    name: "Digital",
    component: Digital,
  },
  {
    path: "/Accessory",
    name: "Accessory",
    component: Accessory,
  },
  //path="/products/:id"
  {
    path: "/products/:id",
    name: "ProductsDetail",
    component: ProductsDetail,
  },
  /**
   * Error 부분 설정 주의  --- 맨 뒤에 위치
   * 라우터 이동시 실제 정의된 라우터 없으면, 자동으로 Error.vue 렌더링
   */
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: Error,
  },
];

// 3. createRouter로 라우터 인스턴스 생성
const router = createRouter({
  history: createWebHistory(), // HTML5 history 모드
  routes, // 위에서 정의한 라우트 배열
});

// 4. 생성한 라우터 인스턴스 export
export default router;

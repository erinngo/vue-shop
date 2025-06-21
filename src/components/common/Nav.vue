<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/vue/24/outline";
import Theme from "@components/common/Theme.vue";
import SearchBox from "@components/common/SearchBox.vue";
import { watch } from "vue";
import { useCartStore } from "@/store/cart";

// 햄버거 메뉴 상태   --> ref + v-if : 반응형 조건 렌더링
const menuOpen = ref(false);

// watch(menuOpen, (newVal) => {
//   newVal = !newVal;
// });

const cartStore = useCartStore();

watch(cartStore.cartItems, (newVal) => {
  console.log("🛒 장바구니 변경됨", newVal);
});

const cartItems = computed(() => cartStore.cartItems);
const totalCount = computed(() =>
  cartStore.cartItems.reduce((acc, item) => acc + item.count, 0)
);

// 장바구니 아이템 수 (임시 값 또는 props로 받아도 됨)
// const totalCount = 3;
</script>

<template>
  <header class="navbar w-full relative">
    <nav class="flex items-center w-full xl:container xl:m-auto">
      <!-- 좌측: 햄버거 + 로고 -->
      <div class="flex items-center">
        <button @click="menuOpen = !menuOpen" class="lg:hidden">
          <Bars3Icon class="w-6 h-6" />
        </button>
        <RouterLink to="/" class="ml-2 lg:ml-0">
          <h1 class="text-xl font-bold">Vue Shop</h1>
        </RouterLink>
      </div>

      <!-- 중간: 카테고리 -->
      <div class="flex-1">
        <ul class="hidden lg:flex space-x-5 font-semibold pl-6">
          <li><RouterLink to="/fashion">패션</RouterLink></li>
          <li><RouterLink to="/accessory">액세서리</RouterLink></li>
          <li><RouterLink to="/digital">디지털</RouterLink></li>
        </ul>
      </div>

      <!-- 우측: 테마, 검색, 장바구니 -->
      <div class="flex items-center space-x-4">
        <div>
          <Theme />
        </div>
        <div>
          <SearchBox />
        </div>

        <div>
          <RouterLink to="/cart">
            <div class="relative">
              <ShoppingBagIcon class="test w-6 h-6" />
              <span
                class="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full"
              >
                {{ totalCount }}
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- 모바일 메뉴 -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-40 cursor-pointer"
      v-if="menuOpen"
      @click="menuOpen = !menuOpen"
    />
    <div
      v-if="menuOpen"
      class="fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white p-6 z-50 shadow-lg transition-transform duration-300"
    >
      <ul class="space-y-6 text-lg font-semibold">
        <RouterLink to="/fashion" class="p-6" @click="menuOpen = !menuOpen"
          ><li>패션</li></RouterLink
        >
        <RouterLink to="/accessory" class="p-6" @click="menuOpen = !menuOpen"
          ><li>액세서리</li></RouterLink
        >
        <RouterLink to="/digital" class="p-6" @click="menuOpen = !menuOpen"
          ><li>디지털</li></RouterLink
        >
      </ul>
    </div>
  </header>
</template>

<style scoped>
.nav {
  padding: 16px 32px;
  background: #24292f;
  display: flex;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  align-items: center;
}
.a {
  display: inline-block;
}
</style>

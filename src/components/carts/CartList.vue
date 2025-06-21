<script setup>
//전역상태 불러와서 뿌려주기
import { useCartStore } from "@/store/cart";
import { computed } from "vue";
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);

console.log(cartStore.cartItems);
//TODO: 장바구니 추가시 함수

const handleDecrease = (id) => {
  cartStore.decrease(id);
};
const handleIncrease = (id) => {
  cartStore.increase(id);
};
</script>

<template>
  <section class="">
    <div v-if="cartItems.length > 0">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex gap-6 items-center border-b border-gray-600 pb-6 pt-6"
      >
        <figure
          class="w-56 flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white"
        >
          <img :src="item.image" class="w-full h-28 object-contain" />
        </figure>

        <div class="flex-1">
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-md mt-1">${{ item.price }}</p>

          <div class="flex items-center gap-2 mt-2">
            <button
              class="btn btn-sm btn-primary"
              @click="handleDecrease(item.id)"
            >
              -
            </button>
            <span>{{ item.count }}</span>
            <button
              class="btn btn-sm btn-primary"
              @click="handleIncrease(item.id)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-10">
      <div>장바구니가 비어있습니다 🛒</div>
      <RouterLink to="/" className="btn btn-primary mt-10">
        담으러 가기
      </RouterLink>
    </div>
  </section>
</template>

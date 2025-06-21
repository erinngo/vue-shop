<script setup>
import { computed } from "vue";
import Breadcrumb from "../common/Breadcrumb.vue";
import CartList from "./CartList.vue";
import { RouterLink } from "vue-router";
import { useCartStore } from "@/store/cart";

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartItems);
const totalPrice = computed(() =>
  cartStore.cartItems.reduce((acc, item) => acc + item.price * item.count, 0)
);
</script>

<template>
  <section
    className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto"
  >
    <Breadcrumb category="홈" crumb="장바구니" />
    <div className="mt-6 md:mt-14 px-2 lg:px-0">
      <CartList />
    </div>
    <div class="flex flex-row justify-end items-center gap-2 mt-6">
      <span class="text-md font-semibold">총 : ${{ totalPrice }}</span>
      <button class="btn btn-md btn-outline btn-secondary">구매하기</button>
    </div>
  </section>
</template>

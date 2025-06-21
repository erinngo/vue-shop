<!-- 제품 상세 UI -->
<!-- 전체 화면에서 - 제품 id로 해당상품을 불러온다 -->
<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { productsList } from "@/store/products";
import { useCartStore } from "@/store/cart";
import { RouterLink } from "vue-router";

//전역객체 - 인스턴스 생성
const store = productsList();
const route = useRoute();

const cartStore = useCartStore();

onMounted(async () => {
  if (store.products.length === 0) {
    await store.fetchProducts(); // 비동기 처리
  }
});

/**
 * id를 computed() 로 정의해야하는 이유
 */
// const id = Number(route.params.id);
const id = computed(() => route.params.id);

//해당 id를 가진 Product 찾기
const item = computed(() => {
  const filteredProduct = store.products.find(
    (product) => product.id == id.value
  );
  return filteredProduct;
});
console.log(typeof item);

const handleAddToCart = () => {
  if (!item.value) {
    return;
  }
  // console.log(item);
  cartStore.addItem(item.value);
};
</script>
<template>
  <section
    v-if="item"
    class="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto"
  >
    <Breadcrumb :category="item?.category" :crumb="item?.title" />
    <div class="flex flex-col lg:flex-row bg-base-100">
      <figure class="flex-shrink-0 p-6">
        <img
          :src="item.image"
          alt="이미지 표시"
          class="object-contain w-full h-72"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-xl font-bold">
          {{ item.title }}
          <div class="badge badge-success">NEW</div>
        </h2>
        <p class="text-gray-600">{{ item.description }}</p>

        <div class="flex items-center space-x-2 mt-2">
          <div class="rating rating-sm">
            <input
              v-for="i in 5"
              :key="i"
              type="radio"
              class="mask mask-star-2 bg-yellow-400"
              :checked="i <= Math.floor(item.rating.rate)"
            />

            <!-- <input type="radio" class="mask mask-star-2 bg-yellow-400" />
            <input type="radio" class="mask mask-star-2 bg-yellow-400" />
            <input type="radio" class="mask mask-star-2 bg-yellow-400" />
            <input type="radio" class="mask mask-star-2 bg-yellow-400" /> -->
          </div>
          <span class="text-sm text-gray-500"> {{ item.rating.rate }}</span>
        </div>

        <h3 class="text-2xl font-semibold mt-4">$ {{ item.price }}</h3>

        <div class="card-actions justify-start mt-4">
          <button class="btn btn-primary" @click="handleAddToCart">
            장바구니에 담기
          </button>
          <RouterLink to="/cart"
            ><button class="btn btn-outline">
              장바구니로 이동
            </button></RouterLink
          >
        </div>
      </div>
    </div>
  </section>
  <p v-else class="text-center py-10">상품 정보를 불러오는 중입니다...</p>
</template>

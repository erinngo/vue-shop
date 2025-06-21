<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { productsList } from "@/store/products";
import { Category } from "@/constants/category";
import ProductsLoad from "./ProductsLoad.vue";

interface Props {
  category: string;
  limit: number;
}
//vue3의 방식 - 부모로부터 받은 props 정의
const props = defineProps<Props>();

//최초에는 skeleton이 보이지 않는 형태
const isLoading = ref(false);

//1. 전역 객체 불러오기
const store = productsList();
console.log(store);

//2. API 호출 + 로딩 처리

onMounted(async () => {
  if (store.products.length === 0) {
    isLoading.value = true;
    try {
      await store.fetchProducts();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
});
/**
 * 3. fetch 데이터 활용
 * 카테고리 매칭하여 카테고리별로 filtering된 리스트 만들기
 *
 * pinia로 관리하는 데이터 불러옴 --> store.products
 */
const filteredItems = computed(() => {
  const filteredFromAPI = store.products.filter(
    (product) => props.category === Category[product.category]
  );
  return filteredFromAPI.slice(0, props.limit);
});

/**
 * 카테고리에 맞게 뿌려주기 한세트
 */
</script>

<template>
  <h2 class="text-xl font-bold mb-4">{{ props.category }}</h2>

  <!-- 로딩 skeleton -->
  <ProductsLoad v-if="isLoading && filteredItems.length === 0" :limit="4" />
  <p
    v-else-if="!isLoading && filteredItems.length === 0"
    class="text-center text-gray-500"
  >
    !!상품이 없습니다.
  </p>

  <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
    <!-- li 포문 돌려서 뿌려주기 -->

    <li v-for="item in filteredItems" :key="item.id" class="h-[400px]">
      <RouterLink
        :to="`/products/${item.id}`"
        class="card card-bordered border border-gray-200 dark:border-gray-800 h-full"
      >
        <figure
          class="w-full h-60 bg-white overflow-hidden flex justify-center items-center"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="max-h-full object-contain scale-75 hover:scale-100 transition duration-300 cursor-pointer"
          />
        </figure>

        <div
          class="card-body bg-gray-100 dark:bg-gray-700 flex flex-col flex-1 justify-between"
        >
          <h3 class="card-title text-base line-clamp-3">{{ item.title }}</h3>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">${{ item.price }}</div>
          </div>
        </div>
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { productsList } from "@/store/products";
import { useRouter } from "vue-router";

const store = productsList();
const inputValue = ref("");
const searchOpen = ref(false);
const router = useRouter();
const selectedIndex = ref(-1);

// const setSelectedIndex = (newValue: number | ((prev: number) => number)) => {
//   selectedIndex.value = newValue;
// };

// 콘솔 확인용
watch(inputValue, (newVal) => {
  console.log("inputValue:", newVal);
});
watch(searchOpen, (newVal) => {
  console.log("searchOpen:", newVal);
  if (!newVal) {
    inputValue.value = "";
    selectedIndex.value = -1;
  }
});
//input 외부 클릭 감지

const pcInputRef = ref<HTMLElement | null>(null);
const mobileInputRef = ref<HTMLElement | null>(null);
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node;
  const isInsidePC = pcInputRef.value?.contains(target);
  const isInsideMobile = mobileInputRef.value?.contains(target);

  if (!isInsidePC && !isInsideMobile) {
    inputValue.value = "";
    selectedIndex.value = -1;
    searchOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 최초 마운트 시 상품 목록 요청
onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts();
    console.log("fetch done");
  }
});

// computed ::  inputValue 변경 → 자동 필터링
const filteredList = computed(() => {
  if (!inputValue.value) return [];
  return store.products.filter((item) =>
    item.title.toLowerCase().includes(inputValue.value.toLowerCase())
  );
});

const handleClick = (id: number) => {
  router.push(`/products/${id}`);
  inputValue.value = "";
  searchOpen.value = false;
};
const handleKeyDown = (e: KeyboardEvent) => {
  if (filteredList.value.length === 0) return;

  const keyType = e.key;

  switch (keyType) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value =
        (selectedIndex.value + 1) % filteredList.value.length;
      console.log(selectedIndex.value);

      break;
    case "ArrowUp":
      e.preventDefault();
      selectedIndex.value =
        selectedIndex.value === 0
          ? filteredList.value.length - 1
          : selectedIndex.value - 1;
      break;
    case "Enter":
      //해당페이지로 이동, setQuery('')
      const selectedList = filteredList.value[selectedIndex.value];
      router.push(`/products/${selectedList.id}`);
      selectedIndex.value = -1;
      inputValue.value = "";
      searchOpen.value = false;
      break;
    case "Escape":
      selectedIndex.value = -1;
      inputValue.value = "";
      break;
  }
};
</script>

<template>
  <!-- 모바일 검색 아이콘 -->
  <!-- <button class="sm:hidden" @click="searchOpen = !searchOpen">
    <MagnifyingGlassIcon class="w-6 h-6" />
  </button> -->

  <!-- PC 검색창 -->
  <div ref="pcInputRef" class="relative hidden sm:block w-full">
    <input
      class="px-4 py-1 rounded-md bg-gray-300 text-gray-900 dark:text-white color:bg-gray-600 dark:bg-gray-600 w-full"
      placeholder="search..."
      v-model="inputValue"
      @keydown="handleKeyDown"
    />

    <!-- 검색 결과 목록 -->
    <ul
      class="absolute left-0 top-full w-full z-50 overflow-y-auto bg-base-200 rounded-box shadow mt-1 bg-gray-300 text-gray-900 dark:text-white color:bg-gray-600 dark:bg-gray-600"
      v-if="filteredList.length > 0"
    >
      <li
        v-for="(item, idx) in filteredList"
        :key="item.id"
        class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
        :class="{ 'bg-gray-100 dark:bg-gray-400': selectedIndex === idx }"
        @click="handleClick(item.id)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>

  <!-- 모바일 검색창 + 모바일 검색아이콘-->

  <div ref="mobileInputRef" class="sm:hidden">
    <!-- 모바일 검색 아이콘 -->
    <button @click="searchOpen = !searchOpen">
      <MagnifyingGlassIcon class="w-6 h-6" />
    </button>
    <div v-show="searchOpen" class="absolute top-full left-0 w-full z-50">
      <input
        class="px-4 py-4 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="검색어를 입력하세요"
        v-model="inputValue"
        @keydown="handleKeyDown"
      />
      <ul
        class="absolute left-0 top-full w-full z-50 overflow-y-auto bg-base-200 shadow bg-gray-300 color:bg-gray-600 dark:bg-gray-600 text-gray-900 dark:text-white"
        v-if="filteredList.length > 0"
      >
        <li
          v-for="(item, idx) in filteredList"
          :key="item.id"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
          :class="{ 'bg-gray-100 dark:bg-gray-400': selectedIndex === idx }"
          @click="handleClick(item.id)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

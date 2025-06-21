<script setup>
import ItemList from "../components/products/ItemList.vue";
import Slider from "@/components/common/Slider.vue";
</script>

<!-- ItemList 컴포넌트에서 props 별로 filtering -->
<template>
  <!-- //TODO: 슬라이더 기능 추가 -->

  <Slider />
  <section
    className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto"
  >
    <!-- 카테고리 - 패션 -->
    <RouterLink to="/fashion">
      <ItemList category="패션" :limit="4" />
    </RouterLink>
  </section>
  <section
    className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto"
  >
    <!-- 카테고리 - 악세서리 -->
    <ItemList category="악세서리" :limit="4" />
  </section>
  <section
    className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto"
  >
    <!-- 카테고리 - 디지털 -->
    <ItemList category="디지털" :limit="4" />
  </section>
</template>

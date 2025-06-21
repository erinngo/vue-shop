<script setup lang="ts">
defineProps<{
  limit: number;
}>();
</script>

<template>
  <div
    v-if="limit > 0"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4 justify-items-center"
  >
    <div v-for="index in limit" :key="index">
      <div class="flex w-60 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="flex items-center gap-4">
          <div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div class="flex flex-col gap-4">
            <div class="skeleton h-4 w-20"></div>
            <div class="skeleton h-4 w-28"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-if="limit > 0">
    <div v-for="index in limit" :key="index" class="card bordered">
      <div class="skeleton w-full h-64 rounded"></div>
      <div class="card-body space-y-2">
        <div class="skeleton h-4 w-3/4"></div>
        <div class="skeleton h-4 w-1/2"></div>
        <div class="skeleton h-4 w-1/4"></div>
      </div>
    </div>
  </div> -->
  <div v-else>제품이 없습니다.</div>
</template>

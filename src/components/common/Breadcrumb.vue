<script setup lang="ts">
import { computed } from "vue";
import { Category } from "@/constants/category";

interface IBreadCrumbsProps {
  readonly category?: string;
  readonly crumb?: string;
}
const props = defineProps<IBreadCrumbsProps>();
const resolvedCategory = computed(() => {
  if (!props.category) return "";
  return Category[props.category] || props.category;
});
</script>

<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <!-- 만약 category가 있다면 첫 번째 crumb로 표시 -->
      <li v-if="resolvedCategory">{{ resolvedCategory }}</li>
      <!-- crumb가 있다면 두 번째 crumb로 표시 -->
      <li v-if="props.crumb" class="whitespace-normal">{{ props.crumb }}</li>
    </ul>
  </div>
</template>

<style></style>

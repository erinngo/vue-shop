<script setup>
import { ref, watch, onMounted } from "vue";

import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

/**
 * ref()
 */
function intialTheme() {
  const stored = localStorage.getItem("isDark");
  return stored == null ? true : JSON.parse(stored);
}
const isDark = ref(intialTheme());

onMounted(() => {
  applyTheme(isDark.value);
});

// isDark.value = newVal
//watch는 Dark에 변동이 있어야만 실행됨 -> 최초 렌더링될때 테마일치를 위해 - onMounted 작업 필요
watch(isDark, (newVal, oldVal) => {
  applyTheme(newVal);
  localStorage.setItem("isDark", JSON.stringify(newVal));
  //   console.log({ newVal, oldVal });
});

function applyTheme(newVal) {
  const html = document.documentElement;
  //html : data-them 속성 통제
  html.setAttribute("data-theme", newVal ? "dark" : "light");
  //html : class 속성 통제
  html.classList.toggle("dark", newVal);
}
</script>
<template>
  <!-- <input v-model="name" />
  <p>안녕하세요, {{ name }}님!</p> -->

  <!-- theme control, swap등은 daisyUI -->
  <label class="swap swap-rotate cursor-pointer">
    <input type="checkbox" class="theme-controller" v-model="isDark" />
    <!-- 아이콘 전환 -->
    <SunIcon class="w-8 h-8 swap-off" />
    <MoonIcon class="w-8 h-8 swap-on" />
  </label>
</template>
<style></style>

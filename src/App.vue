<script setup lang="ts">
import Nav from "./components/common/Nav.vue";
import Footer from "./components/common/Footer.vue";
</script>

<template>
  <section class="flex flex-col justify-start min-h-screen">
    <Nav></Nav>
    <section class="main flex-1">
      <router-view />
    </section>
    <Footer></Footer>
  </section>
</template>

<style scoped></style>

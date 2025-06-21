<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import fashionImg from "../../assets/img/carousel/img_shop_fashion.jpeg";
import digitalImg from "../../assets/img/carousel/img_shop_digital.jpeg";
import groceryImg from "../../assets/img/carousel/img_shop_grocery.jpeg";

const items = [
  {
    name: "fashion",
    title: "물빠진 청바지!",
    text: "이제 막 도착한 패션 청바지를 구경해 보세요.",
    img: fashionImg,
  },
  {
    name: "digital",
    title: "신속한 업무처리!",
    text: "다양한 디지털 상품을 둘러보세요.",
    img: digitalImg,
  },
  {
    name: "grocery",
    title: "신선한 식품!",
    text: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
    img: groceryImg,
  },
];
</script>

<template>
  <Carousel
    :items-to-show="1"
    :wrap-around="true"
    :autoplay="2000"
    :pause-autoplay-on-hover="true"
  >
    <Slide v-for="(item, index) in items" :key="index">
      <div class="relative w-full">
        <!--1. Slide 이미지 : 배경 -->
        <img :src="item.img" class="object-cover" />
        <!--2. 카드 오버레이 absolute -->
        <div
          class="absolute card top-1/2 left-4 transform -translate-y-1/2 rounded-xl p-4"
        >
          <h2 class="text-4xl font-bold text-white">{{ item.title }}</h2>
          <p class="text-xl mt-1 text-white">{{ item.text }}</p>
          <div class="card-actions justify-start mt-8">
            <RouterLink :to="`/${item.name}`"
              ><button class="btn btn-xl btn-primary">
                바로가기
              </button></RouterLink
            >
          </div>
        </div>
      </div>
    </Slide>
    <!-- Pagination -->
    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>
<style>
.carousel__pagination-button {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 5px;
}

.carousel__pagination-button--active {
  background-color: #333;
}
</style>

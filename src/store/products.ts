import CONSTANTS from "../constants/constants";
import { defineStore } from "pinia";

const productsURL = `${
  CONSTANTS.IS_DEV ? `/proxy` : `${import.meta.env.VITE_FAKE_STORE_API}`
}/products`;
console.log(productsURL);

interface IRating {
  readonly rate?: number;
  readonly count?: number;
}
export interface IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly image: string;
  readonly rating: IRating;
}

/**
 * productList는 API 1회 요청 후에 유지됩니다.
 * 디테일 페이지에서는 productDetail/id로 각각 호출하셔도 무방합니다.
 *
 * Pinia 전역상태관리
 */
export const productsList = defineStore("productsList", {
  //pinia의 상태값
  state: () => ({
    products: [] as IProduct[],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch(productsURL);
        const data = await response.json();
        this.products = data; // fetch데이터를 pinia 상태에 저장
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
  },
});

// export const productsList = selector<IProduct[]>({
//   key: "productsList",
//   get: async () => {
//     try {
//       const response = await fetch(productsURL);
//       // console.log(await response.json());
//       return (await response.json()) || [];
//     } catch (error) {
//       console.log(`Error: \n${error}`);
//       return [];
//     }
//   },
// });

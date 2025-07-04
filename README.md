## Vue3 쇼핑몰 앱 (vue, typescript, vite, vercel)

- https://vue-shop-sage.vercel.app/

## 목적

1. React -> Vue 마이그레이션
2. SPA 쇼핑몰 기본 기능 구현

- 아이템 구분 및 정리
- 장바구니
- 검색 필터
- day/night UI

## 프로젝트 구조

```
/src
├── components
│ ├── carts - CartList.vue / CartView.vue
│ ├── common - Nav.vue / SearchBox.vue / Footer.vue / Breadcrumb.vue / Theme.vue
│ ├── products - ItemList.vue / ProductsDetail.vue
│ └──
├── views
│ ├── Index.vue
│ ├── Digital.vue
│ ├── Fashion.vue
│ ├── Accessory.vue
│ └── Error.vue
├── store
├── router - index.ts

```

---

## Skeleton UI (ItemList.vue) 구현

### 문제

로딩 중 보여주는 Skeleton 컴포넌트(ProductsLoad)와 실제 상품 데이터(filteredItems)가 동시에 화면에 표시되는 현상이 발생했다.

### 발생 원인?

isLoading이 false 되기 전에 filteredItems가 이미 존재하는 상태였다.이는 store.fetchProducts() 가 완료되면 store.products 가 갱신되고, filteredItems는 computed에 의해 즉시 반응형으로 계산되기 때문이다. 그 결과, skeleton이 사라지기 전에 실제 상품이 노출되는 짧은 시점이 발생했다.

### 해결

skeleton은 "로딩중 + 아무 데이터도 없음" 이 경우에만 렌더되도록 분기 처리하여 해결했다.

[v-if 조건 처리 명확하게]

1. v-if : 로딩 중, 데이터 없음
2. v-else-if : 로딩 끝, 데이터 없음
3. v-else : 로딩 끝, 데이터 있음

## 검색창 외부 클릭 감지 (SearchBox.vue)

### 1. 아이디어

검색창(input)을 ref로 지정한 뒤, 해당 요소 외부를 클릭했을 때 inputValue를 초기화하고 searchOpen 상태를 닫는 방식으로 구현

### 2. 레이아웃 수정

- 모바일에서 검색 아이콘 클릭 시 input 박스가 나타나지 않는 문제 발생
  → 박스가 나타나지 않는게 아니라, 클릭 즉시 사라지는 문제임을 확인
  → 이는 아이콘 클릭도 외부 클릭으로 처리되었기 때문
  → 이를 방지하기 위해 검색 아이콘과 input을 동일한 ref 범위로 묶는 구조로 변경

- PC 검색창과 모바일 검색창을 분리 관리
  → ref를 pcInputRef, mobileInputRef로 나누고
  → 조건 분기 없이 두 요소 중 어디에도 포함되지 않은 경우만 외부 클릭으로 감지하도록 개선

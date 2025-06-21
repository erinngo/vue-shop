# Vue3 쇼핑몰 앱 (typescript, vite)

## 목적

## 구조

## 트러블 슈팅 - Skeleton UI (ItemList.vue)

#### 문제

로딩 중 보여주는 Skeleton 컴포넌트(ProductsLoad)와 실제 상품 데이터(filteredItems)가 동시에 화면에 표시되는 현상이 발생했다.

#### 발생 원인?

isLoading이 false 되기 전에 filteredItems가 이미 존재하는 상태였다.이는 store.fetchProducts() 가 완료되면 store.products 가 갱신되고, filteredItems는 computed에 의해 즉시 반응형으로 계산되기 때문이다. 그 결과, skeleton이 사라지기 전에 실제 상품이 노출되는 짧은 시점이 발생했다.

#### 해결

skeleton은 "로딩중 + 아무 데이터도 없음" 이 경우에만 렌더되도록 분기 처리하여 해결했다.

[v-if 조건 처리 명확하게]

1. v-if : 로딩 중, 데이터 없음
2. v-else-if : 로딩 끝, 데이터 없음
3. v-else : 로딩 끝, 데이터 있음

## 트러블 슈팅 - 레이아웃 쉬프트

## 트러블 슈팅 - 검색창 외부 클릭 감지

#### 1. 아이디어

input 요소를 ref로 지정하고 ref 이외의 영역 클릭시 input 초기화

#### 2. 레이아웃 수정

-모바일에서 검색아이콘 클릭시 input 박스가 나타나지 않는 문제
추가적으로 검색아이콘 클릭 예외처리
모바일 검색 아이콘과 input 박스를 같은 depth로 두고 하나의 div로 감싸기 위해 기존 레이아웃의 수정이 필요했다.

ref 범위를 pc버전 input, mobile버전 input 으로 제한하기 위해 기존 레이아웃의 수정이 필요했다.

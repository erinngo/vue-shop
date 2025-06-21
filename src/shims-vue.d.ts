//TS가 .vue 파일을 인식하지 못하는 경우
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

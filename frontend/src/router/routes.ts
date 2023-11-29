import { RouteConfig } from "vue-router";
import CdFooter from "@/components/base/cd.footer.vue";
import CdDataset from "@/components/dataset/cd.dataset.vue";

export const routes: RouteConfig[] = [
  {
    name: "dataset",
    path: "/",
    components: { content: CdDataset, footer: CdFooter },
    meta: {
      title: "Dataset",
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

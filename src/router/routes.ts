import { RouteConfig } from "vue-router";
import CdDataset from "@/components/dataset/cd.dataset.vue";

export const routes: RouteConfig[] = [
  {
    name: "dataset",
    path: "/",
    components: { content: CdDataset },
    meta: {
      title: "Dataset",
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

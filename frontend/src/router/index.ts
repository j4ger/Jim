import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ConversationsVue from "../views/Conversations.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: ConversationsVue },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "activeNavigation",
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Conversations from "../views/Conversations.vue";
import Contacts from "../views/Contacts.vue";
import About from "../views/About.vue";
import Conversation from "../views/Conversation.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Conversations",
    component: Conversations,
    name: "对话",
    meta: { fixedTitle: true },
  },
  {
    path: "/Contacts",
    component: Contacts,
    name: "联系人",
    meta: { fixedTitle: true },
  },
  {
    path: "/About",
    component: About,
    name: "关于我",
    meta: { fixedTitle: true },
  },
  {
    path: "/Conversation/:targetId",
    component: Conversation,
    name: "聊天",
    props: true,
  },
  { path: "/:pathMatch(.*)*", redirect: "/Conversations" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "activeNavigation",
});

export default router;

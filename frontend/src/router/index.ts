import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ConversationsVue from "../views/Conversations.vue";
import ContactsVue from "../views/Contacts.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Conversations",
    component: ConversationsVue,
    name: "Conversations",
  },
  {
    path: "/Contacts",
    component: ContactsVue,
    name: "Contacts",
  },
  {
    path: "/About",
    component: ConversationsVue,
    name: "About",
  },
  { path: "/:pathMatch(.*)*", redirect: "/Conversations" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "activeNavigation",
});

export default router;

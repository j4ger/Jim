import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ConversationsVue from "../views/Conversations.vue";
import ContactsVue from "../views/Contacts.vue";
import AboutVue from "../views/About.vue";
import ConversationVue from "../views/Conversation.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/Conversations",
    component: ConversationsVue,
    name: "对话",
    meta: { fixedTitle: true },
  },
  {
    path: "/Contacts",
    component: ContactsVue,
    name: "联系人",
    meta: { fixedTitle: true },
  },
  {
    path: "/About",
    component: AboutVue,
    name: "关于我",
    meta: { fixedTitle: true },
  },
  {
    path: "/Conversation/:targetId",
    component: ConversationVue,
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

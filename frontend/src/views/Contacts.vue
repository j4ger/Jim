<template>
  <div class="viewContainer">
    <div class="searchBar bars">
      <div class="searchBlock">
        <div class="searchHint">
          <img src="@sicons/fa/Search.svg" alt="搜索" class="searchIcon" />
          <span class="searchText">搜索</span>
        </div>
      </div>
    </div>
    <div class="contactSection">
      <div
        class="contactContainer ripple"
        v-for="(contact, index) in store.state.contacts"
        :key="index"
        @click="goToConversation(contact.id)"
      >
        <img class="avatarIcon" :src="contact.avatar" alt="头像" />
        <div class="contactContent">
          <span class="contactName">{{ contact.nickname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { CHANGE_TRANSITION } from "@/store/mutationTypes";
import { onBeforeRouteLeave } from "vue-router";
const store = useStore();

onBeforeRouteLeave((to) => {
  if (to.fullPath == "/Conversations") {
    store.commit(CHANGE_TRANSITION, "slide-in-right");
  } else {
    store.commit(CHANGE_TRANSITION, "slide-in-left");
  }
});

import { useRouter } from "vue-router";
const router = useRouter();
const goToConversation = (id: string) => {
  router.push({ name: "聊天", params: { targetId: id } });
};
</script>
<style lang="stylus">
@import '../styles/config.styl';

.contactSection {
  margin-top: 15px;
}

.contactContainer {
  display: flex;
  width: 100%;
  align-items: center;
  height: 70px;
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
}

.contactContent {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  max-width: 80%;
}

.contactName {
  font-size: 20px;
  font-variant: bold;
  font-weight: 700;
}
</style>

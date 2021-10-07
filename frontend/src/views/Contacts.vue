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
        class="contactGroup"
        v-for="group in store.getters.groupedContacts"
        :key="group[0]"
      >
        <div class="initialBlock">
          <span class="initial"> {{ group[0].toUpperCase() }}</span>
        </div>
        <div
          class="contactContainer ripple"
          v-for="(contact, index) in group[1]"
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
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { CHANGE_TRANSITION, HIDE_NAV_BAR } from "@/store/mutationTypes";
import { onBeforeRouteLeave } from "vue-router";
const store = useStore();

onBeforeRouteLeave((to) => {
  if (to.fullPath == "/Conversations") {
    store.commit(CHANGE_TRANSITION, "slide-in-right");
  } else {
    store.commit(CHANGE_TRANSITION, "slide-in-left");
  }
  if (to.name == "聊天") {
    store.commit(HIDE_NAV_BAR);
  }
});

import { useRouter } from "vue-router";
const router = useRouter();
const goToConversation = (id: number) => {
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

.initialBlock {
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  border-top: 1px solid $press-down-grey;
  border-bottom: 1px solid $press-down-grey;
}

.initial {
  font-weight: bold;
}
</style>

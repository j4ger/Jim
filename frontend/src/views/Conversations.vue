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
    <div class="conversationSection">
      <ConversationContainer
        v-for="(conversation, index) in store.getters.sortedConversations"
        :conversation="conversation"
        :key="index"
      ></ConversationContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationContainer from "@/components/ConversationContainer.vue";

import { useStore } from "@/store";
const store = useStore();

import { onBeforeRouteLeave } from "vue-router";
import { CHANGE_TRANSITION, HIDE_NAV_BAR } from "@/store/mutationTypes";
onBeforeRouteLeave((to) => {
  store.commit(CHANGE_TRANSITION, "slide-in-left");
  if (to.name == "聊天") {
    store.commit(HIDE_NAV_BAR);
  }
});
</script>

<style lang="stylus">
@import '../styles/config.styl';

.conversationSection {
  margin-top: 15px;
}
</style>

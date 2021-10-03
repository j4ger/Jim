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
        class="contactContainer"
        v-for="(contact, index) in store.state.contacts"
        :key="index"
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
const store = useStore();
</script>
<style lang="stylus">
@import '../styles/config.styl';

.contactSection {
  margin-top: 15px;
  padding-left: 5px;
}

.contactContainer {
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  height: 60px;
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

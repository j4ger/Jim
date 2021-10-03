<template>
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
</template>

<script setup lang="ts">
import { useStore } from "@/store";
const store = useStore();
</script>
<style lang="stylus">
@import '../styles/config.styl';

.searchBar {
  height: 30px;
  margin-bottom: 10px;
}

.searchBlock {
  background-color: $background-grey;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-radius: 2%;
  padding-top: 1px;
}

.searchHint {
  display: inline-block;
  vertical-align: middle;
}

.searchIcon {
  height: 12px;
  width: 12px;
  margin-right: 4px;
  filter: invert(68%) sepia(0%) saturate(102%) hue-rotate(284deg) brightness(95%) contrast(82%);
}

.searchText {
  font-size: 16px;
  color: $disabled-grey;
}

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

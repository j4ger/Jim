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
      <div
        class="conversationContainer ripple"
        v-for="(conversation, index) in store.state.conversations"
        :key="index"
      >
        <img
          class="avatarIcon"
          :src="getContact(conversation[0])?.avatar ?? DEFAULT_AVATAR"
          alt="头像"
        />
        <div class="conversationContent">
          <span class="conversationContactName">{{
            getContact(conversation[0])?.nickname ?? DEFAULT_NICKNAME
          }}</span>
          <span class="messageDigest">{{
            conversation[1][0].content[0].content
          }}</span>
        </div>
        <span class="messageTime">{{
          moment(conversation[1][0].timestamp).fromNow()
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

import { Contact, DEFAULT_AVATAR, DEFAULT_NICKNAME } from "../store/interfaces";

import { useStore } from "@/store";
const store = useStore();

const getContact = function (id: string): Contact | null {
  let result = null;
  store.state.contacts.forEach((element) => {
    if (element.id == id) result = element;
  });
  return result;
};
</script>

<style lang="stylus">
@import '../styles/config.styl';

.conversationSection {
  margin-top: 15px;
}

.conversationContainer {
  display: flex;
  width: 100%;
  align-items: center;
  height: 70px;
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
}

.conversationContent {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  max-width: 80%;
}

.conversationContactName {
  font-size: 20px;
  font-variant: bold;
  font-weight: 700;
}

.messageDigest {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatarIcon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.messageTime {
  position: absolute;
  right: 15px;
  margin-top: -30px;
  color: $disabled-grey;
}
</style>

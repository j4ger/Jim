<template>
  <div
    class="conversationContainer"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @click="goToConversation(props.conversation[0])"
    :class="{
      swiped: swiped,
    }"
    v-show="
      !(
        store.state.conversationOptions.get(props.conversation[0])?.removed ??
        false
      )
    "
  >
    <div
      class="conversationMain ripple"
      :class="{
        pinned:
          store.state.conversationOptions.get(props.conversation[0])?.pinned ??
          false,
      }"
    >
      <img
        class="avatarIcon"
        :src="getContact(props.conversation[0])?.avatar ?? DEFAULT_AVATAR"
        alt="头像"
      />
      <div class="conversationContent">
        <div class="conversationContentFirstLine">
          <span class="conversationContactName">{{
            getContact(props.conversation[0])?.nickname ?? DEFAULT_NICKNAME
          }}</span>
          <span class="messageTime">{{
            moment(props.conversation[1][0].timestamp).fromNow()
          }}</span>
        </div>
        <div class="conversationContentSecondLine">
          <span class="messageDigest">{{
            props.conversation[1][0].content[0].content
          }}</span>
          <div class="unreadMessageContainer" v-show="unread">
            <span class="unreadMessage">{{ unread }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="conversationExtra"
      :style="{
        opacity: swiped ? 1 : 0,
      }"
    >
      <div
        class="removeConversation ripple conversationExtraButton"
        @click.stop="removeConversation"
      >
        <img
          src="@sicons/fa/TrashAlt.svg"
          alt="删除对话"
          class="extraButtonIcon"
        />
      </div>
      <div
        class="pinConversation ripple conversationExtraButton"
        @click.stop="pinConversation"
      >
        <img src="@sicons/fa/Lock.svg" alt="置顶对话" class="extraButtonIcon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Contact,
  DEFAULT_AVATAR,
  DEFAULT_NICKNAME,
  Message,
} from "../store/interfaces";
import { defineProps, ref, computed } from "vue";
interface Props {
  conversation: [number, Message[]];
}
const props = defineProps<Props>();

import moment from "moment";

import { useStore } from "@/store";
import { useRouter } from "vue-router";
import {
  TOGGLE_PIN_CONVERSATION,
  REMOVE_CONVERSATION,
  READ_MESSAGE,
} from "@/store/mutationTypes";
const router = useRouter();
const goToConversation = (id: number) => {
  store.commit(READ_MESSAGE, id);
  router.push({ name: "聊天", params: { targetId: id } });
};

const store = useStore();
const getContact = function (id: number): Contact | null {
  let result = null;
  store.state.contacts.forEach((element) => {
    if (element.id == id) result = element;
  });
  return result;
};

const swiped = ref(false);

let pointerX = 0;
let pointerY = 0;
const thresholdX = 10;
const thresholdY = 50;
const handleTouchStart = (event: TouchEvent) => {
  pointerX = event.changedTouches[0].clientX;
  pointerY = event.changedTouches[0].clientY;
};
const handleTouchEnd = (event: TouchEvent) => {
  const currentX = event.changedTouches[0].clientX;
  const currentY = event.changedTouches[0].clientY;
  if (
    currentX - pointerX >= thresholdX &&
    Math.abs(currentY - pointerY) < thresholdY
  ) {
    swiped.value = false;
  } else if (
    pointerX - currentX >= thresholdX &&
    Math.abs(currentY - pointerY) < thresholdY
  ) {
    swiped.value = true;
  }
};

const removeConversation = () => {
  store.commit(REMOVE_CONVERSATION, props.conversation[0]);
  swiped.value = false;
};

const pinConversation = () => {
  store.commit(TOGGLE_PIN_CONVERSATION, props.conversation[0]);
  swiped.value = false;
};

const unread = computed(
  () =>
    store.state.conversationOptions.get(
      getContact(props.conversation[0])?.id ?? ""
    )?.unread ?? 0
);
</script>

<style lang="stylus">
@import '../styles/config.styl';

.conversationContainer {
  display: flex;
  width: 140vw;
  align-items: center;
  height: 70px;
  overflow: visible;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.conversationContainer.swiped {
  transform: translateX(-40vw);
}

.conversationMain {
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
}

.conversationMain.pinned {
  background-color: $pinned-conversation-grey;
}

.conversationExtra {
  display: flex;
  height: 100%;
  width: 40vw;
  transition: opacity 1s ease-out;
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

.conversationContentFirstLine {
  display: flex;
  justify-content: space-between;
}

.messageTime {
  color: $disabled-grey;
}

.conversationExtraButton {
  width: 20vw;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.removeConversation {
  background-color: $remove-conversation-red;
}

.pinConversation {
  background-color: $pin-conversation-blue;
}

.extraButtonIcon {
  height: 30px;
  width: 30px;
  filter: invert();
}

.conversationContentSecondLine {
  display: flex;
}

.unreadMessageContainer {
  width: 35px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unreadMessage {
  color: white;
  font-size: 13px;
}
</style>

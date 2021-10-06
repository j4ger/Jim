<template>
  <div class="viewContainer">
    <div class="messageSection">
      <transition-group name="message-list" tag="div">
        <MessageContainer
          v-for="(message, index) in store.state.conversations.get(targetId)"
          :message="message"
          :key="index"
        ></MessageContainer>
      </transition-group>
    </div>
    <div
      class="messageInputBar bars"
      :class="{ shown: !store.state.showNavBar && !store.state.transitioning }"
    >
      <input
        type="text"
        class="messageInput"
        v-model="messageInput"
        @keypress.enter="send()"
      />
      <div class="sendButton ripple" @click="send()">
        <img src="@sicons/fa/LocationArrow.svg" alt="发送" class="sendIcon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
const props = defineProps({
  targetId: Number,
});

const targetId = props.targetId ?? 0;

import { useStore } from "@/store";
import {
  Contact,
  DEFAULT_NICKNAME,
  Message,
  MessageContent,
  MessageType,
  NewMessage,
} from "@/store/interfaces";
import { ADD_MESSAGE, CHANGE_TITLE } from "@/store/mutationTypes";
const store = useStore();

const getContact = function (id: number): Contact | null {
  let result = null;
  store.state.contacts.forEach((element) => {
    if (element.id == id) result = element;
  });
  return result;
};

store.commit(CHANGE_TITLE, getContact(targetId)?.nickname ?? DEFAULT_NICKNAME);

const messageInput = ref("");

const scrollToLastMessage = () => {
  const messageElements = document.getElementsByClassName("messageContainer");
  messageElements[messageElements.length - 1].scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};

const send = () => {
  if (messageInput.value != "") {
    const newMessage = {
      target: targetId,
      message: {
        content: [
          {
            type: MessageType.text,
            content: messageInput.value,
          } as MessageContent,
        ],
        timestamp: Date.now(),
        from: store.state.self.id,
        to: targetId,
      } as Message,
    } as NewMessage;
    store.commit(ADD_MESSAGE, newMessage);
    messageInput.value = "";
    setTimeout(scrollToLastMessage, 50);
  }
};

import MessageContainer from "../components/MessageContainer.vue";
</script>

<style lang="stylus">
@import '../styles/config.styl';

.messageSection {
  padding: 10px 0 0 0;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
}

.messageInputBar {
  position: fixed;
  bottom: 0;
  height: $bar-height;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 15px;
  background-color: white;
  transform: translateY(200%);
  transition: transform 0.1s ease-in-out;
}

.messageInputBar.shown {
  transform: translateY(0);
}

.messageInput {
  height: 35px;
  width: 80%;
  border-radius: 5px;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  background-color: $background-grey;
}

.sendButton {
  border-radius: 50%;
  border-radius: 5px;
  background-color: $blue-in-general;
  width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sendIcon {
  width: 20px;
  height: 20px;
  filter: invert();
}

.message-list-enter-active {
  transition: opacity 0.2s linear, transform 0.1s ease-in-out;
}

.message-list-enter-from {
  opacity: 0;
  transform: translateY(25%);
}
</style>

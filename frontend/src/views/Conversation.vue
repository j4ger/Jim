<template>
  <div class="viewContainer">
    <div class="messageSection">
      <div
        class="messageContainer"
        v-for="(message, index) in store.state.conversations.get(targetId)"
        :key="index"
      >
        <div class="chatMessageTime">
          <span>{{ moment(message.timestamp).fromNow() }}</span>
        </div>
        <div
          class="messageBody"
          v-bind:class="{
            receivedMessage: message.to == store.state.self.id,
            sentMessage: message.to != store.state.self.id,
          }"
        >
          <img
            class="chatAvatarIcon"
            :src="
              message.to == store.state.self.id
                ? getContact(message.from)?.avatar
                : store.state.self.avatar
            "
            alt="头像"
          />
          <div class="messageContentSection">
            <div
              class="messageContent"
              v-for="(messageContent, innerIndex) in message.content"
              :key="innerIndex"
              v-bind:class="{
                receivedMessage: message.to == store.state.self.id,
                sentMessage: message.to != store.state.self.id,
              }"
            >
              <div class="imageContent" v-if="messageContent.type == 1">
                {{ messageContent.content }}
              </div>
              <div class="textContent" v-if="messageContent.type == 0">
                <span
                  class="messageText"
                  v-bind:class="{
                    receivedMessage: message.to == store.state.self.id,
                    sentMessage: message.to != store.state.self.id,
                  }"
                  >{{ messageContent.content }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="messageInputBar bars">
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
import moment from "moment";

import { defineProps, ref } from "vue";
const props = defineProps({
  targetId: String,
});

const targetId = props.targetId ?? "0";

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

const getContact = function (id: string): Contact | null {
  let result = null;
  store.state.contacts.forEach((element) => {
    if (element.id == id) result = element;
  });
  return result;
};

store.commit(CHANGE_TITLE, getContact(targetId)?.nickname ?? DEFAULT_NICKNAME);

const messageInput = ref("");

const send = () => {
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
};
</script>

<style lang="stylus">
@import '../styles/config.styl';

.messageSection {
  padding: 10px 0 55px 0;
}

.messageContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px 0 15px;
  min-height: 80px;
}

.messageBody {
  margin-top: 5px;
}

.chatMessageTime {
  color: $dark-grey;
  font-size: 14px;
}

.messageBody {
  display: flex;
  width: 100%;
}

.messageBody.sentMessage {
  flex-direction: row-reverse;
}

.chatAvatarIcon {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-top: 5px;
}

.messageContentSection {
  display: flex;
  margin: 0 10px 0 10px;
}

.messageContent.sentMessage {
  background-color: $blue-in-general;
}

.messageContent.receivedMessage {
  background-color: $press-down-grey;
}

.messageContent {
  // border: 1px solid $disabled-grey;
  border-radius: 25px;
  padding: 15px;
  margin-bottom: 15px;
}

.messageText.sentMessage {
  color: white;
}

.messageInputBar {
  position: fixed;
  bottom: 0;
  height: 55px;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 15px;
  background-color: white;
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
</style>

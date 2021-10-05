<template>
  <div class="messageContainer">
    <div class="chatMessageTime">
      <span>{{ moment(props.message.timestamp).fromNow() }}</span>
    </div>
    <div
      class="messageBody"
      v-bind:class="{
        receivedMessage: props.message.to == store.state.self.id,
        sentMessage: props.message.to != store.state.self.id,
      }"
    >
      <img
        class="chatAvatarIcon"
        :src="
          props.message.to == store.state.self.id
            ? getContact(props.message.from)?.avatar
            : store.state.self.avatar
        "
        alt="头像"
      />
      <div class="messageContentSection">
        <div
          class="messageContent"
          v-for="(messageContent, innerIndex) in props.message.content"
          :key="innerIndex"
          v-bind:class="{
            receivedMessage: props.message.to == store.state.self.id,
            sentMessage: props.message.to != store.state.self.id,
          }"
        >
          <div class="imageContent" v-if="messageContent.type == 1">
            {{ messageContent.content }}
          </div>
          <div class="textContent" v-if="messageContent.type == 0">
            <span
              class="messageText"
              v-bind:class="{
                receivedMessage: props.message.to == store.state.self.id,
                sentMessage: props.message.to != store.state.self.id,
              }"
              >{{ messageContent.content }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { Contact, Message } from "@/store/interfaces";
import { defineProps } from "vue";
import moment from "moment";

interface Props {
  message: Message;
}

const props = defineProps<Props>();

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
</style>

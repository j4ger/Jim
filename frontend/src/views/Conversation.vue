<template>
  <div></div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  targetId: String,
});

const targetId = props.targetId ?? "0";

import { useStore } from "@/store";
import { Contact, DEFAULT_NICKNAME } from "@/store/interfaces";
import { CHANGE_TITLE } from "@/store/mutationTypes";
const store = useStore();

const getContact = function (id: string): Contact | null {
  let result = null;
  store.state.contacts.forEach((element) => {
    if (element.id == id) result = element;
  });
  return result;
};

store.commit(CHANGE_TITLE, getContact(targetId)?.nickname ?? DEFAULT_NICKNAME);
</script>

<style lang="stylus"></style>

<template>
  <div>Setting up...</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { CHANGE_ID } from "@/store/mutationTypes";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
interface Props {
  id: number;
}
const props = defineProps<Props>();

const store = useStore();
store.dispatch(CHANGE_ID, props.id);

const router = useRouter();
router.push({ path: "/" });
</script>

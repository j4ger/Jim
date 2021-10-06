<template>
  <div>
    <div class="selfContainer">
      <div class="selfContent">
        <span class="selfName">{{ store.state.self.nickname }}</span>
        <span class="selfId">{{ store.state.self.id }}</span>
      </div>
      <img class="selfAvatar" :src="store.state.self.avatar" alt="头像" />
    </div>
    <div class="menuContainer">
      <div class="menuItem ripple">
        <img src="@sicons/fa/Inbox.svg" alt="图标" class="menuIcon" />
        <span class="menuText">邮件</span>
      </div>
      <div class="menuItem ripple">
        <img src="@sicons/fa/StarOfLife.svg" alt="图标" class="menuIcon" />
        <span class="menuText">空间</span>
      </div>
      <div class="menuItem ripple">
        <img src="@sicons/fa/MoneyBillAlt.svg" alt="图标" class="menuIcon" />
        <span class="menuText">钱包</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { CHANGE_TRANSITION, HIDE_NAV_BAR } from "@/store/mutationTypes";
import { onBeforeRouteLeave } from "vue-router";

const store = useStore();

onBeforeRouteLeave((to) => {
  store.commit(CHANGE_TRANSITION, "slide-in-right");
  if (to.name == "聊天") {
    store.commit(HIDE_NAV_BAR);
  }
});
</script>

<style lang="stylus">
@import '../styles/config.styl';

.selfContainer {
  display: flex;
  justify-content: space-between;
  padding: 40px 25px 0 25px;
}

.selfContent {
  display: flex;
  flex-direction: column;
}

.selfName {
  font-size: 45px;
  color: white;
  font-weight: bold;
}

.selfId {
  color: white;
  font-size: 18px;
}

.selfAvatar {
  background-color: white;
  size: 40px;
  border-radius: 50%;
  border: 1px solid $disabled-grey;
}

.menuContainer {
  margin-top: 80px;
}

.menuItem {
  display: flex;
  height: 50px;
  justify-content: left;
  align-items: center;
  border-top: 1px solid $divider-grey;
  margin: 0 25px 0 25px;
  padding: 0 5px 0 5px;
}

.menuItem:first-child {
  border-top: 0;
}

.menuText {
  font-size: 18px;
  font-weight: 700;
}

.menuIcon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  filter: brightness(0) saturate(100%) invert(57%) sepia(69%) saturate(1%) hue-rotate(334deg) brightness(95%) contrast(95%);
}
</style>

<template>
  <div class="topBar bars">
    <div class="topBarContent">
      <div class="topBarButton">
        <img src="@sicons/fa/UserPlus.svg" alt="添加好友" class="topBarIcon" />
      </div>
    </div>
    <div class="topBarContent">
      <span id="title">消息</span>
    </div>
    <div class="topBarContent">
      <img src="@sicons/fa/Plus.svg" alt="添加" class="topBarIcon" />
    </div>
  </div>
  <div class="currentView">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
  <div class="navigationBar bars">
    <router-link tag="div" class="navigationButton" to="/">
      <img src="@sicons/fa/MailBulk.svg" alt="对话" class="navigationIcon" />
    </router-link>
    <router-link tag="div" class="navigationButton" to="/Contacts">
      <img
        src="@sicons/fa/AddressBook.svg"
        alt="联系人"
        class="navigationIcon"
      />
    </router-link>
    <router-link tag="div" class="navigationButton" to="/About">
      <img
        src="@sicons/fa/LaughRegular.svg"
        alt="我的"
        class="navigationIcon"
      />
    </router-link>
  </div>
</template>

<style lang="stylus">
@import 'styles/config.styl';

.bars {
  display: flex;
  margin: 0;
  position: fixed;
  left: 0;
  box-sizing: border-box;
  width: 100%;
}

.topBar {
  justify-content: space-between;
  height: $bar-height;
  background-color: $blue-in-general;
  top: 0;
  padding: 10px 20px;
}

.topBarContent {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}

.topBarIcon {
  width: 25px;
  height: 25px;
  filter: invert(100%) sepia(0%) saturate(7475%) hue-rotate(291deg) brightness(115%) contrast(96%);
}

.topBarIcon:active {
  filter: invert(100%) sepia(1%) saturate(1429%) hue-rotate(54deg) brightness(108%) contrast(76%);
}

#title {
  color: white;
  font-size: 20px;
  font-weight: 20;
  font-family: 'Microsoft YaHei', '微软雅黑', 'MicrosoftJhengHei', '华文细黑', STHeiti, MingLiu;
}

.navigationBar {
  padding: 0 10%;
  height: $bar-height;
  bottom: 0;
  justify-content: space-evenly;
  border-top: 1px solid $disabled-grey;
}

.navigationButton {
  width: 50px;
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.navigationIcon {
  width: 25px;
  height: 25px;
  // generated using : https://codepen.io/sosuke/pen/Pjoqqp
  filter: brightness(0) saturate(100%) invert(57%) sepia(69%) saturate(1%) hue-rotate(334deg) brightness(95%) contrast(95%);
}

.activeNavigation, .navigationButton:active {
  filter: invert(40%) sepia(23%) saturate(6071%) hue-rotate(197deg) brightness(103%) contrast(101%);
}

.currentView {
  width: 100%;
  margin: ($bar-height + 10px) 0 0 0;
}
</style>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

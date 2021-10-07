<template>
  <div class="background" id="backgroundLayer1">
    <div class="background" id="backgroundLayer2">
      <div class="background" id="backgroundLayer3"></div>
    </div>
  </div>
  <div class="mainContent">
    <div class="topBar fixed bars">
      <div class="topBarContent">
        <div class="topBarButton" @click="topBarLeftButtonClicked">
          <img
            src="@sicons/fa/UserPlus.svg"
            alt="添加好友"
            class="topBarIcon"
            v-if="store.state.showNavBar"
          />
          <img
            src="@sicons/fa/AngleLeft.svg"
            alt="返回"
            class="topBarIcon"
            v-else
          />
        </div>
      </div>
      <div class="topBarContent">
        <span id="title">{{
          route.meta.fixedTitle ? route.name : store.state.title
        }}</span>
      </div>
      <div
        class="topBarContent"
        :style="{ visibility: store.state.showNavBar ? 'visible' : 'hidden' }"
      >
        <img src="@sicons/fa/Plus.svg" alt="添加" class="topBarIcon" />
      </div>
    </div>
    <div class="currentView">
      <router-view v-slot="{ Component }">
        <transition
          :name="store.state.transition"
          mode="out-in"
          @before-enter="store.commit(TRANSITION_START)"
          @after-enter="store.commit(TRANSITION_END)"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="navigationBar fixed bars" v-show="store.state.showNavBar">
      <router-link tag="div" class="navigationButton" to="/Conversations">
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
  </div>
</template>

<style lang="stylus">
@import 'styles/config.styl';
@import 'styles/ripple.styl';
@import 'styles/slide-in.styl';

html {
  height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
}

.background {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 0;
}

#backgroundLayer1 {
  background-color: $blue-in-general;
  clip-path: polygon(0 0, 100% 0, 100% 13%, 0 25%);
}

#backgroundLayer2 {
  background-color: $dark-blue;
  clip-path: polygon(73% 0, 100% 25%, 100% 0);
}

#backgroundLayer3 {
  background-color: $deep-dark-blue;
  clip-path: polygon(73% 0, 75% 4%, 90% 0);
}

.mainContent {
  position: absolute;
  width: 100%;
  height: 100%;
}

.bars {
  display: flex;
  margin: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
}

.fixed.bars {
  position: fixed;
}

.topBar {
  position: fixed;
  justify-content: space-between;
  height: $bar-height;
  top: 0;
  padding: 10px 20px;
  z-index: 1;
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
  font-size: 22px;
  // font-weight: 600;
}

span {
  font-family: 'Microsoft Yahei', '微软雅黑', 'MicrosoftJhengHei', '华文细黑', STHeiti, MingLiu;
}

.navigationBar {
  padding: 0 10%;
  height: $bar-height;
  bottom: 0;
  justify-content: space-between;
  border-top: 1px solid $divider-grey;
  align-items: center;
}

.navigationButton {
  width: 50px;
  display: flex;
  justify-content: center;
}

.navigationIcon {
  width: 35px;
  height: 35px;
  // generated using : https://codepen.io/sosuke/pen/Pjoqqp
  filter: brightness(0) saturate(100%) invert(57%) sepia(69%) saturate(1%) hue-rotate(334deg) brightness(95%) contrast(95%);
}

.activeNavigation, .navigationIcon:active {
  filter: invert(40%) sepia(23%) saturate(6071%) hue-rotate(197deg) brightness(103%) contrast(101%);
}

.currentView {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: $bar-height;
  bottom: $bar-height;
}

.viewContainer {
  background-color: $background-grey;
  height: 100%;
}

.searchBar {
  height: 40px;
  background-color: white;
  padding: 5px 10px 5px 10px;
}

.searchBlock {
  background-color: $search-background-grey;
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

.avatarIcon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.searchText {
  font-size: 16px;
  color: $disabled-grey;
}
</style>

<script setup lang="ts">
import moment from "moment";
moment.locale("zh-cn");

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const topBarLeftButtonClicked = () => {
  if (store.state.showNavBar) {
    console.log("Top bar left button is clicked");
  } else {
    store.commit(CHANGE_TRANSITION, "slide-in-right");
    store.commit(SHOW_NAV_BAR);
    store.commit(READ_MESSAGE, Number.parseInt(route.params.targetId[0]));
    router.go(-1);
  }
};

import { RouterLink } from "vue-router";
import { useStore } from "./store";
import {
  Contact,
  Message,
  MessageContent,
  MessageType,
} from "./store/interfaces";
import {
  ADD_CONTACT,
  ADD_MESSAGE,
  CHANGE_TRANSITION,
  INIT,
  READ_MESSAGE,
  SHOW_NAV_BAR,
  TRANSITION_END,
  TRANSITION_START,
} from "./store/mutationTypes";

const store = useStore();

store.dispatch(INIT);

// store.commit(ADD_CONTACT, {
//   id: 2,
//   nickname: "哦吼",
//   avatar:
//     "https://www.gravatar.com/avatar/675f3d29d0164142ad3019a18d861139?d=robohash",
// } as Contact);

// store.commit(ADD_CONTACT, {
//   id: 3,
//   nickname: "欸嘿",
//   avatar:
//     "https://www.gravatar.com/avatar/94f831c0ff5f455fa9987d4593e6bf2d?d=robohash",
// } as Contact);

// store.commit(ADD_MESSAGE, {
//   target: 2,
//   message: {
//     content: [
//       {
//         type: MessageType.text,
//         content: "Hello there lorem ipsum some random jibberish",
//       } as MessageContent,
//     ],
//     timestamp: 1633183129760,
//     from: 2,
//     to: 1,
//   } as Message,
// });

// store.commit(ADD_MESSAGE, {
//   target: 3,
//   message: {
//     content: [
//       {
//         type: MessageType.text,
//         content: "你说得对，但是方向盘的意志很难被郁金香左侧的防空炮修复",
//       } as MessageContent,
//     ],
//     timestamp: 1633186149760,
//     from: 3,
//     to: 1,
//   } as Message,
// });

// store.commit(ADD_MESSAGE, {
//   target: 3,
//   message: {
//     content: [
//       {
//         type: MessageType.text,
//         content: "是的，不过橡皮擦的确是六边形的等离子蓝莓",
//       } as MessageContent,
//     ],
//     timestamp: 1633183149760,
//     from: 1,
//     to: 3,
//   } as Message,
// });

// store.commit(ADD_MESSAGE, {
//   target: 3,
//   message: {
//     content: [
//       {
//         type: MessageType.text,
//         content: "Hello there lorem ipsum some random jibberish",
//       } as MessageContent,
//     ],
//     timestamp: 1633183529760,
//     from: 3,
//     to: 1,
//   } as Message,
// });
</script>

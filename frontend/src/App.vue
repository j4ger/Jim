<template>
  <div class="navigationBar">
    <div class="navigationButton">
      <img src="@sicons/fa/MailBulk.svg" alt="对话" class="navigationIcon" />
    </div>
    <div class="navigationButton">
      <img
        src="@sicons/fa/AddressBook.svg"
        alt="联系人"
        class="navigationIcon"
      />
    </div>
    <div class="navigationButton">
      <img
        src="@sicons/fa/LaughRegular.svg"
        alt="我的"
        class="navigationIcon"
      />
    </div>
  </div>
</template>

<style lang="stylus">
$disabled-grey=#9e9e9e;

.navigationBar {
  margin:0;
  display:flex;
  height:50px;
  width:100%;
  position:fixed;
  bottom:0;
  left:0;
  justify-content:space-evenly;
  border-top:1px solid $disabled-grey;
}
.navigationButton {
  width:50px;
  display:flex;
  justify-content:center;
  padding-top:10px;
}
.navigationIcon {
  width:30px;
  height:30px;
}
</style>

<script setup lang="ts">
console.log("hello world");
</script>

<script setup>
import socketioService from "../api/socketio.service.js";
import store from "../store/index.js";
import { ref } from "vue";
const emits = defineEmits(["close"]);

const emojiList = ref();
const emojiPerRow = 5;
const emojiCount = 49;

const sendEmoji = (smile) => {
  socketioService.sendMessage({
    name: store.state.user.username,
    message: smile,
    color: store.getters["room/getUserColor"](
      store.getters["room/getUserSlot"],
    ),
    type: "smile",
  });
  emits("close");
};
const focusPreviousItem = () => {
  const item = document.activeElement;
  if (item.previousElementSibling) {
    activate(item.previousElementSibling);
  }
};
const focusNextItem = () => {
  const item = document.activeElement;
  if (item.nextElementSibling) {
    activate(item.nextElementSibling);
  }
};
const focusPreviousRow = (index) => {
  if (index - emojiPerRow < 0) {
    activate(emojiList.value.children[0]);
  } else {
    activate(emojiList.value.children[index - emojiPerRow]);
  }
};
const focusNextRow = (index) => {
  if (index + emojiPerRow > emojiCount - 1) {
    activate(emojiList.value.children[emojiCount - 1]);
  } else {
    activate(emojiList.value.children[index + emojiPerRow]);
  }
};
const activate = (item) => {
  emojiList.value.childNodes.forEach((el) => (el.tabIndex = -1));
  item.tabIndex = 0;
  item.focus();
};
</script>

<template>
  <div
    class="grid grid-cols-5 border rounded text-center gap-2 dark:bg-primaryDark overflow-y-auto overflow-x-hidden"
    ref="emojiList"
    @keydown.up.prevent
    @keydown.down.prevent
  >
    <button
      v-for="item in emojiCount"
      :key="item"
      @click="sendEmoji(item)"
      @keyup.left="focusPreviousItem"
      @keyup.right="focusNextItem"
      @keyup.up="focusPreviousRow(item - 1)"
      @keyup.down="focusNextRow(item - 1)"
    >
      <img
        :src="`/smiles/${item}.gif`"
        width="64"
        class="cursor-pointer mx-auto"
        alt="Смайл обезьянка"
      />
    </button>
  </div>
</template>

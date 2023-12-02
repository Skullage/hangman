<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import BaseTextarea from "./UI/Inputs/BaseTextarea.vue";

const message = ref("");
const chatLog = ref("chatLog");

const sendMessage = () => {
  if (isMessageEmpty.value) {
    return;
  }
  socketioService.sendMessage({
    name: store.state.username,
    message: message.value,
    color: store.getters.getUserColor,
  });
  clearInput();
};

const isMessageEmpty = computed(() => message.value.length === 0);

watch(store.state.messages, async () => {
  await nextTick();
  chatLog.value.scrollTop = chatLog.value.scrollHeight + 120;
});

const clearInput = () => {
  message.value = "";
};
</script>

<template>
  <div
    class="border h-full text-left p-2 flex flex-col rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-fourthLight dark:bg-inherit chat"
  >
    <div
      class="flex-1 pb-0 overflow-y-auto max-h-[750px] chatLog"
      ref="chatLog"
    >
      <p v-for="(item, index) in store.state.messages" :key="index">
        <span :style="`color: ${item.color}`">{{ item.name + ": " }}</span
        >{{ item.msg }}
      </p>
    </div>
    <form class="flex gap-2 items-center" @submit.prevent="sendMessage">
      <base-textarea
        v-model="message"
        class="flex-1"
        @enter="sendMessage"
      ></base-textarea>
      <button type="submit">
        <icon icon="fe:paper-plane" width="32"></icon>
      </button>
    </form>
  </div>
</template>
<style lang="scss">
.chat:hover {
  .chatLog::-webkit-scrollbar {
    width: 6px;
  }
}
</style>

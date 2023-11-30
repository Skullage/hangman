<script setup>
import { computed, ref } from "vue";
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
    color: "text-emerald-500",
  });
  clearInput();
  chatLog.value.scrollTo({
    top: chatLog.value.scrollHeight,
  });
};

const isMessageEmpty = computed(() => message.value.length === 0);

const clearInput = () => {
  message.value = "";
};
</script>

<template>
  <div
    class="border h-full text-left p-2 flex flex-col rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-fourthLight dark:bg-inherit"
  >
    <div
      class="flex-1 pb-6 overflow-y-auto max-h-[800px] scroll-smooth"
      ref="chatLog"
    >
      <p
        v-for="(item, index) in store.state.messages"
        :key="index"
        :class="item.color"
      >
        {{ item.name + ": " + item.msg }}
      </p>
    </div>
    <form
      class="flex gap-2 items-center"
      ref="chatInput"
      @submit.prevent="sendMessage"
    >
      <base-textarea
        v-model="message"
        class="flex-1"
        @keydown.enter.prevent.exact="sendMessage"
      ></base-textarea>
      <button type="submit">
        <icon icon="fe:paper-plane" width="32"></icon>
      </button>
    </form>
  </div>
</template>

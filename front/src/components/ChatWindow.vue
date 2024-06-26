<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import ChatInput from "./UI/Inputs/ChatInput.vue";
import EmojiListComponent from "./EmojiList.vue";
import useClickOutside from "../composables/useClickOutside.js";

const message = ref("");
const chatLog = ref("chatLog");
const emojiBtn = ref();
const emojiList = ref();

const showSmiles = ref(false);

const sendMessage = () => {
  if (isMessageEmpty.value) {
    return;
  }
  socketioService.sendMessage({
    name: store.state.user.username,
    message: message.value,
    color: store.getters["room/getUserColor"](
      store.getters["room/getUserSlot"],
    ),
    type: "msg",
  });
  clearInput();
};

const isMessageEmpty = computed(() => message.value.length === 0);

watch(store.state.chat.messages, async () => {
  await nextTick();
  chatLog.value.scrollTop = chatLog.value.scrollHeight + 120;
});

const clearInput = () => {
  message.value = "";
};

useClickOutside(
  emojiBtn,
  () => {
    showSmiles.value = false;
  },
  emojiList,
);
</script>

<template>
  <div
    class="relative h-full lg:max-h-[90vh] text-left p-2 grid grid-rows-[1fr_auto] grid-cols-1 gap-2 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-fourthLight dark:bg-inherit chat dark:bg-secondaryDark lg:border-l"
  >
    <div class="max-h-full overflow-y-auto mt-10" ref="chatLog">
      <p
        v-for="(item, index) in store.state.chat.messages"
        :key="index"
        class="mb-2 p-1 rounded"
        :class="[
          { 'bg-secondaryDark': !item.isRead },
          { '!mb-1': item.type !== 'smile' },
        ]"
        @mouseover="item.isRead = true"
      >
        <span v-if="item.type !== 'smile'">
          <span :style="`color: ${item.color}`">{{
            `[${item.time}] ${item.name}: `
          }}</span
          >{{ item.msg }}
        </span>
        <span v-else>
          <span :style="`color: ${item.color}`" class="mr-1">{{
            `[${item.time}] ${item.name}: `
          }}</span
          ><img :src="`/smiles/${item.msg}.gif`" alt="Смайл" class="inline" />
        </span>
      </p>
    </div>
    <button class="absolute top-2 right-2">
      <icon
        width="32"
        height="32"
        icon="material-symbols:close"
        @click="store.commit('chat/toggleChat')"
      />
    </button>
    <form
      class="flex gap-2 items-center relative"
      @submit.prevent="sendMessage"
    >
      <div class="tooltip absolute w-6 h-6 ml-2 top-1/2 -translate-y-1/2">
        <button
          type="button"
          title="Открыть смайлы"
          @click="showSmiles = !showSmiles"
          ref="emojiBtn"
        >
          <icon icon="bi:emoji-smile" width="24" height="24"></icon>
        </button>
      </div>
      <emoji-list-component
        class="max-w-full w-full absolute bottom-full mb-6 left-0 right-0 max-h-[300px] p-2"
        v-if="showSmiles"
        @close="showSmiles = false"
        ref="emojiList"
      />
      <chat-input
        v-model="message"
        class="flex-1 pl-10"
        max-length="100"
        rows="1"
        @enter="sendMessage"
      />
      <button type="submit" title="Отправить">
        <icon icon="fe:paper-plane" width="32"></icon>
      </button>
    </form>
  </div>
</template>

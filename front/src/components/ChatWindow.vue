<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index";
import socketioService from "../api/socketio.service.js";
import ChatInput from "./UI/Inputs/ChatInput.vue";
import EmojiListComponent from "./EmojiList.vue";
import { vOnClickOutside } from '@vueuse/components'

const message = ref("");
const chatLog = ref<HTMLElement | null>(null);
const emojiBtn = ref<HTMLElement | null>(null);
const emojiList = ref<HTMLElement | null>(null);

const isChatShown = computed(() => store.getters['chat/getIsChatShown']);

const showSmiles = ref(false);

const isMessageEmpty = computed(() => message.value.length === 0);

const sendMessage = () => {
  if (isMessageEmpty.value) return;
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

watch(() => isChatShown, async (newValue) => {
  if(newValue && chatLog.value) {
    await nextTick();
    chatLog.value.scrollTop = chatLog.value.scrollHeight + 120;
  }
});

const clearInput = () => {
  message.value = "";
};

const onClickOutsideHandler = [
  () => {
    showSmiles.value = false
  },
  { ignore: [emojiBtn] },
]
</script>

<template>
  <div
    class="relative text-left p-2 grid grid-rows-[1fr_auto] grid-cols-1 gap-2 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-fourthLight dark:bg-inherit chat dark:bg-secondaryDark lg:border-l h-full"
  >
    <div class="overflow-y-auto mt-10 flex-1" ref="chatLog">
      <p
        v-for="(item, index) in store.state.chat.messages"
        :key="index"
        class="mb-2 p-1 rounded"
        :class="[
          { 'bg-gray-300/25': !item.isRead },
          { '!mb-1': item.type !== 'smile' },
        ]"
        @mouseover="item.isRead = true"
      >
        <span v-if="item.type !== 'smile'">
          <span :style="`color: ${item.color}`">{{
            `[${item.time}] ${item.name}: `
          }}</span
          >{{ item.message }}
        </span>
        <span v-else>
          <span :style="`color: ${item.color}`" class="mr-1">{{
            `[${item.time}] ${item.name}: `
          }}</span
          ><img :src="`/smiles/${item.smileFolder}/${item.message}.gif`" alt="Смайл" class="inline" width="48" height="48" />
        </span>
      </p>
    </div>
    <button class="absolute top-2 right-2 hover:scale-125 duration-300">
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
          class="hover:scale-110 duration-300"
          @click="showSmiles = !showSmiles"
          ref="emojiBtn"
        >
          <icon icon="bi:emoji-smile" width="24" height="24"></icon>
        </button>
      </div>
      <emoji-list-component
        class="w-full absolute bottom-full mb-6 left-0 right-0 max-h-[300px] p-2"
        v-if="showSmiles"
        v-on-click-outside="onClickOutsideHandler"
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
      <button type="submit" title="Отправить" class="hover:scale-110 duration-300">
        <icon icon="fe:paper-plane" width="32"></icon>
      </button>
    </form>
  </div>
</template>
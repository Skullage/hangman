<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index.js";
import socketioService from "../api/socketio.service.js";
import BaseTextarea from "./UI/Inputs/BaseTextarea.vue";
import EmojiList from "./EmojiList.vue";

const message = ref("");
const chatLog = ref("chatLog");

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
</script>

<template>
  <div
    class="border h-full text-left p-2 flex flex-col rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none bg-fourthLight dark:bg-inherit chat"
  >
    <div
      class="flex-1 pb-0 overflow-y-auto max-h-[750px] chatLog"
      ref="chatLog"
    >
      <p
        v-for="(item, index) in store.state.chat.messages"
        :key="index"
        class="mb-2 p-1 rounded"
        :class="{ 'bg-secondaryDark': !item.isRead }"
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
            item.name + ": "
          }}</span
          ><img :src="`/smiles/${item.msg}.gif`" alt="Смайл" class="inline" />
        </span>
      </p>
    </div>
    <form
      class="flex gap-2 items-center relative"
      @submit.prevent="sendMessage"
    >
      <div class="tooltip absolute w-6 h-6 ml-2 top-1/2 -translate-y-1/2">
        <button
          type="button"
          title="Открыть смайлы"
          @click="showSmiles = !showSmiles"
        >
          <icon icon="bi:emoji-smile" width="24" height="24"></icon>
        </button>
        <suspense>
          <emoji-list
            class="w-[230px] absolute bottom-full mb-6 left-0"
            :class="{ hidden: !showSmiles }"
            @close="showSmiles = false"
          />
        </suspense>
      </div>
      <base-textarea
        v-model="message"
        class="flex-1 pl-10"
        :max-length="100"
        @enter="sendMessage"
      ></base-textarea>
      <button type="submit" title="Отправить">
        <icon icon="fe:paper-plane" width="32"></icon>
      </button>
    </form>
  </div>
</template>

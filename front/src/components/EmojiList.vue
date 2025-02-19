<script setup lang="ts">
import socketioService from "../api/socketio.service.js";
import store from "../store/index";
import { onMounted, ref, computed } from "vue";


const emits = defineEmits(["close"]);

const emojiList = ref<HTMLElement | null>(null);
const emojiPerRow = 5;

const currentCategoryIndex = ref(0);

const categoriesList = [
  {title: 'Обезьянки', folder: 'monkey', count: 49, preview: '1.gif'},
  {title: 'Поросята', folder: 'pigs', count: 42, preview: '1.gif'},
  {title: 'Тигрята', folder: 'tigers', count: 50, preview: '1.gif'},
]

const getCurrentCategoryList = computed(() => categoriesList[currentCategoryIndex.value]);

const sendEmoji = (emoji: number) => {
  socketioService.sendMessage({
    name: store.state.user.username,
    message: emoji,
    color: store.getters["room/getUserColor"](
      store.getters["room/getUserSlot"],
    ),
    type: "smile",
    smileFolder: getCurrentCategoryList.value.folder
  });
  emits("close");
};

const handleKeyNavigation = (event: KeyboardEvent, index: number) => {
  if (!emojiList.value) return;

  const items = emojiList.value.children;
  let targetIndex = -1;

  switch (event.key) {
    case 'ArrowLeft':
      targetIndex = index - 1;
      break;
    case 'ArrowRight':
      targetIndex = index + 1;
      break;
    case 'ArrowUp':
      targetIndex = index - emojiPerRow;
      break;
    case 'ArrowDown':
      targetIndex = index + emojiPerRow;
      break;
  }

  if (targetIndex >= 0 && targetIndex < items.length) {
    (items[targetIndex]).focus();
  }
};

onMounted(() => {
  if (emojiList.value?.children[0]) {
    (emojiList.value.children[0] as HTMLElement).focus();
  }
});
</script>

<template>
  <div class="overflow-y-auto border rounded">
    <div class="flex gap-4 mb-4 border-b py-3">
      <button v-for="(item, index) in categoriesList" :key="index" @click="currentCategoryIndex = index" :title="`Смайлы ${item.title}`">
        <img :src="`/smiles/${item.folder}/${item.preview}`" :alt="`Смайлы ${item.title}`" width="32" height="32">
      </button>
    </div>
    <div
      class="grid grid-cols-5 text-center gap-2 dark:bg-primaryDark overflow-x-hidden"
      ref="emojiList"
      @keydown.up.prevent
      @keydown.down.prevent
    >
      <button
        v-for="item in getCurrentCategoryList.count"
        :key="item"
        @click="sendEmoji(item)"
        @keydown="(e) => handleKeyNavigation(e, item - 1)"
      >
        <img
          :src="`/smiles/${getCurrentCategoryList.folder}/${item}.gif`"
          width="64"
          class="cursor-pointer mx-auto"
          :alt="`Смайл ${getCurrentCategoryList.title} ${item}`"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  playerName: {
    type: String,
    required: true,
  },
  isHost: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="border px-2 py-1 bg-thirdDark rounded-xl flex gap-4 items-center">
    <h2 class="flex-1">{{ playerName }}</h2>
    <icon icon="mdi:crown" v-if="isHost" />
  </div>
</template>

<style scoped></style>

<script setup>
import {Icon} from "@iconify/vue";

const props = defineProps({
  disabled: Boolean,
  playerName: {
    type: String,
    required: true
  },
  isHost: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="border px-2 py-1 rounded flex gap-4 items-center" :class="{'text-black': props.disabled}">
    <h2 class="flex-1">{{ !disabled ? playerName : '' }}</h2>
    <icon icon="mdi:crown" v-if="isHost" />
  </div>
</template>

<style scoped>

</style>
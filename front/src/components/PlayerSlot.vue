<script setup>
const props = defineProps({
  disabled: Boolean,
  playerName: {
    type: String,
    required: true
  },
  playerScopes: Number
})
</script>

<template>
  <div class="border px-2 py-1 rounded flex gap-4" :class="{'text-black': props.disabled}">
    <h2 class="flex-1">{{ !disabled ? playerName : '' }}</h2>
    <p>{{playerScopes}}</p>
  </div>
</template>

<style scoped>

</style>
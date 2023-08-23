<script setup>
const props = defineProps({
  char: [String, Number],
  showChar: Boolean,
});
</script>

<template>
  <div
    class="border w-12 h-12 flex place-items-center justify-center dark:bg-white dark:text-fifthDark text-2xl rounded"
  >
    {{ showChar ? props.char.toUpperCase() : "" }}
  </div>
</template>

<style scoped></style>

<script setup>
const props = defineProps({
  'char': [String, Number],
  'showChar': Boolean
})
</script>

<template>
<div class="border w-12 h-12 flex place-items-center justify-center">
  {{ showChar ? props.char : '' }}
</div>
</template>

<style scoped>

</style>
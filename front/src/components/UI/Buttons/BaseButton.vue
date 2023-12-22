<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    class="disabled:!bg-black disabled:border-transparent disabled:hover:!border-transparent disabled:cursor-default dark:bg-fifthDark bg-fourthLight hover:border-secondaryLight rounded-lg border-2 dark:hover:border-thirdDark px-4 py-2 font-bold duration-300"
  >
    <slot></slot>
  </button>
</template>

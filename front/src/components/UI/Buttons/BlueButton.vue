<script setup>
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  disabled: Boolean,
});
</script>

<template>
  <base-button
    :disabled="props.disabled"
    class="dark:bg-thirdDark hover:border-fourthLight bg-secondaryLight dark:hover:bg-fourthDark dark:hover:border-thirdDark"
    ><slot></slot
  ></base-button>
</template>

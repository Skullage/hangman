<script setup>
import BaseButton from "./BaseButton.vue";
</script>

<template>
  <base-button
    class="dark:!bg-thirdDark hover:!border-fourthLight !bg-secondaryLight dark:hover:!bg-fourthDark dark:hover:!border-thirdDark"
    v-bind="$attrs"
    ><slot></slot
  ></base-button>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
</script>

<template>
  <base-button
    class="dark:!bg-thirdDark hover:!border-fourthLight !bg-secondaryLight dark:!text-fifthDark text-thirdLight dark:hover:!bg-fourthDark dark:hover:!border-thirdDark"
    ><slot></slot
  ></base-button>
</template>

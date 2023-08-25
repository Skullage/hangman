<template>
  <base-button
    class="!bg-transparent !border-fourthLight hover:!bg-fourthLight !text-fourthLight hover:!text-thirdLight dark:hover:!bg-fourthDark dark:hover:!text-black dark:!text-fourthDark dark:!border-fourthDark"
    ><slot></slot
  ></base-button>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
</script>

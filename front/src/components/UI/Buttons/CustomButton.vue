<template>
  <button
    type="button"
    class="hover:scale-105 px-4 py-2 font-bold duration-300 rounded-lg border-2"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

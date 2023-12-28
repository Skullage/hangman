<template>
  <button
    type="button"
    class="disabled:bg-black disabled:border-transparent disabled:hover:border-transparent disabled:cursor-default dark:bg-fifthDark bg-fourthLight hover:border-secondaryLight rounded-lg border-2 border-transparent dark:hover:border-thirdDark px-4 py-2 font-bold duration-300"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

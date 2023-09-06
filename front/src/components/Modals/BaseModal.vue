<template>
  <teleport to="body">
    <div
      class="fixed top-0 left-0 z-40 flex h-full w-full justify-center backdrop-blur-lg duration-500 items-center"
      role="dialog"
      :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
        class="flex h-auto max-h-full w-full flex-col rounded-lg bg-thirdLight dark:bg-fifthDark lg:max-h-[80%] lg:w-1/2 relative p-4 border-black"
      >
        <slot> </slot>
      </div>
    </div>
  </teleport>
</template>
<script setup>
const props = defineProps({
  show: Boolean,
});
</script>

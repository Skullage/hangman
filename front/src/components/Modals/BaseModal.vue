<template>
  <teleport to="body">
    <div
      class="fixed top-0 left-0 z-40 flex h-full w-full justify-center backdrop-blur-lg items-center duration-500"
      :class="{ 'opacity-0 pointer-events-none': !props.show }"
    >
      <div
        class="flex h-auto max-h-full w-full flex-col rounded-lg bg-thirdLight dark:bg-fifthDark duration-500 lg:max-h-[80%] lg:w-1/2 relative p-4 border-black focus:outline-none"
        role="dialog"
        aria-modal="true"
        ref="modal"
        tabindex="0"
        :class="{ '-translate-y-full': !props.show }"
        @keydown.esc="emits('close')"
      >
        <slot> </slot>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, watch } from "vue";

const modal = ref();

const props = defineProps({
  show: Boolean,
});
const emits = defineEmits(["close"]);
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      modal.value.focus();
    }
  },
);
</script>

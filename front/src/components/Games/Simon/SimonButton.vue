<script setup>
import { ref } from "vue";

const emits = defineEmits(["click"]);

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  sound: {
    type: String,
    required: true,
  },
  disabled: Boolean,
});

const isShine = ref(false);

const clickBtn = () => {
  let audio = new Audio(`/audio/SimonGame/${props.sound}`);
  audio.play();
  isShine.value = true;
  setTimeout(() => {
    isShine.value = false;
  }, 500);
};

defineExpose({
  clickBtn,
});

const click = () => {
  clickBtn();
  emits("click");
};
</script>

<template>
  <button
    class="outline-none aspect-square border-2 hover:border-black border-transparent cursor-pointer opacity-50 duration-300"
    :disabled="props.disabled"
    @click="click"
    :class="[{ 'opacity-90': isShine }]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["update:modelValue", "enter"]);

const textarea = ref("");

const updateValue = (event) => {
  if (event.target.value.length > props.maxLength) {
    event.target.value = event.target.value.substring(0, props.maxLength);
    return;
  }
  emits("update:modelValue", event.target.value);
  setHeight(event);
};

const onEnter = (event) => {
  emits("enter");
  event.target.value = "";
  setHeight(event);
};

const setHeight = (event) => {
  let el = event.target;
  if (el.scrollHeight < 150) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
};

const props = defineProps({
  label: String,
  modelValue: {
    type: [Number, String],
  },
});
</script>

<template>
  <textarea
    class="w-full rounded-2xl border outline-none bg-transparent resize-none bg-white dark:bg-inherit min-h-[50px] overflow-hidden h-full max-h-[150px]"
    @input="updateValue"
    :value="props.modelValue"
    ref="textarea"
    v-bind="$attrs"
    @keydown.enter.prevent.exact="onEnter"
    :class="{
      'pt-4 pb-1': props.label !== undefined,
      'p-2 pt-3': props.label === undefined,
    }"
  />
</template>

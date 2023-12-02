<script setup>
import { ref } from "vue";

const emits = defineEmits(["update:modelValue", "enter"]);

const textarea = ref("");

const updateValue = (event) => {
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
  required: Boolean,
  placeholder: String,
  modelValue: {
    type: [Number, String],
  },
  rows: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="relative h-full">
    <textarea
      class="w-full rounded border outline-none bg-transparent text-xl resize-none bg-white dark:bg-inherit min-h-full max-h-[150px]"
      @input="updateValue"
      :required="props.required"
      :value="props.modelValue"
      :rows="props.rows"
      ref="textarea"
      @keydown.enter.prevent.exact="onEnter"
      :class="{
        'pt-4 pb-1': props.label !== undefined,
        'p-1 pt-4 px-2': props.label === undefined,
      }"
    />
    <label
      class="pointer-events-none absolute top-1/2 left-4 bg-thirdLight dark:bg-fifthDark -translate-y-1/2 px-4 border"
      v-if="props.label"
    >
      {{ props.label }}
    </label>
  </div>
</template>

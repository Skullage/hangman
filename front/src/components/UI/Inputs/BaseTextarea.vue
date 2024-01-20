<script setup>
const emits = defineEmits(["update:modelValue", "enter"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};

const props = defineProps({
  label: String,
  modelValue: {
    type: [Number, String],
  },
});
</script>

<template>
  <div class="relative">
    <textarea
      class="w-full rounded border outline-none resize-none bg-white dark:text-black text-xl dark:bg-white min-h-[50px] h-full max-h-[400px] px-2 py-4"
      @input="updateValue"
      :value="props.modelValue"
      v-bind="$attrs"
    />
    <label
      class="pointer-events-none absolute top-0 left-4 bg-thirdLight dark:bg-fifthDark -translate-y-1/2 px-4 border"
      v-if="props.label"
    >
      {{ props.label }}
    </label>
  </div>
</template>

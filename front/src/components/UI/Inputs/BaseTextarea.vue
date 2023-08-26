<script setup>
const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
  let el = event.target;
  if (el.scrollHeight < 150) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  } else {
    el.style.height = 150 + "px";
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
      class="w-full rounded border outline-none bg-transparent text-xl h-auto resize-none"
      @input="updateValue"
      :required="props.required"
      :value="props.modelValue"
      :rows="props.rows"
      :class="{
        'pt-4 pb-1': props.label !== undefined,
        'p-2': props.label === undefined,
      }"
    />
    <label
      class="pointer-events-none absolute top-0 left-4 bg-thirdLight dark:bg-fifthDark -translate-y-1/2 px-4 border"
      v-if="props.label"
    >
      {{ props.label }}
    </label>
  </div>
</template>

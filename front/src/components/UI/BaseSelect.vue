<script setup>
const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};

const props = defineProps({
  label: String,
  required: Boolean,
  modelValue: {
    type: [Number, String],
  },
  options: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="relative">
    <select
      class="w-full rounded border px-3 pb-1 pt-4 outline-none bg-transparent text-xl"
      :required="props.required"
      :value="modelValue"
      @change="updateValue"
    >
      <option
        v-for="(item, index) in props.options"
        :key="index"
        :value="item"
        class="text-black"
      >
        {{ item }}
      </option>
    </select>
    <label
      class="pointer-events-none absolute top-0 left-4 dark:bg-fifthDark bg-thirdLight -translate-y-1/2 px-4 border"
    >
      {{ props.label }}
    </label>
  </div>
</template>

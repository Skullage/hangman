<script setup>
import { Icon } from "@iconify/vue";

const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  icon: String,
  label: String,
  required: Boolean,
  iconColor: String,
  min: String,
  max: String,
  minlength: String,
  maxlength: String,
  pattern: String,
  placeholder: String,
  modelValue: {
    type: [Number, String],
  },
});
</script>

<template>
  <div class="relative">
    <Icon
      :icon="props.icon"
      width="24"
      height="24"
      class="pointer-events-none absolute right-0 top-0 mt-2 mr-1"
      v-if="props.icon != null"
    />
    <div>
      <input
        :type="props.type"
        class="w-full rounded border px-3 outline-none bg-white text-xl dark:text-black"
        @input="updateValue"
        :required="props.required"
        :max="props.max"
        :maxlength="props.maxlength"
        :min="props.min"
        :minlength="props.minlength"
        :pattern="props.pattern"
        :value="props.modelValue"
        :autocomplete="props.autocomplete ? 'on' : 'off'"
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
  </div>
</template>

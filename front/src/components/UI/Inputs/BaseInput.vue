<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const emits = defineEmits(["update:modelValue"]);
const input = ref();

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};

const props = defineProps({
  icon: String,
  label: String,
  iconColor: String,
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
      :style="`color: ${props.iconColor}`"
      v-if="props.icon"
    />
    <div>
      <input
        class="w-full rounded border px-3 outline-none bg-white text-xl dark:text-black focus:outline-amber-300"
        @input="updateValue"
        :value="props.modelValue"
        :class="{
          'pt-4 pb-1': props.label !== undefined,
          'p-2': props.label === undefined,
        }"
        v-bind="$attrs"
        ref="input"
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

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref } from "vue";
import useClickOutside from "../../composables/useClickOutside.js";

const emits = defineEmits(["update:modelValue", "change"]);

const props = defineProps({
  label: String,
  modelValue: {
    type: [Number, String],
  },
  options: {
    type: Array,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
});

const isShown = ref(false);
const select = ref();
const optionsList = ref();
const selectedValue = ref();

const changeValue = (index) => {
  emits("update:modelValue", props.values[index]);
  selectedValue.value = props.options[index];
  isShown.value = false;
};

useClickOutside(
  select,
  () => {
    isShown.value = false;
  },
  optionsList,
);

onMounted(() => {
  changeValue(0);
});
</script>

<template>
  <div class="relative">
    <div class="relative">
      <div
        class="w-full rounded border px-3 pb-1 pt-4 outline-none bg-transparent text-xl bg-white appearance-none dark:text-black cursor-pointer"
        :class="{ 'rounded-b-none': isShown }"
        tabindex="0"
        @click="isShown = !isShown"
        @keydown.space="isShown = !isShown"
        ref="select"
      >
        {{ selectedValue }}
      </div>
      <icon
        icon="ic:round-expand-more"
        width="36"
        class="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none text-black duration-300"
        :class="{ 'rotate-180': isShown }"
      ></icon>
      <label
        class="pointer-events-none absolute top-0 left-4 dark:bg-fifthDark bg-thirdLight -translate-y-1/2 px-4 border"
      >
        {{ props.label }}
      </label>
    </div>
    <div
      class="grid grid-rows-[0fr] duration-300"
      :class="{ 'grid-rows-[1fr]': isShown }"
    >
      <ul
        class="bg-white overflow-y-auto max-h-[120px] rounded-b"
        ref="optionsList"
      >
        <li
          v-for="(item, index) in props.options"
          :key="index"
          @click="changeValue(index)"
          @keydown.space="changeValue(index)"
          class="text-black hover:bg-gray-200 px-3 py-2 cursor-pointer focus:outline-amber-400"
          :class="{ hidden: item === modelValue }"
          tabindex="0"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

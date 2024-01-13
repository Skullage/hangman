<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import useClickOutside from "../../composables/useClickOutside.js";

const emits = defineEmits(["update:modelValue", "change"]);

const isShown = ref(false);
const select = ref();
const optionsList = ref();

const changeValue = (value) => {
  emits("update:modelValue", value);
  isShown.value = false;
};

const props = defineProps({
  label: String,
  modelValue: {
    type: [Number, String],
  },
  options: {
    type: Array,
    required: true,
  },
});

useClickOutside(
  select,
  () => {
    isShown.value = false;
  },
  optionsList,
);
</script>

<template>
  <div class="relative">
    <div class="relative">
      <div
        class="w-full rounded border px-3 pb-1 pt-4 outline-none bg-transparent text-xl bg-white appearance-none dark:text-black cursor-pointer"
        :class="{ 'rounded-b-none': isShown }"
        @click="isShown = !isShown"
        ref="select"
      >
        {{ modelValue }}
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
    <Transition name="fade">
      <ul
        class="bg-white overflow-y-auto max-h-[120px] rounded-b"
        ref="optionsList"
        v-if="isShown"
      >
        <li
          v-for="(item, index) in props.options.filter(
            (el) => el !== modelValue,
          )"
          :key="index"
          @click="changeValue(item)"
          class="text-black hover:bg-gray-200 px-3 py-2 cursor-pointer"
        >
          {{ item }}
        </li>
      </ul>
    </Transition>
  </div>
</template>
<style>
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

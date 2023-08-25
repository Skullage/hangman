<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import store from "../store/index.js";

const props = defineProps({
  index: Number,
  type: String,
  msg: String,
  disappearTime: {
    type: Number,
    default: 10000,
  },
});

const getIcon = computed(() => {
  switch (props.type) {
    case "error":
      return "material-symbols:error-outline";
    case "info":
      return "material-symbols:info-outline";
    case "warning":
      return "material-symbols:warning-outline";
    case "success":
      return "clarity:success-standard-line";
  }
});

const getClass = computed(() => {
  switch (props.type) {
    case "error":
      return "bg-red-600";
    case "info":
      return "bg-sky-600";
    case "warning":
      return "bg-yellow-400";
    case "success":
      return "bg-green-600";
  }
});

const closeError = () => {
  store.commit("closeError", props.index);
};
setTimeout(function () {
  closeError();
}, props.disappearTime);
</script>

<template>
  <div
    class="absolute left-1/2 -translate-x-1/2 top-5 rounded-lg w-full md:w-1/2 px-4 py-2 text-left text-primaryDark flex items-center gap-2 z-50"
    :class="getClass"
  >
    <icon :icon="getIcon" width="32" height="32" />
    <p>{{ props.msg }}</p>
    <button class="absolute right-3 top-1" @click="closeError">
      <Icon icon="material-symbols:close" width="24" height="24" />
    </button>
  </div>
</template>

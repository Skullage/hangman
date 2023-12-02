<template>
  <base-modal :show="props.show">
    <h3 class="mb-4 py-8 text-center text-2xl" v-html="props.title"></h3>
    <p class="text-center">Новый раунд начнется через {{ timesLeft }} сек.</p>
  </base-modal>
</template>
<script setup>
import { ref, watch } from "vue";
import socketioService from "../../api/socketio.service.js";
import BaseModal from "./BaseModal.vue";

const timesLeft = ref(5);

const props = defineProps({
  show: Boolean,
  title: String,
});

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      timesLeft.value = 5;
      let timer = setInterval(function () {
        if (timesLeft.value > 1) {
          timesLeft.value--;
        } else {
          clearInterval(timer);
          socketioService.restartGame();
        }
      }, 1000);
    }
  },
);
</script>

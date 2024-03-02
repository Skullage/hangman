<template>
  <div>
    <h3
      class="mb-4 py-8 text-center text-2xl"
      v-html="store.state.newModal.props.title"
    ></h3>
    <p class="text-center">Новый раунд начнется через {{ timesLeft }} сек.</p>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import store from "../../store/index.js";
import socketioService from "../../api/socketio.service.js";

const timesLeft = ref(5);

onMounted(() => {
  timesLeft.value = 5;
  let timer = setInterval(function () {
    if (timesLeft.value > 1) {
      timesLeft.value--;
    } else {
      clearInterval(timer);
      socketioService.restartGame();
      store.commit("newModal/close");
    }
  }, 1000);
});
</script>

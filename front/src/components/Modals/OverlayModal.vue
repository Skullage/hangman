<template>
  <teleport to="body">
    <div
        class="fixed top-0 left-0 z-40 flex h-full w-full items-end justify-center backdrop-blur-lg duration-500 lg:items-center"
        role="dialog"
        :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
          class="flex h-auto max-h-full w-full flex-col rounded bg-white text-black dark:bg-dark dark:text-white lg:max-h-[80%] lg:w-1/4 relative p-4"
      >
          <h3
              class="mb-4 py-8 text-center text-2xl"
          >
            {{props.title}}
          </h3>
          <p class="text-center">Новый раунд начнется через {{timesLeft}} сек.</p>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, watch} from "vue";
import socketioService from "../../api/socketio.service.js";

const timesLeft = ref(10)

const props = defineProps({
  show: Boolean,
  title: String
});

watch(() => props.show, (newValue) => {
  if(newValue) {
    let timer = setInterval(function decreaseTime() {
      if(timesLeft.value > 0) {
        timesLeft.value--
      } else {
        clearInterval(timer)
        timesLeft.value = 10
        socketioService.restartGame()
      }
    }, 1000)
  }
})
</script>

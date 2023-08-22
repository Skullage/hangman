<script setup>
import {computed} from "vue";
import PlayerSlot from "../components/PlayerSlot.vue";
import CharSlot from "../components/CharSlot.vue";
import OverlayModal from "../components/Modals/OverlayModal.vue";
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import store from "../store/index.js"
import socketioService from "../api/socketio.service.js";

const router = useRouter()

const getLivesClass = computed(() => {
  return `step-${store.getters.getLivesLast}`
})

const checkChar = (char) => {
  socketioService.checkChar(char)
}

const leave = () => {
  socketioService.leaveRoom(function() {
    router.push({ path: `/`, replace: true })
  })
}
</script>

<template>
  <div class="bg-gray-500 p-4 lg:p-20 rounded relative">
    <div class="flex justify-between items-start mb-12 flex-wrap gap-4">
      <button class="basis-8 flex-0" @click="leave"><icon icon="system-uicons:exit-left" width="32" /></button>
      <h1 class="flex-1">{{ store.getters.getRoomTitle }}</h1>
    </div>


    <div class="flex md:justify-between flex-wrap justify-center mb-10 md:mb-20 items-start">
      <div class="players grid grid-rows-auto gap-2 mb-10 md:mb-0">
        <player-slot v-for="(client, index) in store.getters.getUsers" :key="index" :player-name="client.name" :isHost="client.isHost" />
      </div>
      <div :class="store.getters.getLivesClass" class="human">
      </div>
    </div>
    
    <div class="word flex flex-wrap justify-center mb-10 md:mb-40 gap-2">
      <char-slot v-for="(slot, index) in store.getters.getWord" :key="index" :char="slot" :show-char="true" />
    </div>
    <div class="word flex justify-center flex-wrap gap-3">
      <button class="p-0 focus:outline-none hover:outline-none" :class="{'bg-gray-200': store.getters.isGamePaused}" v-for="(slot, index) in store.getters.getCharSlots" :key="index"><char-slot :char="slot" :show-char="true" @click="checkChar(slot)" class="cursor-pointer border-0" /></button>
    </div>
  </div>
  <overlay-modal :show="store.getters.isGamePaused" :title="store.getters.getGameStatus" />
</template>

<style scoped>

</style>

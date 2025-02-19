<script setup>
import { computed } from 'vue';
import store from "../../../store/index";
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import CharSlot from "../../CharSlot.vue";
import socketioService from "../../../api/socketio.service.js";

const word = computed(() => store.getters['hangman/getWord']);
const charSlots = computed(() => store.getters['hangman/getCharSlots']);
const livesLast = computed(() => store.getters['hangman/getLivesLast']);

const checkChar = (char) => {
  if (store.getters["room/isUserTurn"]) {
    socketioService.checkChar(char);
  }
};
</script>

<template>
  <div>
    <div
      class="flex md:justify-between flex-wrap justify-center mb-10 items-start gap-2"
    >
      <div>
        <p>Осталось жизней</p>
        <p>{{ livesLast }}</p>
      </div>
      <div
        :class="`step-${livesLast}`"
        class="human"
      ></div>
    </div>
    <div class="word flex flex-wrap justify-center mb-10 gap-2">
      <char-slot
        v-for="(slot, index) in word"
        :key="index"
        :char="slot"
        :show-char="true"
      />
    </div>
    <div class="word flex justify-center flex-wrap gap-3">
      <custom-button
        v-for="(slot, index) in charSlots"
        :key="index"
        class="base-btn text-xl dark:bg-fourthDark dark:text-fifthDark basis-14 flex-initial dark:hover:border-thirdDark border-4 border-transparent"
        :disabled="slot.disabled"
        @click="checkChar(slot.char)"
      >
        {{ slot.char.toUpperCase() }}
      </custom-button>
      <button
        class="p-0 focus:outline-none hover:outline-none"
        :class="{ 'bg-gray-200': store.getters['room/isGamePaused'] }"
      ></button>
    </div>
  </div>
</template>

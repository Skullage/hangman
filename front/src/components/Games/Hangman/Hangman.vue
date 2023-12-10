<script setup>
import store from "../../../store/index.js";
import BaseButton from "../../UI/Buttons/BaseButton.vue";
import CharSlot from "../../CharSlot.vue";
import socketioService from "../../../api/socketio.service.js";

const checkChar = (char) => {
  if (store.getters["room/isUserTurn"]) {
    socketioService.checkChar(char);
  }
};
</script>

<template>
  <div>
    <div
      class="flex md:justify-between flex-wrap justify-center mb-10 items-start"
    >
      <div>
        <p>Осталось жизней</p>
        <p>{{ store.getters["hangman/getLivesLast"] + 1 }}</p>
      </div>
      <div
        :class="`step-${store.getters['hangman/getLivesLast']}`"
        class="human"
      ></div>
    </div>
    <div class="word flex flex-wrap justify-center mb-10 gap-2">
      <char-slot
        v-for="(slot, index) in store.getters['hangman/getWord']"
        :key="index"
        :char="slot"
        :show-char="true"
      />
    </div>
    <div class="word flex justify-center flex-wrap gap-3">
      <base-button
        v-for="(slot, index) in store.getters['hangman/getCharSlots']"
        :key="index"
        class="text-xl dark:bg-fourthDark dark:text-fifthDark basis-14 flex-initial dark:hover:border-thirdDark hover:border-4 !border-4 border-transparent"
        :disabled="slot.disabled"
        @click="checkChar(slot.char)"
      >
        {{ slot.char.toUpperCase() }}
      </base-button>
      <button
        class="p-0 focus:outline-none hover:outline-none"
        :class="{ 'bg-gray-200': store.getters['room/isGamePaused'] }"
      ></button>
    </div>
  </div>
</template>

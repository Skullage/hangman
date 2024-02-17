<script setup>
import { reactive, ref } from "vue";
import SimonButton from "./SimonButton.vue";
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import store from "../../../store/index.js";

const round = ref(0);
const bgcolors = ["blue", "red", "yellow", "green"];
const hiddenArray = reactive([]);
const isPlayerTurn = ref(false);
const turn = ref(0);
const isLooseGame = ref(false);

let btnRefs = ref([]);
const click = (index) => {
  if (hiddenArray[turn.value] !== index) {
    return loseGame();
  }
  turn.value++;
  if (turn.value === hiddenArray.length) {
    isPlayerTurn.value = false;
    setTimeout(() => {
      nextRound();
    }, store.getters["room/getRoom"].options.difficult);
  }
};
const startGame = () => {
  isLooseGame.value = false;
  resetGame();
  addElementToHiddenArray();
  showCombination();
  isPlayerTurn.value = true;
};
const showCombination = () => {
  for (let i = 0; i < hiddenArray.length; i++) {
    setTimeout(() => {
      btnRefs.value[hiddenArray[i] - 1].clickBtn();
    }, i * store.getters["room/getRoom"].options.difficult);
  }
};
const loseGame = () => {
  resetGame();
  isLooseGame.value = true;
};
const resetGame = () => {
  round.value = 0;
  isPlayerTurn.value = false;
  turn.value = 0;
  hiddenArray.length = 0;
};
const addElementToHiddenArray = () => {
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  hiddenArray.push(Math.round(getRandomNumber(1, 4)));
};
const nextRound = () => {
  round.value++;
  turn.value = 0;
  addElementToHiddenArray();
  showCombination();
  isPlayerTurn.value = true;
};

const getBorderRadius = (index) => {
  switch (index) {
    case 1:
      return "100% 0 0 0";
    case 2:
      return "0 100% 0 0";
    case 3:
      return "0 0 0 100%";
    case 4:
      return "0 0 100% 0";
  }
};
</script>

<template>
  <div>
    <div
      class="flex md:justify-between flex-wrap justify-center mb-10 items-start"
    >
      <div>
        <p>Раунд</p>
        <p>{{ round }}</p>
      </div>
      <div class="btns-wrapper grid grid-cols-2 grid-rows-2 w-1/2">
        <SimonButton
          @click="click(index)"
          v-for="index in 4"
          :key="index"
          :index="index"
          :style="`background-color: ${
            bgcolors[index - 1]
          }; border-radius: ${getBorderRadius(index)}`"
          ref="btnRefs"
          :sound="`${index}.mp3`"
          :timeout-time="store.getters['room/getRoom'].options.difficult"
          :disabled="!isPlayerTurn"
        />
      </div>
    </div>
    <div>
      <custom-button class="outlined-blue-btn" @click="startGame"
        >Start</custom-button
      >
    </div>
  </div>
</template>

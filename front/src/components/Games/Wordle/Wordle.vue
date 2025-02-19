<script setup lang="ts">
import store from "../../../store/index";
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import CharSlot from "../../CharSlot.vue";
import socketioService from "../../../api/socketio.service.js";
import { ref, watch, computed } from "vue";

const resultWord = computed(() => store.getters['wordle/getWord']);
const charSlots = computed(() => store.getters['wordle/getCharSlots']);
const livesLast = computed(() => store.getters['wordle/getLivesLast']);

store.state.wordle.tryCount = livesLast.value;

const wordLength = resultWord.value.length;
const word = ref<string>('');
const currentRowIndex = ref(0);
const currentColumnIndex = ref(0);
const words = ref<string[]>([]);
const results = ref<{green: string[]; yellow: string[]; gray: string[]; greenIndexes: number[]}[]>([]);

const replaceCharAt = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + replacement.length);
};

const initWord = () => {
  word.value = ' '.repeat(wordLength);
  words.value = Array.from({ length: store.state.wordle.tryCount }, () => ' '.repeat(wordLength));
  store.state.wordle.greenBtns.length = 0;
  store.state.wordle.yellowBtns.length = 0;
  store.state.wordle.inactiveBtns.length = 0;
  results.value = Array.from({ length: store.state.wordle.tryCount }, () => ({
    green: [],
    yellow: [],
    gray: [],
    greenIndexes: [],
  }));
  currentColumnIndex.value = 0;
  currentRowIndex.value = 0;
}

const addChar = (char: string) => {
  if(currentColumnIndex.value < resultWord.value.length) {
    word.value = replaceCharAt(word.value, currentColumnIndex.value, char);
    currentColumnIndex.value++;
  }
}

const removeChar = () => {
  if(currentColumnIndex.value > 0) {
    currentColumnIndex.value--;
    word.value = replaceCharAt(word.value, currentColumnIndex.value, ' ');
  }
}

const countLetterOccurrences = (word: string): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const char of word) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
};

const checkWord = () => {
  const targetWord = resultWord.value;
  const wordValue = word.value.trim();

  if(wordValue.length !== targetWord.length) return;

  socketioService.checkWord(wordValue);

  const green: string[] = [];
  const yellow: string[] = [];
  const gray: string[] = [];

  const greenIndexes: number[] = [];

  const targetLetterCounts = countLetterOccurrences(targetWord);
  const usedLetters: Record<string, number> = {};

  for (let i = 0; i < wordValue.length; i++) {
    const char = wordValue[i];
    if (targetWord[i] === char) {
      greenIndexes.push(i);
      green.push(char);
      usedLetters[char] = (usedLetters[char] || 0) + 1;
    }
  }

  for (let i = 0; i < wordValue.length; i++) {
    const char = wordValue[i];
    if (targetWord[i] !== char && targetWord.includes(char)) {
      // Проверяем, не превышает ли количество использований этой буквы количество в целевом слове
      if ((usedLetters[char] || 0) < targetLetterCounts[char]) {
        yellow.push(char);
        usedLetters[char] = (usedLetters[char] || 0) + 1;
      } else {
        gray.push(char);
      }
    } else if (!targetWord.includes(char)) {
      gray.push(char);
    }
  }

  results.value[currentRowIndex.value] = { green, yellow, gray, greenIndexes };

  store.state.wordle.greenBtns.push(...green);
  store.state.wordle.yellowBtns.push(...yellow);
  store.state.wordle.inactiveBtns.push(...gray);

  if(greenIndexes.length === resultWord.value.length) {
    return initWord();
  }

  if(currentRowIndex.value < store.state.wordle.tryCount - 1) {
    currentRowIndex.value++;
    word.value = ' '.repeat(resultWord.value.length);
    currentColumnIndex.value = 0;
  } else {
    initWord();
  }
}

watch(() => word.value, () => {
  words.value[currentRowIndex.value] = word.value;
})

initWord();
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
    </div>
    <div class="word flex flex-wrap justify-center mb-4 gap-2" v-for="(row, rowIndex) in words" :key="rowIndex">
      <char-slot
        v-for="(slot, slotIndex) in row"
        :key="slotIndex"
        :char="slot"
        :show-char="true"
        :class="[
          {'!bg-green-500': results[rowIndex]?.greenIndexes.includes(slotIndex)}, 
          {'!bg-yellow-500': results[rowIndex]?.yellow.includes(slot.toLowerCase())}, 
          {'!bg-gray-500': results[rowIndex]?.gray.includes(slot.toLowerCase())}]"
      />
    </div>
    <div class="word flex justify-center flex-wrap gap-3">
      <custom-button
        class="base-btn text-xl dark:bg-fourthDark dark:text-fifthDark basis-14 flex-initial dark:hover:border-thirdDark border-4 border-transparent"
        @click="removeChar"
      >&lt;</custom-button>
      <custom-button
        v-for="(slot, index) in charSlots"
        :key="index"
        class="base-btn text-xl dark:bg-fourthDark dark:text-fifthDark basis-14 flex-initial dark:hover:border-thirdDark border-4 border-transparent"
        @click="addChar(slot.char)"
        :class="[
          {'!bg-yellow-500': store.state.wordle.yellowBtns.includes(slot.char.toLowerCase()) && !store.state.wordle.greenBtns.includes(slot.char.toLowerCase())}, 
          {'!bg-green-500': store.state.wordle.greenBtns.includes(slot.char.toLowerCase())}, 
          {'!bg-gray-500': store.state.wordle.inactiveBtns.includes(slot.char.toLowerCase())}]"
      >
        {{ slot.char.toUpperCase() }}
      </custom-button>
      <custom-button
        class="base-btn text-xl dark:bg-fourthDark dark:text-fifthDark basis-14 flex-initial dark:hover:border-thirdDark border-4 border-transparent"
        @click="checkWord"
      >></custom-button>
    </div>
  </div>
</template>
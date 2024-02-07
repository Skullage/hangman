<script setup>
import { availableGames } from "../../../config/config.js";
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import BaseSelect from "../../UI/BaseSelect.vue";
import { ref, watch } from "vue";
import store from "../../../store/index.js";
import BaseInput from "../../UI/Inputs/BaseInput.vue";
import { Icon } from "@iconify/vue";

const roomTitle = ref(null);
const roomPassword = ref(null);
const playerAmount = ref(1);
const selectedGame = ref("");
const firstInput = ref();

selectedGame.value = availableGames[0].title;

const emits = defineEmits(["next"]);

const createRoom = async () => {
  if (roomTitle.value.length === 0) {
    store.commit("notification/addNotification", {
      type: "error",
      msg: "Введите название комнаты",
    });
    return;
  }
  const room = {
    title: roomTitle.value,
    password: roomPassword.value,
    maxPlayers: playerAmount.value,
    game: selectedGame.value,
  };
  emits("next", room);
};

const changePlayerAmount = (value) => {
  playerAmount.value = value;
};

const changeGame = () => {
  if (isAvailableCountPlayer(playerAmount.value)) {
    changePlayerAmount(
      availableGames.find((el) => el.title === selectedGame.value).maxPlayers,
    );
  }
};

const isAvailableCountPlayer = (index) => {
  return (
    index >
    availableGames.find((el) => el.title === selectedGame.value).maxPlayers
  );
};

watch(
  () => store.state.modals.isCreateModalShown,
  (newValue) => {
    if (newValue) {
      firstInput.value.$refs.input.focus();
    }
  },
);
</script>

<template>
  <form class="p-4">
    <base-input
      v-model="roomTitle"
      placeholder="Название комнаты"
      label="Название комнаты"
      class="mb-3"
      required
      ref="firstInput"
    ></base-input>
    <base-input
      v-model="roomPassword"
      placeholder="Пароль"
      label="Пароль"
      type="password"
      class="mb-3"
    ></base-input>
    <base-select
      :options="availableGames.map((el) => el.title)"
      v-model="selectedGame"
      @update:modelValue="changeGame"
      label="Игра"
      class="mb-4"
    />
    <div class="mb-4">
      <h2 class="text-center mb-2 text-xl">Количество игроков</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <custom-button
          v-for="item in 4"
          :key="item"
          :class="{
            'dark:border-fourthDark dark:focus:border-fourthDark dark:hover:border-fourthDark border-fifthLight focus:border-fifthLight hover:border-fifthLight':
              playerAmount === item,
          }"
          :disabled="isAvailableCountPlayer(item)"
          class="base-btn grid grid-cols-2 text-center first:grid-cols-1 hover:border-secondaryLight dark:hover:border-thirdDark border-white"
          @click.prevent="changePlayerAmount(item)"
        >
          <Icon
            icon="icon-park-solid:people"
            width="100%"
            height="100%"
            class="text-black dark:text-white m-auto"
            v-for="index in item"
            :key="index"
          />
        </custom-button>
      </div>
    </div>
    <div>
      <custom-button @click="createRoom" class="w-full outlined-blue-btn">
        Создать
      </custom-button>
    </div>
  </form>
</template>

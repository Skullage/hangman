<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">Создание комнаты</h3>
    <button class="absolute right-3 top-3" @click="closeModalWindow">
      <Icon icon="material-symbols:close" width="24" height="24" />
    </button>
    <div class="modal-content flex-1 overflow-y-auto px-4">
      <form class="p-4">
        <base-input
          v-model="roomTitle"
          placeholder="Название комнаты"
          label="Название комнаты"
          class="mb-6"
          required
        ></base-input>
        <base-input
          v-model="roomPassword"
          placeholder="Пароль"
          label="Пароль"
          type="password"
          class="mb-6"
        ></base-input>
        <base-select
          v-model="roomLanguage"
          :options="languages"
          label="Язык комнаты"
          required
          class="mb-4"
        />
        <div class="mb-4">
          <h2 class="text-center mb-2 text-xl">Количество игроков</h2>
          <div class="grid grid-cols-4 gap-2">
            <base-button
              v-for="item in 4"
              :key="item"
              :class="{
                'dark:border-fourthDark dark:focus:border-fourthDark dark:hover:!border-fourthDark border-fifthLight focus:border-fifthLight hover:border-fifthLight':
                  playerAmount === item,
              }"
              class="grid grid-cols-2 text-center first:grid-cols-1 dark:hover:border-thirdDark"
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
            </base-button>
          </div>
        </div>
      </form>
    </div>

    <div>
      <outlined-blue-button @click="createRoom" class="w-full">
        Создать
      </outlined-blue-button>
    </div>
  </base-modal>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import socketioService from "../../api/socketio.service.js";
import { useRouter } from "vue-router";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";
import BaseInput from "../UI/Inputs/BaseInput.vue";
import BaseButton from "../UI/Buttons/BaseButton.vue";
import OutlinedBlueButton from "../UI/Buttons/OutlinedBlueButton.vue";
import BaseSelect from "../UI/BaseSelect.vue";

const router = useRouter();

const emits = defineEmits(["close"]);

const roomTitle = ref("");
const roomPassword = ref("");
const roomLanguage = ref("Английский");
const playerAmount = ref(1);
const languages = reactive(["Английский", "Русский"]);

const createRoom = async () => {
  if (roomTitle.value.length === 0) {
    store.commit("addError", {
      type: "error",
      msg: "Введите название комнаты",
    });
    return;
  }
  const room = {
    title: roomTitle.value,
    password: roomPassword.value,
    maxPlayers: playerAmount.value,
    language: roomLanguage.value,
  };
  socketioService.hostRoom(room, function (roomId) {
    store.commit("setRoomId", roomId);
    router.push({ path: `/room/${roomId}`, replace: true });
  });
};
const closeModalWindow = () => {
  emits("close");
};

const changePlayerAmount = (value) => {
  playerAmount.value = value;
};
</script>

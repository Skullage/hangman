<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import socketioService from "../../api/socketio.service.js";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";
import BlueButton from "../UI/Buttons/BlueButton.vue";

const router = useRouter();

const emits = defineEmits(["close"]);
const closeModalWindow = () => {
  emits("close");
};

const setPassword = async (roomId) => {
  const ok = await store.dispatch("showModal");
  if (ok) {
    connect(roomId, store.state.passwordModal.password);
  }
};

const connect = (roomId, password = "") => {
  socketioService.joinRoom(roomId, password, function (roomId) {
    router.push({ path: `/room/${roomId}`, replace: true });
  });
};

socketioService.showRooms(function (rooms) {
  store.commit("getRooms", rooms);
});
</script>
<template>
  <base-modal>
    <h3 class="border-b py-8 text-center text-2xl">
      <slot name="title">Комнаты</slot>
    </h3>
    <button class="absolute right-3 top-3" @click="closeModalWindow">
      <Icon
        icon="material-symbols:close"
        width="24"
        height="24"
        class="text-black dark:text-white"
      />
    </button>
    <div class="modal-content flex-0 overflow-y-auto text-center">
      <div class="border-b py-2 flex justify-between items-center mb-4">
        <div class="basis-1/5">Название</div>
        <div class="basis-1/5">Пароль?</div>
        <div class="basis-1/5">Количество людей</div>
        <div class="basis-1/5">Язык игры</div>
        <div class="basis-1/5"></div>
      </div>
      <div v-if="store.getters.isRoomsEmpty">
        <p>К сожалению, в данный момент комнат нет :(</p>
        <p>Но, Вы можете создать свою :)</p>
      </div>
      <div
        v-for="(item, index) in store.state.rooms"
        :key="index"
        class="border-b last:border-none flex justify-between py-2 items-center"
      >
        <div class="basis-1/5">{{ item.title }}</div>
        <div class="basis-1/5">
          <icon icon="material-symbols:lock-outline" class="m-auto"></icon>
        </div>
        <div class="basis-1/5">
          {{ item.clients.length }}/{{ item.maxPlayers }}
        </div>
        <div class="basis-1/5">{{ item.language }}</div>
        <div class="basis-1/5">
          <blue-button
            @click="
              item.password === '' ? connect(item.id) : setPassword(item.id)
            "
            >Войти</blue-button
          >
        </div>
      </div>
    </div>
  </base-modal>
</template>

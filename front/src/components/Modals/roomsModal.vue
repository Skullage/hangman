<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import socketioService from "../../api/socketio.service.js";
import store from "../../store/index.js";
import BaseModal from "./BaseModal.vue";
import CustomButton from "../UI/Buttons/CustomButton.vue";
import CloseButton from "../UI/Buttons/CloseButton.vue";

const router = useRouter();

const emits = defineEmits(["close"]);
const closeModalWindow = () => {
  emits("close");
};

const setPassword = async (roomId) => {
  const ok = await store.dispatch("modals/showModal");
  if (ok) {
    connect(roomId, store.state.modals.passwordModal.password);
  }
};

const connect = (roomId, password = "") => {
  socketioService.joinRoom(roomId, password, function (roomId) {
    router.push({ path: `/room/${roomId}`, replace: true });
  });
};

socketioService.showRooms(function (rooms) {
  store.commit("room/setRooms", rooms);
});
</script>
<template>
  <base-modal>
    <h3 class="border-b py-8 text-center text-2xl">
      <slot name="title">Комнаты</slot>
    </h3>
    <close-button @click="closeModalWindow" />
    <div class="modal-content flex-0 overflow-y-auto text-center">
      <div class="border-b py-2 flex justify-between items-center mb-4">
        <div class="basis-1/5">Название</div>
        <div class="basis-1/5">Пароль?</div>
        <div class="basis-1/5">Количество людей</div>
        <div class="basis-1/5">Язык игры</div>
        <div class="basis-1/5"></div>
      </div>
      <div v-if="store.getters['room/isRoomsEmpty']">
        <p>К сожалению, в данный момент комнат нет :(</p>
        <p>Но Вы можете создать свою :)</p>
      </div>
      <div
        v-for="(item, index) in store.state.room.rooms"
        :key="index"
        class="border-b last:border-none flex justify-between py-2 items-center"
      >
        <div class="basis-1/5">{{ item.title }}</div>
        <div class="basis-1/5">
          <icon
            icon="material-symbols:lock-outline"
            v-if="item.password.length > 0"
            class="m-auto"
          ></icon>
        </div>
        <div class="basis-1/5">
          {{ item.clients.length }}/{{ item.maxPlayers }}
        </div>
        <div class="basis-1/5">{{ item.language }}</div>
        <div class="basis-1/5">
          <custom-button
            class="blue-btn"
            :disabled="item.clients.length === item.maxPlayers"
            @click="
              item.password === '' ? connect(item.id) : setPassword(item.id)
            "
            >Войти</custom-button
          >
        </div>
      </div>
    </div>
  </base-modal>
</template>

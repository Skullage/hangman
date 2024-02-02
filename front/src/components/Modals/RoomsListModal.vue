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
    <div class="overflow-auto min-h-[50vh]">
      <table class="modal-content flex-0 text-center">
        <thead class="border-b">
          <tr>
            <td class="pr-2 py-2">Название</td>
            <td class="pr-2 py-2">Пароль?</td>
            <td class="pr-2 py-2">Количество людей</td>
            <td class="pr-2 py-2">Язык игры</td>
            <td class="py-2"></td>
          </tr>
        </thead>
        <tbody v-if="store.getters['room/isRoomsEmpty']">
          <tr>
            <td colspan="4">К сожалению, в данный момент комнат нет :(</td>
          </tr>
          <tr>
            <td colspan="4">Но Вы можете создать свою :)</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(item, index) in store.state.room.rooms"
            :key="index"
            class="border-b last:border-none leading-none"
          >
            <td class="pr-2 py-2">{{ item.title }}</td>
            <td class="pr-2 py-2">
              <icon
                icon="material-symbols:lock-outline"
                v-if="item.password.length > 0"
                class="m-auto"
              ></icon>
            </td>
            <td class="pr-2 py-2">
              {{ item.clients.length }}/{{ item.maxPlayers }}
            </td>
            <td class="pr-2 py-2">{{ item.language }}</td>
            <td class="py-2">
              <custom-button
                class="blue-btn"
                :disabled="item.clients.length === item.maxPlayers"
                @click="
                  item.password === '' ? connect(item.id) : setPassword(item.id)
                "
                >Войти</custom-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </base-modal>
</template>

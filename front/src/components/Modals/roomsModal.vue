<script setup>
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router'
import socketioService from "../../api/socketio.service.js";
import store from "../../store/index.js";

const router = useRouter()
const props = defineProps({
  show: Boolean
});
const emits = defineEmits(['close']);
const closeModalWindow = () => {
  emits('close');
};

const connect = roomId => {
  socketioService.joinRoom(roomId, function(roomId) {
    router.push({ path: `/room/${roomId}`, replace: true })
  })
}

socketioService.showRooms(function(rooms) {
  store.commit('getRooms', rooms)
})
</script>
<template>
  <teleport to="body">
    <div
        class="fixed top-0 left-0 z-40 flex h-full w-full items-end justify-center backdrop-blur-lg duration-500 lg:items-center"
        role="dialog"
        :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
          class="flex h-auto max-h-full w-full flex-col rounded border bg-white text-black dark:bg-dark dark:text-white lg:max-h-[80%] lg:min-h-[50%] lg:w-1/2 relative"
      >
        <h3
            class="border-b py-8 text-center text-2xl"
        >
          <slot name="title">Комнаты</slot>
        </h3>
        <button
            class="absolute right-0 top-0 mr-3 mt-3"
            @click="closeModalWindow"
        >
          <Icon
              icon="material-symbols:close"
              width="24"
              height="24"
              class="text-black dark:text-white"
          />
        </button>
        <table class="modal-content flex-1 overflow-y-auto text-center">
          <slot name="body">
            <thead class="border-b py-2 px-4">
              <tr>
                <td>Название</td>
                <td>Пароль?</td>
                <td>Количество людей</td>
                <td>Язык игры</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in store.state.rooms" :key="index" class="border-b last:border-none py-2 px-4 max-h-60">
                <td>{{ item.title }}</td>
                <td><icon icon="material-symbols:lock-outline" class="m-auto"></icon></td>
                <td>{{item.clients.length}}/{{ item.maxPlayers}}</td>
                <td>{{ item.language }}</td>
                <td>
                  <button class="bg-white text-black" @click="connect(item.id)">Войти</button>
                </td>
              </tr>
            </tbody>

          </slot>
        </table>
      </div>
    </div>
  </teleport>
</template>

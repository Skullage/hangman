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
        class="fixed top-0 left-0 z-40 flex h-full w-full justify-center backdrop-blur-lg duration-500 items-center"
        role="dialog"
        :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
          class="flex h-auto max-h-full w-full flex-col rounded border bg-white text-black dark:bg-dark dark:text-white lg:max-h-[80%] min-h-[50%] lg:w-1/2 relative"
      >
        <h3
            class="border-b py-8 text-center text-2xl"
        >
          <slot name="title">Комнаты</slot>
        </h3>
        <button
            class="absolute right-3 top-3"
            @click="closeModalWindow"
        >
          <Icon
              icon="material-symbols:close"
              width="24"
              height="24"
              class="text-black dark:text-white"
          />
        </button>
        <div class="modal-content flex-0 overflow-y-auto text-center">
            <div class="border-b py-2 flex justify-between items-center">
                <div class="basis-1/5">Название</div>
                <div class="basis-1/5">Пароль?</div>
                <div class="basis-1/5">Количество людей</div>
                <div class="basis-1/5">Язык игры</div>
                <div class="basis-1/5"></div>
            </div>
            <div v-for="(item, index) in store.state.rooms" :key="index" class="border-b last:border-none flex justify-between py-2 items-center">
              <div class="basis-1/5">{{ item.title }}</div>
              <div class="basis-1/5"><icon icon="material-symbols:lock-outline" class="m-auto"></icon></div>
              <div class="basis-1/5">{{item.clients.length}}/{{ item.maxPlayers}}</div>
              <div class="basis-1/5">{{ item.language }}</div>
              <div class="basis-1/5">
                <button class="bg-white text-black" @click="connect(item.id)">Войти</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

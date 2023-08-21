<template>
  <teleport to="body">
    <div
        class="fixed top-0 left-0 z-40 flex h-full w-full items-end justify-center backdrop-blur-lg duration-500 lg:items-center"
        role="dialog"
        :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
          class="flex h-auto max-h-full w-full flex-col rounded border bg-white text-black dark:bg-dark dark:text-white lg:max-h-[80%] lg:w-1/4 relative"
      >
        <h3
            class="mb-4 border-b py-8 text-center text-2xl"
        >
          <slot name="title">Создание комнаты</slot>
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
        <div class="modal-content flex-1 overflow-y-auto px-4">
          <slot name="body">
            <form>
              <input type="text"  placeholder="Название комнаты" class="w-full px-2 py-1 mb-4 text-gray-400" v-model="roomTitle">
              <input type="password" placeholder="Пароль" class="w-full px-2 py-1 mb-4 text-gray-400" v-model="roomPassword">
              <label for="language">
                Выберите язык комнаты
                <select id="language" class="w-full px-2 py-1 mb-4 text-gray-400" required v-model="roomLanguage">
                  <option v-for="(language, index) in languages" :key="index" :value="language.title">{{ language.title }}</option>
                </select>
              </label>
              <div class="mb-4">
                <h2 class="text-center mb-2">Количество игроков</h2>
                <div class="grid grid-cols-4 gap-2">
                  <button :class="{'border-green-400 focus:border-green-400 hover:border-green-400': playerAmount === item}" class="playersBtn first:grid-cols-1 rounded-none grid grid-cols-2 text-center" v-for="item in 4" :key="item" @click.prevent="changePlayerAmount(item)">
                    <Icon
                        icon="icon-park-solid:people"
                        width="100%"
                        height="100%"
                        class="text-black dark:text-white m-auto"
                        v-for="index in item" :key="index"
                    />
                  </button>
              </div>

              </div>
            </form>
          </slot>
        </div>

        <div
            class="modal-footer relative bottom-0 left-0 flex flex-wrap justify-center gap-2 py-2 lg:gap-10"
        >
          <slot name="footer">
            <button @click="createRoom">Создать</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import languages from '../../config/languages.json'
import {ref} from "vue";
import socketioService from "../../api/socketio.service.js";
import { useRouter } from 'vue-router'
import store from "../../store/index.js";

const router = useRouter()

const props = defineProps({
  show: Boolean
});
const emits = defineEmits(['close']);

const roomTitle = ref('')
const roomPassword = ref('')
const roomLanguage = ref('Английский')
const playerAmount = ref(1)

const createRoom = async () => {
  const room = {title: roomTitle.value, password: roomPassword.value, maxPlayers: playerAmount.value, language: roomLanguage.value}
  socketioService.hostRoom(room, function(roomId) {
    store.commit('setRoomId', roomId)
    router.push({ path: `/room/${roomId}`, replace: true })
  })
}
const closeModalWindow = () => {
  emits('close');
};

const changePlayerAmount = (value) => {
  playerAmount.value = value
}
</script>

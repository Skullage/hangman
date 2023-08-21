<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import CreateRoomModal from "../components/Modals/createRoomModal.vue";
import JoinRoomModal from "../components/Modals/joinRoomModal.vue";
import RoomsModal from "../components/Modals/roomsModal.vue";

const showCreateModal = ref(false)
const showJoinModal = ref(false)
const showRoomsModal = ref(false)

const store = useStore()

const createRoom = () => {
  showCreateModal.value = true
}
const showRooms = () => {
  showRoomsModal.value = true
}
const showAuth = () => {
  showAuthModal.value = true
}
const joinRoom = () => {
  showJoinModal.value = true
}
</script>

<template>
  <div>
    <div class="bg-gray-500 px-20 py-10 rounded">
      <h1 class="mb-12">Hangman</h1>
      <div class="flex flex-col gap-2 mb-20">
        <button type="button" class="bg-[#242424]" @click="createRoom">Создать комнату</button>
        <button type="button" class="bg-[#242424]" @click="showRooms">Показать все комнаты</button>
        <button type="button" class="bg-[#242424]" @click="joinRoom">Присоединиться к комнате</button>
      </div>
      <div>
        <p class="mb-1">
          Ваш ник
        </p>
        <p class="text-xl text-black">
          {{ store.state.username }}
        </p>
        <button class="text-slate-900 cursor-pointer bg-transparent hover:outline-none hover:border-none border-none focus:border-none focus:outline-none" @click="store.commit('logout')">Сменить ник</button>
      </div>
    </div>
    <create-room-modal :show="showCreateModal" @close="showCreateModal = false" />
    <join-room-modal :show="showJoinModal" @close="showJoinModal = false" />
    <suspense>
      <rooms-modal :show="showRoomsModal" @close="showRoomsModal = false" />
    </suspense>

  </div>

</template>

<style scoped>

</style>

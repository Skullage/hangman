<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import CreateRoomModal from "../components/Modals/createRoomModal.vue";
import JoinRoomModal from "../components/Modals/joinRoomModal.vue";
import RoomsModal from "../components/Modals/roomsModal.vue";
import BaseButton from "../components/UI/Buttons/BaseButton.vue";
import BlueButton from "../components/UI/Buttons/BlueButton.vue";
import OutlinedBlueButton from "../components/UI/Buttons/OutlinedBlueButton.vue";

const showCreateModal = ref(false);
const showJoinModal = ref(false);
const showRoomsModal = ref(false);

const store = useStore();

const createRoom = () => {
  showCreateModal.value = true;
};
const showRooms = () => {
  showRoomsModal.value = true;
};
const joinRoom = () => {
  showJoinModal.value = true;
};
</script>

<template>
  <div>
    <div class="dark:bg-secondaryDark px-2 md:px-20 py-10 rounded-2xl">
      <h1 class="mb-12">Hangman</h1>
      <div class="flex flex-col gap-2 mb-10">
        <blue-button @click="createRoom">Создать комнату</blue-button>
        <base-button @click="showRooms">Список комнат</base-button>
        <base-button @click="joinRoom">Присоединиться к комнате</base-button>
      </div>
      <div>
        <p class="mb-1">Ваш ник</p>
        <p class="text-xl text-thirdDark mb-2">
          {{ store.state.user.username }}
        </p>
        <outlined-blue-button @click="store.commit('user/logout')"
          >Сменить ник</outlined-blue-button
        >
      </div>
    </div>
    <create-room-modal
      :show="showCreateModal"
      @close="showCreateModal = false"
    />
    <join-room-modal :show="showJoinModal" @close="showJoinModal = false" />
    <suspense>
      <rooms-modal :show="showRoomsModal" @close="showRoomsModal = false" />
    </suspense>
  </div>
</template>

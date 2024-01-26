<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import CreateRoomModal from "../components/Modals/CreateRoomModal.vue";
import JoinRoomModal from "../components/Modals/JoinRoomModal.vue";
import RoomsListModal from "../components/Modals/RoomsListModal.vue";
import CustomButton from "../components/UI/Buttons/CustomButton.vue";
import { Icon } from "@iconify/vue";
import PasswordModal from "../components/Modals/PasswordModal.vue";
import FeedbackModal from "../components/Modals/FeedbackModal.vue";

const showCreateModal = ref(false);
const showJoinModal = ref(false);
const showRoomsModal = ref(false);
const showBugReportModal = ref(false);

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
  <div class="h-full flex flex-col md:block">
    <div
      class="dark:bg-secondaryDark bg-thirdLight px-2 md:px-20 py-10 rounded-t-2xl overflow-hidden flex-1"
    >
      <h1 class="mb-12 holtwood text-4xl md:text-5xl">
        Play <span class="block">Together</span>
      </h1>
      <div class="flex flex-col gap-2 mb-10">
        <custom-button class="blue-btn" @click="createRoom"
          >Создать комнату</custom-button
        >
        <custom-button class="base-btn" @click="showRooms"
          >Список комнат</custom-button
        >
        <custom-button class="base-btn" @click="joinRoom"
          >Присоединиться к комнате</custom-button
        >
      </div>
      <div class="mb-4">
        <p class="mb-1">Ваш ник</p>
        <p class="text-xl dark:text-thirdDark text-fifthLight mb-2">
          {{ store.state.user.username }}
        </p>
        <custom-button
          class="outlined-blue-btn"
          @click="store.commit('user/logout')"
          >Сменить ник</custom-button
        >
      </div>
    </div>
    <div
      class="dark:bg-secondaryDark bg-thirdLight h-auto border-t py-4 rounded-b-2xl"
    >
      <div class="flex justify-end px-4 gap-4">
        <button
          title="Обратная связь"
          class="cursor-pointer"
          @click="showBugReportModal = true"
        >
          <Icon icon="ri:bug-fill" width="32" height="32" />
        </button>
        <button
          v-if="store.state.theme.themeMode !== 'dark'"
          title="Темная тема"
          @click="store.commit('theme/toggleTheme', 'dark')"
          class="cursor-pointer"
        >
          <Icon icon="fluent:dark-theme-24-regular" width="32" height="32" />
        </button>
        <button
          v-else
          title="Светлая тема"
          class="cursor-pointer"
          @click="store.commit('theme/toggleTheme', 'light')"
        >
          <Icon icon="fluent:dark-theme-24-regular" width="32" height="32" />
        </button>
      </div>
    </div>
    <create-room-modal
      :show="showCreateModal"
      @close="showCreateModal = false"
    />
    <join-room-modal :show="showJoinModal" @close="showJoinModal = false" />
    <suspense>
      <rooms-list-modal
        :show="showRoomsModal"
        @close="showRoomsModal = false"
      />
    </suspense>
    <password-modal
      :show="store.state.modals.passwordModal.isShow"
      @close="store.state.modals.passwordModal.isShow = false"
    />
    <feedback-modal
      :show="showBugReportModal"
      @close="showBugReportModal = false"
    />
  </div>
</template>

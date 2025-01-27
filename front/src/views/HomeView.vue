<script setup>
import { useStore } from "vuex";
import CreateRoomModal from "../components/Modals/CreateRoomModal.vue";
import JoinRoomModal from "../components/Modals/JoinRoomModal.vue";
import RoomsListModal from "../components/Modals/RoomsListModal.vue";
import CustomButton from "../components/UI/Buttons/CustomButton.vue";
import { Icon } from "@iconify/vue";
import FeedbackModal from "../components/Modals/FeedbackModal.vue";
import NicknameModal from "../components/Modals/NicknameModal.vue";

const store = useStore();

const handleOnClickOpenNicknameModal = () => {
  store.commit("modals/open", {
    view: NicknameModal,
  });
};
const handleOnClickOpenCreateModal = () => {
  store.commit("modals/open", {
    view: CreateRoomModal,
  });
};
const handleOnClickOpenRoomsListModal = () => {
  store.commit("modals/open", {
    view: RoomsListModal,
  });
};
const handleOnClickOpenJoinModal = () => {
  store.commit("modals/open", {
    view: JoinRoomModal,
  });
};
const handleOnClickOpenFeedbackModal = () => {
  store.commit("modals/open", {
    view: FeedbackModal,
  });
};
</script>

<template>
  <div class="h-full flex flex-col md:block">
    <div
      class="dark:bg-secondaryDark bg-thirdLight px-2 md:px-20 py-8 rounded-t-2xl overflow-hidden flex-1 flex-col flex justify-center"
    >
      <h1 class="mb-8 holtwood text-4xl md:text-5xl">
        Play <span class="block">Together</span>
      </h1>
      <div class="flex flex-col gap-2 mb-8">
        <custom-button class="blue-btn" @click="handleOnClickOpenCreateModal"
          >Создать комнату</custom-button
        >
        <custom-button class="base-btn" @click="handleOnClickOpenRoomsListModal"
          >Список комнат</custom-button
        >
        <custom-button class="base-btn" @click="handleOnClickOpenJoinModal"
          >Присоединиться к комнате</custom-button
        >
      </div>
      <div>
        <p class="mb-1">Ваш ник</p>
        <p class="text-xl dark:text-thirdDark text-fifthLight mb-2">
          {{ store.state.user.username }}
        </p>
        <custom-button
          class="outlined-blue-btn"
          @click="handleOnClickOpenNicknameModal"
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
          @click="handleOnClickOpenFeedbackModal"
        >
          <Icon icon="ri:bug-fill" width="32" height="32" class="hover:scale-110 duration-300" />
        </button>
        <!--        <button-->
        <!--          v-if="store.state.theme.themeMode !== 'dark'"-->
        <!--          title="Темная тема"-->
        <!--          @click="store.commit('theme/toggleTheme', 'dark')"-->
        <!--          class="cursor-pointer"-->
        <!--        >-->
        <!--          <Icon icon="fluent:dark-theme-24-regular" width="32" height="32" />-->
        <!--        </button>-->
        <!--        <button-->
        <!--          v-else-->
        <!--          title="Светлая тема"-->
        <!--          class="cursor-pointer"-->
        <!--          @click="store.commit('theme/toggleTheme', 'light')"-->
        <!--        >-->
        <!--          <Icon icon="fluent:dark-theme-24-regular" width="32" height="32" />-->
        <!--        </button>-->
      </div>
    </div>
  </div>
</template>

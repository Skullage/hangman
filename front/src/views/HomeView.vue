<script setup>
import { useStore } from "vuex";
import CreateRoomModal from "../components/Modals/CreateRoomModal.vue";
import JoinRoomModal from "../components/Modals/JoinRoomModal.vue";
import RoomsListModal from "../components/Modals/RoomsListModal.vue";
import CustomButton from "../components/UI/Buttons/CustomButton.vue";
import { Icon } from "@iconify/vue";
import PasswordModal from "../components/Modals/PasswordModal.vue";
import FeedbackModal from "../components/Modals/FeedbackModal.vue";

import Test from "../components/Modals/Test.vue";
import BaseModalNew from "../components/Modals/BaseModalNew.vue";

const store = useStore();

const showCreateModal = () => {
  store.commit("modals/showCreateModal");
};

const showRoomsModal = () => {
  store.commit("modals/showRoomsModal");
};

const showJoinModal = () => {
  store.commit("modals/showJoinModal");
};
const showFeedbackModal = () => {
  store.commit("modals/showFeedbackModal");
};

function handleOnClickOpenModal() {
  store.commit("newModal/open", {
    view: Test,
    actions: [],
  });
}
</script>

<template>
  <div class="h-full flex flex-col md:block">
    <div
      class="dark:bg-secondaryDark bg-thirdLight px-2 md:px-20 py-10 rounded-t-2xl overflow-hidden flex-1 flex-col flex justify-center"
    >
      <h1 class="mb-12 holtwood text-4xl md:text-5xl">
        Play <span class="block">Together</span>
      </h1>
      <div class="flex flex-col gap-2 mb-10">
        <custom-button class="blue-btn" @click="showCreateModal"
          >Создать комнату</custom-button
        >
        <custom-button class="base-btn" @click="showRoomsModal"
          >Список комнат</custom-button
        >
        <custom-button class="base-btn" @click="showJoinModal"
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
          @click="showFeedbackModal"
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
        <button @click="handleOnClickOpenModal">Toggle</button>
      </div>
    </div>
    <create-room-modal
      :show="store.state.modals.isCreateModalShown"
      @close="store.commit('modals/closeCreateModal')"
    />
    <join-room-modal
      :show="store.state.modals.isJoinModalShown"
      @close="store.commit('modals/closeJoinModal')"
    />
    <suspense>
      <rooms-list-modal
        :show="store.state.modals.isRoomsModalShown"
        @close="store.commit('modals/closeRoomsModal')"
      />
    </suspense>
    <password-modal
      :show="store.state.modals.passwordModal.isShow"
      @close="store.state.modals.passwordModal.isShow = false"
    />
    <feedback-modal
      :show="store.state.modals.isFeedbackModalShown"
      @close="store.commit('modals/closeFeedbackModal')"
    />
    <base-modal-new />
  </div>
</template>

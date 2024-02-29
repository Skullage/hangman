<template>
  <base-modal @close="closeModalWindow">
    <h3 class="mb-4 border-b py-8 text-center text-2xl">
      {{ store.state.modals.confirmModal.title }}
    </h3>
    <div class="overflow-y-auto mb-4">
      {{ store.state.modals.confirmModal.msg }}
    </div>

    <div class="flex justify-center gap-4">
      <custom-button class="outlined-blue-btn" @click="confirm">
        Да
      </custom-button>
      <custom-button class="blue-btn" @click="cancel">Нет</custom-button>
    </div>
  </base-modal>
</template>
<script setup>
import BaseModal from "./BaseModal.vue";
import store from "../../store/index.js";
import CustomButton from "../UI/Buttons/CustomButton.vue";

const emits = defineEmits(["close"]);

const closeModalWindow = () => {
  emits("close");
};

const confirm = () => {
  store.state.modals.confirmModal.resolvePromise(true);
  closeModalWindow();
};
const cancel = () => {
  store.state.modals.confirmModal.resolvePromise(false);
  closeModalWindow();
};
</script>

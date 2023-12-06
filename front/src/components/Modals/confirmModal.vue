<template>
  <base-modal>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">
      {{ store.state.modals.confirmModal.title }}
    </h3>
    <div class="overflow-y-auto px-4 mb-4">
      {{ store.state.modals.confirmModal.msg }}
    </div>

    <div class="flex justify-center gap-4">
      <outlined-blue-button @click="confirm"> Да </outlined-blue-button>
      <blue-button @click="cancel">Нет</blue-button>
    </div>
  </base-modal>
</template>
<script setup>
import BaseModal from "./BaseModal.vue";
import OutlinedBlueButton from "../UI/Buttons/OutlinedBlueButton.vue";
import store from "../../store/index.js";
import BlueButton from "../UI/Buttons/BlueButton.vue";

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

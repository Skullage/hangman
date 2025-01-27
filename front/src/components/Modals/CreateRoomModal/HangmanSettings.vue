<script setup>
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import BaseSelect from "../../UI/BaseSelect.vue";
import { reactive, ref } from "vue";

const languages = reactive(["Английский", "Русский"]);
const roomLanguage = ref("Английский");

const emits = defineEmits(["submit"]);

const createRoom = async () => {
  emits("submit", { language: roomLanguage.value });
};
</script>

<template>
  <form>
    <base-select
      :options="languages"
      :values="languages"
      v-model="roomLanguage"
      label="Язык комнаты"
      class="mb-6"
    />
    <custom-button @click="createRoom" class="w-full outlined-blue-btn">
      Создать
    </custom-button>
  </form>
</template>

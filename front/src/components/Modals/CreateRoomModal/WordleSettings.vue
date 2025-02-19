<script setup>
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import BaseSelect from "../../UI/BaseSelect.vue";
import { reactive, ref } from "vue";

const languages = reactive([{title: "Английский", value: 'en'}, {title: "Русский", value: 'ru'}]);
const roomLanguage = ref("ru");
const roomWordLength = ref("6");

const emits = defineEmits(["submit"]);

const createRoom = async () => {
  emits("submit", { language: {title: 'Язык', value: roomLanguage.value}, wordLength: {title: 'Длина слова', value: roomWordLength.value}});
};
</script>

<template>
  <form>
    <base-select
      :options="languages.map(el => el.title)"
      :values="languages.map(el => el.value)"
      v-model="roomLanguage"
      label="Язык"
      class="mb-6"
    />
    <base-select
      :options="[6, 7, 8, 9, 10]"
      :values="[6, 7, 8, 9, 10]"
      v-model="roomWordLength"
      label="Длина слова"
      class="mb-6"
    />
    <custom-button @click="createRoom" class="w-full outlined-blue-btn">
      Создать
    </custom-button>
  </form>
</template>

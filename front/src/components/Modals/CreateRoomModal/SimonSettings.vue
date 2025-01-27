<script setup>
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import BaseSelect from "../../UI/BaseSelect.vue";
import { reactive, ref } from "vue";

const difficulties = reactive([
  { title: "Легкий", value: 1500 },
  { title: "Средний", value: 1200 },
  { title: "Сложный", value: 800 },
]);
const difficult = ref();

const emits = defineEmits(["submit"]);

const createRoom = async () => {
  emits("submit", { difficult: difficult.value });
};
</script>

<template>
  <form>
    <base-select
      :options="difficulties.map((el) => el.title)"
      :values="difficulties.map((el) => el.value)"
      v-model="difficult"
      label="Сложность игры"
      class="mb-6"
    />
    <custom-button @click="createRoom" class="w-full outlined-blue-btn">
      Создать
    </custom-button>
  </form>
</template>

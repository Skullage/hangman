<script setup>
import CustomButton from "../../UI/Buttons/CustomButton.vue";
import BaseSelectCustom from "../../UI/BaseSelectCustom.vue";
import { reactive, ref } from "vue";

const difficulties = reactive(["Легкий", "Средний", "Сложный"]);
const difficult = ref("Легкий");

const emits = defineEmits(["submit"]);

const createRoom = async () => {
  emits("submit", { difficult: difficult.value });
};
</script>

<template>
  <form class="p-4">
    <base-select-custom
      :options="difficulties"
      v-model="difficult"
      label="Сложность игры"
      class="mb-6"
    />
    <custom-button @click="createRoom" class="w-full outlined-blue-btn">
      Создать
    </custom-button>
  </form>
</template>

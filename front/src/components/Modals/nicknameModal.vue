<template>
  <teleport to="body">
    <div
        class="fixed top-0 left-0 z-40 flex h-full w-full justify-center backdrop-blur-lg duration-500 items-center"
        role="dialog"
        :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
          class="flex h-auto max-h-full w-full flex-col rounded border bg-white text-black dark:bg-dark dark:text-white lg:max-h-[80%] lg:w-1/4 relative"
      >
        <h3
            class="mb-4 border-b py-8 text-center text-2xl"
        >
          <slot name="title">Введите ник</slot>
        </h3>
        <div class="modal-content flex-1 overflow-y-auto px-4">
          <slot name="body">
            <form>
              <input type="text"  placeholder="Ник" class="w-full px-2 py-1 mb-4 text-gray-400" v-model="nickname">
            </form>
          </slot>
        </div>

        <div
            class="modal-footer relative bottom-0 left-0 flex flex-wrap justify-center gap-2 py-2 lg:gap-10"
        >
          <slot name="footer">
            <button @click="setNick">Подтвердить</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import {ref} from "vue";
import store from "../../store/index.js";

const props = defineProps({
  show: Boolean
});

const nickname = ref('')

const setNick = async () => {
  store.commit('setUsername', nickname.value)
}

</script>

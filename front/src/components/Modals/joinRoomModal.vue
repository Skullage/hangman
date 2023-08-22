<template>
  <teleport to="body">
    <div
        class="fixed top-0 left-0 z-40 flex h-full w-full justify-center backdrop-blur-lg duration-500 items-center"
        role="dialog"
        :class="[{ '-translate-y-full opacity-0': !props.show }]"
    >
      <div
          class="flex h-auto max-h-full w-full flex-col rounded border bg-white text-black dark:bg-dark dark:text-white lg:max-h-[80%] lg:w-1/2 relative"
      >
        <h3
            class="mb-4 border-b py-8 text-center text-2xl"
        >
          <slot name="title">Присоединиться</slot>
        </h3>
        <button
            class="absolute right-0 top-0 mr-3 mt-3 p-0"
            @click="closeModalWindow"
        >
          <Icon
              icon="material-symbols:close"
              width="24"
              height="24"
              class="text-black dark:text-white"
          />
        </button>
        <div class="modal-content flex-1 overflow-y-auto px-4">
          <slot name="body">
            <form>
              <input type="text"  placeholder="Id комнаты" class="w-full px-2 py-1 mb-4 text-gray-400" v-model="roomId">
            </form>
          </slot>
        </div>

        <div
            class="modal-footer relative bottom-0 left-0 flex flex-wrap justify-center gap-2 py-2 lg:gap-10 mb-4"
        >
          <slot name="footer">
            <button @click="connect">Подключиться</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import {ref} from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  show: Boolean
});
const emits = defineEmits(['close']);

const roomId = ref('')

const closeModalWindow = () => {
  emits('close');
};

const connect = () => {
  router.push({ path: `/room/${roomId.value}`, replace: true })
}
</script>

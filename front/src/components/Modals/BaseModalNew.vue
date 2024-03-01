<script setup>
import { reactive } from "vue";
import store from "../../store/index.js";
import CustomButton from "../UI/Buttons/CustomButton.vue";

// reactive container to save the payload returned by the mounted view
const model = reactive({});
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        class="w-screen h-screen fixed top-0 left-0 backdrop-blur-lg grid place-items-center"
        v-if="store.state.newModal.isOpen"
      >
        <div
          class="h-auto max-h-full w-full rounded-lg bg-thirdLight dark:bg-fifthDark duration-500 lg:max-h-[80%] lg:w-1/2 p-4 border-black relative"
          role="dialog"
          aria-modal="true"
          ref="modal"
          tabindex="0"
        >
          <component
            :is="store.state.newModal.view"
            v-model="model"
          ></component>
          <div class="modal-action">
            <!-- render all actions and pass the model payload as parameter -->
            <custom-button
              @click="action.callback(model)"
              class="w-full outlined-blue-btn"
              v-for="action in store.state.newModal.actions"
              >{{ action.label }}</custom-button
            >
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

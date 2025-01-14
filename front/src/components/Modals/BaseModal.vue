<script setup>
import store from "../../store/index.js";
import CustomButton from "../UI/Buttons/CustomButton.vue";
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        class="w-screen h-screen fixed top-0 left-0 backdrop-blur-lg grid place-items-center"
        v-if="store.state.modals.isOpen"
      >
        <div
          class="h-auto max-h-full w-screen rounded-lg bg-thirdLight dark:bg-fifthDark duration-500 lg:max-h-[80%] lg:w-1/2 p-4 border-black relative overflow-y-auto"
          role="dialog"
          aria-modal="true"
          ref="modal"
          tabindex="0"
        >
          <component :is="store.state.modals.view"></component>
          <div class="flex gap-4 justify-center">
            <custom-button
              @click="action.callback()"
              :class="action.btnClass"
              v-for="action in store.state.modals.actions"
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

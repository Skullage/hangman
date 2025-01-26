<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

const props = defineProps({
  icon: String,
  label: String,
  iconColor: String,
  modelValue: {
    type: [Number, String],
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  required: Boolean,
});

const emits = defineEmits(["update:modelValue"]);

const isPasswordVisible = ref(false);

const isPasswordType = computed(() => {
  return isPasswordVisible.value ? "text" : "password";
});

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};
</script>

<template>
  <div>
    <div class="relative">
      <Icon
        :icon="props.icon"
        width="24"
        height="24"
        class="pointer-events-none absolute right-0 top-0 mt-2 mr-1"
        :style="`color: ${props.iconColor}`"
        v-if="props.icon"
      />
      <div>
        <div class="relative">
          <input
            class="w-full rounded border px-3 outline-none bg-white text-xl dark:text-black focus:outline-amber-300 pr-14"
            @input="updateValue"
            :value="props.modelValue"
            :id="props.id"
            :placeholder="props.placeholder"
            :type="props.type === 'password' ? isPasswordType : props.type"
            :required="props.required"
            :class="{
              'pt-4 pb-1': props.label !== undefined,
              'p-2': props.label === undefined,
              'border-2 border-red-600': props.error,
            }"
          />
          <Icon
            :icon="isPasswordVisible ? 'bx:hide' : 'bx:show'"
            width="24"
            height="24"
            class="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-black duration-300"
            v-if="props.type === 'password'"
            @click="isPasswordVisible = !isPasswordVisible"
          />
        </div>

        <label
          :for="props.id"
          class="pointer-events-none absolute top-0 left-4 bg-thirdLight dark:bg-fifthDark -translate-y-1/2 px-4 border"
          v-if="props.label"
        >
          {{ props.label }}
        </label>
      </div>
    </div>
    <span v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</span>
  </div>
</template>

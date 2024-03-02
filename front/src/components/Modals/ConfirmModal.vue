<template>
  <div>
    <h3 class="mb-4 border-b py-8 text-center text-2xl">
      {{ store.state.newModal.props.title }}
    </h3>
    <div class="overflow-y-auto mb-4">
      {{ store.state.newModal.props.msg }}
    </div>
  </div>
</template>
<script setup>
import store from "../../store/index.js";
</script>

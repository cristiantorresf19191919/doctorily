<script setup>
import { toRefs, watch, ref } from 'vue';

const props = defineProps(['fill', 'isVisible'])


</script>
<template>
  <div class="absolute right-0 top-0 m-5">
    <div
      :class="
        `flex
        items-center
        bg-green-500
        border-l-4 border-green-700
        py-3
        px-3
        shadow-md
        mb-2
        ${props.isVisible ? 'toast' : 'hidden'}
        `
      "
    >
      <!-- icon -->
      <div class="text-green-500 rounded-full bg-white mr-3">
        <svg
        class="fill-green-600"
        width="24"
        height="24"
        v-bind="props"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm3.22 6.97-4.47 4.47-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06Z"
        />
      </svg>
      </div>
      

      <!-- text -->
      <h2 class="text-white max-w-xs">Paciente registrado con exito</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast{
    animation: toast .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
}

@keyframes toast {
    from{
        opacity: 0;
        transform: translateX(400px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>

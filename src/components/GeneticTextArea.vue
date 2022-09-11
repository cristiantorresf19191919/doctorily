<script setup>

import useGenericField from "../hooks/useGenericField";
import { onMounted } from 'vue';

const { patient, updateState, primitivo } = useGenericField();// composable

const props = defineProps([
  "name", "label", "modelValue"
]);

const emit = defineEmits(['update:modelValue'])

onMounted( () => emit('update:modelValue', "props.label"));

    </script>
    
    <template>
  <textarea
    :model="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="
      border
      outline-0
      focus-visible:border-indigo-600
      hover:border-indigo-600
      caret-indigo-900
      border-indigo-200
      rounded
      w-full
    "
    name=""
    id=""
    cols="30"
    rows="2"
  ></textarea>
</template>
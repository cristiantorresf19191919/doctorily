import { ref, onMounted, reactive, computed  } from 'vue';


export default function useGenericField() {
    const patient = ref({ names: '', cc:'', email:'', city:'' })
    const primitivo = ref();
    const updateState = ({key, value}) => {
        console.log('🚀{key, value} >>',{key, value});
        primitivo.value = value
    }

    return { patient, updateState, primitivo };    
}


import { ref } from "vue"

const showOpenClose = ref(false)

export const useOpenClose = () => {

    function open() {
        showOpenClose.value = true
    }

    function close() {
        showOpenClose.value = false
    }

    return {
        open,
        close,
        showOpenClose,

    }
}
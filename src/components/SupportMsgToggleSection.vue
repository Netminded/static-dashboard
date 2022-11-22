<script setup lang="ts">
    import { useOptionsStore } from '@/stores/options'
    import { storeToRefs } from 'pinia'

    const optionsStore = useOptionsStore()
    const { toggleSupportMsg } = storeToRefs(optionsStore)
    const { updateSupportMsgOption } = optionsStore
</script>

<template>
    <h5>Include Support Messages</h5>
    <div>
        <label class="switch">
            <input type="checkbox" :checked="toggleSupportMsg" @click="updateSupportMsgOption(!toggleSupportMsg)">
            <span class="slider round"></span>
        </label>
    </div>
</template>
    
<style scoped>
    h5 {
        color: #4c4d55;
        font-family: "Poppins";
        font-weight: 800;
        font-size: 18px;
        margin-top: 30px;
        margin-bottom: 15px;
    }

    .switch {
        position: relative;
        cursor: pointer;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #CCCCCC;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: #FFFFFF;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #0d6af7;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #0d6af7;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
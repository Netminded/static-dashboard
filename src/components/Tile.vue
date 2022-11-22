<script setup lang="ts">
    import { ref } from "vue"
    import { useOptionsStore } from '@/stores/options'
    import { useDepsStore } from '@/stores/deps'
    import { storeToRefs } from 'pinia'
    import { DepStatusColors, Themes } from "@/types"
    import type { SupportMsgs } from "@/types"
    import { isInArray } from "@/utilities/utils"

    const optionsStore = useOptionsStore()
    const { themeOption, toggleSupportMsg } = storeToRefs(optionsStore)
    const depsStore = useDepsStore()
    const { depsList } = storeToRefs(depsStore)
    const { updateDepSupportExpanded } = depsStore

    const props = defineProps<{
        id: string
        title: string
        statusMsg: string
        statusColor: DepStatusColors
        supportMsgs: SupportMsgs
    }>()

    const setExpanded = (id: string) => {
        const index = depsList.value.findIndex((dep) => dep.id === id)
        return isInArray(index, depsList.value) ? depsList.value[index].supportExpanded : false
    }

    const expanded = ref(setExpanded(props.id))

    // Get the relevant status color header class
    const setHeaderColor = (col: DepStatusColors) => {

        const colors = new Map([
            [DepStatusColors.Green, 'tile-header-green'],
            [DepStatusColors.Amber, 'tile-header-amber'],
            [DepStatusColors.Red, 'tile-header-red'],
            [DepStatusColors.Default, 'tile-header-grey']
        ])

        let headerClass = colors.get(col) || 'tile-header-green'
        return headerClass
    }

    // Limit the length that the dependency title or status message can be
    const truncateTxt = (text: string, maxChars: number) =>
        text.length > maxChars ? text.substring(0, maxChars) + "…" : text;
</script>

<template>
    <div class="tile" :class="themeOption === Themes.NetMinded ? 'tile-netminded' : 'tile-pti'">
        <div class="tile-header" :class="[themeOption === Themes.NetMinded ? 'tile-header-netminded' : '', setHeaderColor(statusColor)]">
            <h5 :class="themeOption === Themes.NetMinded ? 'title-netminded' : 'title-pti'">{{ truncateTxt(title, 30) }}</h5>
        </div>
        <div class="tile-body" :class="themeOption === Themes.NetMinded ? 'tile-body-netminded' : 'tile-body-pti'">
            <p>{{ truncateTxt(statusMsg, 60) }}</p>
        </div>
        <template v-if="supportMsgs[statusColor]">
            <div class="support-msg-container" v-if="toggleSupportMsg && supportMsgs[statusColor].length > 0">
                <button :class="['support-button', setHeaderColor(statusColor)]" @click="expanded = !expanded, updateDepSupportExpanded(id, expanded)"><font-awesome-icon icon="fa-solid fa-headset" /> Support
                    <span>
                        <font-awesome-icon v-if="expanded" icon="fa-solid fa-chevron-up" /> 
                        <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
                    </span>
                </button>
                <p class="support-msg-text" v-if="expanded">{{ supportMsgs[statusColor] }}</p>
            </div>
        </template>
    </div>
</template>

<style scoped>
.tile {
    width: 350px;
    margin-left: auto;
    margin-right: auto;
}

@media screen and (max-width: 450px) {
    .tile {
        width: 100%;
    }
}

.tile-netminded {
    background: #e9eff4;
    box-shadow: 0px 4px 14px #c9dbe9;
    border-radius: 15px;
}

.tile-pti {
    background: #3e3e3f;
}
.tile-header {
    text-align: center;
    padding: 10px 20px;
}

.tile-header-green {
    background: linear-gradient(90deg, #77df81 0%, #4ea43d 100%);
}

.tile-header-amber {
    background: linear-gradient(90deg, #ffb74d 0%, #f09103 100%);
}

.tile-header-red {
    background: linear-gradient(90deg, #f1673b 0%, #c84114 100%);
}

.tile-header-grey {
    background: linear-gradient(90deg, #afb1c0 0%, #8f9fae 100%);
}

.tile-header-netminded {
    border-radius: 15px 15px 0 0;
}
.tile-header h5 {
    color: #ffffff;
    font-weight: 800;
    font-size: 20px;
}

.tile-header .title-netminded {
    font-family: 'Poppins', sans-serif;
}

.tile-header .title-pti {
    font-family: 'Montserrat', sans-serif;
}

.tile-body {
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    padding: 20px;
}

.tile-body-netminded {
    font-family: "Karla", sans-serif;
    color: #4c4d55;
}

.tile-body-pti {
    font-family: "Nunito Sans", sans-serif;
    color: #FFFFFF;
}

.support-msg-container {
    text-align: center;
    font-family: "Karla", sans-serif;
    color: #4c4d55;
}

.support-button {
    border: 0 solid transparent;
    border-radius: 50px;
    box-shadow: 0 4px 16px rgb(32 19 104 / 25%);
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 20px;
    text-transform: uppercase;
    transition-timing-function: ease-in;
    transition: 0.5s;
    margin-bottom: 15px;
    cursor: pointer;
}

.fa-headset {
    padding-right: 3px;
}

.fa-chevron-up, .fa-chevron-down {
    margin-left: 7px;
}

.support-msg-text {
    padding: 0 15px 15px 15px;
}
</style>

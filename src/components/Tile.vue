<script setup lang="ts">
    import { ref } from "vue"
    import { useOptionsStore } from '@/stores/options'
    import { useDepsStore } from '@/stores/deps'
    import { storeToRefs } from 'pinia'
    import { DepStatusColors, Themes } from "@/types"
    import type { Dep } from '@/types'
    import { isInArray } from "@/utilities/utils"

    const optionsStore = useOptionsStore()
    const { themeOption, toggleSupportMsg } = storeToRefs(optionsStore)
    const depsStore = useDepsStore()
    const { updateDepSupportExpanded } = depsStore

    const props = defineProps<{
        id: string
        title: string
        statusMsg: string
        statusColor: DepStatusColors
        supportMsg: string
        depList: Dep[]
        isThumbnailPreview: boolean
    }>()

    const setExpanded = (id: string) => {
        const index = props.depList.findIndex((dep) => dep.id === id)
        return isInArray(index, props.depList) ? props.depList[index].supportExpanded : false
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
    <div :class="[isThumbnailPreview ? 'tile-thumbnail' : 'tile', themeOption === Themes.NetMinded ? 'tile-netminded' : 'tile-pti']">
        <div :class="[isThumbnailPreview ? 'tile-header-thumbnail' : 'tile-header', themeOption === Themes.NetMinded ? 'tile-header-netminded' : '', setHeaderColor(statusColor)]">
            <h5 :class="themeOption === Themes.NetMinded ? 'title-netminded' : 'title-pti'">{{ truncateTxt(title, 30) }}</h5>
        </div>
        <div :class="[isThumbnailPreview ? 'tile-body-thumbnail' : 'tile-body', themeOption === Themes.NetMinded ? 'tile-body-netminded' : 'tile-body-pti']">
            <p>{{ truncateTxt(statusMsg, 60) }}</p>
        </div>
        <template v-if="supportMsg">
            <div class="support-msg-container" v-if="toggleSupportMsg && supportMsg.length > 0">
                <button :class="[isThumbnailPreview ? 'support-button-thumbnail' : 'support-button', setHeaderColor(statusColor)]" @click="expanded = !expanded, updateDepSupportExpanded(id, expanded)"><font-awesome-icon icon="fa-solid fa-headset" /> Support
                    <span>
                        <span class="tile-up" v-if="expanded">⌃</span>
                        <span class="tile-down" v-else>⌄</span>
                    </span>
                </button>
                <p :class="[isThumbnailPreview ? 'support-msg-text-thumbnail' : 'support-msg-text']" v-if="expanded">{{ truncateTxt(supportMsg, 250) }}</p>
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

.tile-thumbnail {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
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

.tile-header-thumbnail {
    text-align: center;
    padding: 5% 10%;
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

.tile-header-thumbnail h5 {
    color: #ffffff;
    font-weight: 800;
    font-size: 50%;
}

.title-netminded {
    font-family: 'Poppins', sans-serif;
}

.title-pti {
    font-family: 'Montserrat', sans-serif;
}

.tile-body {
    text-align: center;
    font-weight: 400;
    font-size: 18px;
    padding: 20px;
}

.tile-body-thumbnail {
    text-align: center;
    font-weight: 400;
    font-size: 45%;
    padding: 5%;
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

.support-button-thumbnail {
    border: 0 solid transparent;
    border-radius: 50px;
    box-shadow: 0 4px 7% rgb(32 19 104 / 25%);
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-size: 40%;
    font-weight: 600;
    padding: 5% 10%;
    text-transform: uppercase;
    transition-timing-function: ease-in;
    transition: 0.5s;
    margin-bottom: 7%;
    cursor: pointer;
}

.fa-headset {
    padding-right: 3px;
}

.tile-up {
    position: relative;
    left: 2px;
    top: 3px;
}

.tile-down {
    position: relative;
    left: 2px;
    bottom: 3px;
}

.support-msg-text {
    padding: 0 15px 15px 15px;
}

.support-msg-text-thumbnail {
    font-size: 45%;
    padding: 0 7% 7% 7%;
}
</style>

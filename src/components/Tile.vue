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
        description?: string | undefined
        createdBy?: string | undefined
        statusMsg: string
        statusColor: DepStatusColors
        supportMsg: string
        thirdPartyItem: boolean
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

    // Limit the length that the dependency title, description or status message can be
    const truncateTxt = (text: string | undefined, maxChars: number) =>
        text && text.length > maxChars ? text.substring(0, maxChars) + "…" : text

    const getFirstLetter = (text: string | undefined) =>
        text && text.length > 1 ? text.substring(0, 1) : ''
</script>

<template>
    <div :class="[isThumbnailPreview ? 'tile-thumbnail' : 'tile', themeOption === Themes.NetMinded ? 'tile-netminded' : 'tile-pti']">
        <div :class="[isThumbnailPreview ? 'tile-header-thumbnail' : 'tile-header', themeOption === Themes.NetMinded ? 'tile-header-netminded' : '', setHeaderColor(statusColor)]">
            <h5 :class="themeOption === Themes.NetMinded ? 'title-netminded' : 'title-pti'"><font-awesome-icon v-if="thirdPartyItem" icon="fa-regular fa-share-from-square" />{{ truncateTxt(title, themeOption === Themes.NetMinded ? 22 : 20) }}</h5>
            <span :class="[isThumbnailPreview ? 'tile-header-right-thumbnail' : 'tile-header-right', themeOption === Themes.NetMinded ? 'tile-header-right-netminded' : 'tile-header-right-pti']">{{ statusColor }}</span>
        </div>
        <div :class="[isThumbnailPreview ? 'tile-body-thumbnail' : 'tile-body', themeOption === Themes.NetMinded ? 'tile-body-netminded' : 'tile-body-pti']">
            <div v-if="createdBy && createdBy.length > 0" :class="[isThumbnailPreview ? 'tile-body-created-by-thumbnail' : 'tile-body-created-by', themeOption === Themes.NetMinded ? 'tile-body-created-by-netminded' : 'tile-body-created-by-pti']">
                <span class="created-by-avatar"><p>{{ getFirstLetter(createdBy) }}</p></span>
                <p class="created-by-text"><span class="created-by-text-bold">By: </span>{{ truncateTxt(createdBy, 30) }}</p>
            </div>
            <p>{{ truncateTxt(description, 60) }}</p>
            <div v-if="statusMsg.length > 0" :class="[isThumbnailPreview ? 'tile-body-status-thumbnail' : 'tile-body-status', themeOption === Themes.NetMinded ? 'tile-body-status-netminded' : 'tile-body-status-pti']">
                <p>{{ truncateTxt(statusMsg, 60) }}</p>
            </div>
        </div>
        <template v-if="supportMsg">
            <div class="support-msg-container" v-if="toggleSupportMsg && supportMsg.length > 0">
                <button :class="[isThumbnailPreview ? 'support-button-thumbnail' : 'support-button', setHeaderColor(statusColor)]" @click="expanded = !expanded, updateDepSupportExpanded(id, expanded)"><font-awesome-icon icon="fa-solid fa-headset" /> Support
                    <span>
                        <span class="tile-up" v-if="expanded">⌃</span>
                        <span class="tile-down" v-else>⌄</span>
                    </span>
                </button>
                <p :class="[isThumbnailPreview ? 'support-msg-text-thumbnail' : 'support-msg-text']" v-if="expanded" :style="[themeOption === Themes.NetMinded ? {'color': '#4c4d55'} : {'color': '#fff'}]">{{ truncateTxt(supportMsg, 250) }}</p>
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

.tile-thumbnail.tile-netminded {
    border-radius: 7px;
}

.tile-pti {
    background: #3e3e3f;
}
.tile-header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
}

.tile-header-thumbnail {
    padding: 5% 10%;
    display: flex;
    justify-content: space-between;
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

.tile-header-thumbnail.tile-header-netminded {
    border-radius: 7px 7px 0 0;
}
.tile-header h5 {
    color: #ffffff;
    font-weight: 800;
    font-size: 20px;
}

.tile-header .fa-share-from-square {
    margin-right: 7px;
    transform: scaleX(-1);
}

.tile-header-thumbnail h5 {
    color: #ffffff;
    font-weight: 800;
    padding-top: 3%;
    font-size: 26%;
}

.tile-header-thumbnail .fa-share-from-square {
    font-size: 70%;
    transform: scaleX(-1);
    margin-right: 3px;
    position: relative;
    bottom: 1px;
}

.tile-header-right {
    color: #FFFFFF;
    text-transform: uppercase;
    padding-top: 5px;
    padding-left: 8px;
    font-size: 14px;
    font-weight: 500;
}

.tile-header-right-thumbnail {
    color: #FFFFFF;
    text-transform: uppercase;
    padding-top: 3%;
    padding-left: 8px;
    font-size: 25%;
    font-weight: 500;
}

.tile-header-right-netminded {
    font-family: "Karla", sans-serif;
}

.tile-header-right-pti {
    font-family: "Nunito Sans", sans-serif;
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
    font-size: 30%;
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

.tile-body-created-by {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.tile-body-created-by .created-by-avatar {
    font-weight: 700;
    display: block;
    text-align: center;
    color: #FFFFFF;
    margin-right: 6px;
    border-radius: 50px;
    height: 30px;
    width: 30px;
    position: relative;
    bottom: 2px;
}

.tile-body-created-by .created-by-avatar p {
    position: relative;
    top: 1px;
    font-size: 18px;
}

.tile-body-created-by-thumbnail {
    display: flex;
    justify-content: center;
    margin-bottom: 3%;
}

.tile-body-created-by-thumbnail .created-by-avatar {
    font-weight: 700;
    display: block;
    text-align: center;
    color: #FFFFFF;
    margin-right: 2px;
    border-radius: 50px;
    width: 8px;
    height: 8px;
    position: relative;
    bottom: 1px;
}

.tile-body-created-by-thumbnail .created-by-avatar p {
    position: relative;
    top: 1.5px;
    font-size: 70%;
}

.tile-body-created-by-netminded .created-by-avatar {
    font-family: 'Poppins', sans-serif;
    background: #0d6af6;
}

.tile-body-created-by-netminded .created-by-text-bold {
    font-weight: 500;
}

.tile-body-created-by-pti .created-by-text {
    font-family: "Nunito Sans", sans-serif;
    color: #FFFFFF;
}

.tile-body-created-by-pti .created-by-text-bold {
    font-weight: 600;
}

.tile-body-created-by-pti .created-by-avatar {
    font-family: 'Montserrat', sans-serif;
    background: #F39200;
}

.tile-body-status {
    color: #FFFFFF;
    padding: 5px;
    text-align: center;
    margin-top: 10px;
}

.tile-body-status-thumbnail {
    color: #FFFFFF;
    padding: 1.5%;
    text-align: center;
    margin-top: 3%;
    font-size: 70%;
}

.tile-body-status-netminded {
    border-radius: 10px;
    font-family: "Karla", sans-serif;
    background: #88A1B2;
}

.tile-body-status-thumbnail.tile-body-status-netminded {
    border-radius: 3px;
}

.tile-body-status-pti {
    border-radius: 0;
    font-family: "Nunito Sans", sans-serif;
    background: #6F6F6F;
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

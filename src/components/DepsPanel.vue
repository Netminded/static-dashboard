<script setup lang="ts">
    import html2canvas from 'html2canvas'
    import { saveAs } from 'file-saver'
    import { ref } from "vue"
    import { BkColours, Themes } from "@/types"
    import type { Dep } from '@/types'
    import { storeToRefs } from 'pinia'
    import { useOptionsStore } from '@/stores/options'
    import Tile from "../components/Tile.vue"

    const optionsStore = useOptionsStore()
    const { backgroundOption, customBackgroundOption, themeOption } = storeToRefs(optionsStore)

    const depPanelArea = ref(null)
    const tileEls = ref([])
    const arrowEls = ref([])

    const props = defineProps<{
        depList: Dep[]
        showScreenCaptureBtn: boolean
        isThumbnailPreview: boolean
    }>()

    // Get the background class for the dependencies panel
    const setBkColor = (col: BkColours) => {

        const colors = new Map([
            [BkColours.White, 'panel-bk-white'],
            [BkColours.Black, 'panel-bk-black'],
            [BkColours.Grey, 'panel-bk-grey'],
            [BkColours.Custom, 'panel-bk-custom']
        ])

        let bkClass = colors.get(col) || 'panel-bk-white'
        return bkClass
    }

    // Show a dependency arrow if there is more than one dependency and the when the dependency is not the last
    const showArrow = (index: number) => {
        if (props.depList.length > 1 && index !== props.depList.length - 1) { 
            return true
        }
        return false
    }

    // Create a screen capture of the dependencies panel and save it as a PNG with the current time and date
    const captureScreen = async () => {
        let timestamp = new Date()
        tileSizes()
        let imgCanvas = await html2canvas(depPanelArea.value!, {
            height: tileSizes(),
            windowHeight: window.outerHeight + window.innerHeight, 
            logging: false
        })
        imgCanvas.toBlob((blob) => {
            if(blob) saveAs(blob, `${timestamp.toLocaleTimeString('en-GB').split(':').join('-')}_${timestamp.toLocaleDateString().split('/').join('-')}_deps.png`)
        })
    }

    // Calculate how tall the sreen capture needs to be based on size or dependency tiles and arrows
    const tileSizes = () => {
        let total = 40
        if(tileEls) {
            tileEls.value.map((dep: any) => total += dep.$el.clientHeight)
        }
        if(arrowEls) {
            arrowEls.value.map((arrow: HTMLElement) => total += arrow.clientHeight)
        }
        return total
    }


</script>

<template>
    <div ref="depPanelArea" :class="['deps-viewer', isThumbnailPreview && 'deps-viewer-thumbnail', setBkColor(backgroundOption)]" :style="{ backgroundColor: customBackgroundOption }">
        <div class="deps-viewer-empty" v-if="depList.length === 0">
            <font-awesome-icon icon="fa-solid fa-diagram-next" size="7x" />
        </div>
        <template v-for="(dep, index) in depList" :key="index">
            <template v-if="dep.added">
                <Tile ref="tileEls" :id="dep.id" :title="dep.title" :statusMsg="dep.statusMsg" :statusColor="dep.statusColor" :supportMsg="dep.supportMsgs[dep.statusColor]" :thirdPartyItem="dep.thirdPartyItem" :depList="depList" :isThumbnailPreview="isThumbnailPreview" />
                <div ref="arrowEls" v-if="showArrow(index)" :class="[isThumbnailPreview ? 'deps-arrow-thumbnail' : 'deps-arrow', themeOption === Themes.NetMinded ? 'deps-arrow-netminded' : 'deps-arrow-pti']">
                    <font-awesome-icon icon="fa-solid fa-arrow-down" />
                </div>
            </template>
        </template>
        <div v-if="(depList.length >= 1 && showScreenCaptureBtn)" class="screenshot-btn" @click="captureScreen" data-html2canvas-ignore="true"><font-awesome-icon icon="fa-solid fa-camera-retro" /></div>
    </div>
</template>

<style scoped>
    .deps-viewer {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 20px 40px;
        overflow-y: auto;
    }

    .deps-viewer-thumbnail {
        height: 400px;
    }

    .deps-viewer-empty {
        font-family: 'Poppins', sans-serif;
        font-weight: 800;
        font-size: 20px;
        text-align: center;
        margin-top: auto;
        margin-bottom: auto;
    }

    .deps-viewer-empty .fa-diagram-next {
        color: #e9eff4;
    }

    .panel-bk-white {
        background: #FFFFFF;
    }

    .panel-bk-black {
        background: #000000;
    }

    .panel-bk-grey {
        background: #e5e5e5;
    }

    .deps-arrow {
        font-size: 26px;
        padding: 15px 0 10px 0;
        margin-left: auto;
        margin-right: auto;
    }

    .deps-arrow-thumbnail {
        font-size: 60%;
        padding: 4% 0 3% 0;
        margin-left: auto;
        margin-right: auto;
    }

    .deps-arrow-netminded {
        color: #8A8EAC;
    }

    .deps-arrow-pti {
        color: #F39200;
    }

    .screenshot-btn {
        background: #0d6af6;
        border: 0 solid transparent;
        border-radius: 50px;
        box-shadow: 0 4px 16px rgb(32 19 104 / 25%);
        color: #fff;
        font-size: 22px;
        padding: 10px 20px;
        transition-timing-function: ease-in;
        transition: 0.5s;
        cursor: pointer;
        width: 60px;
        height: 60px;
        position: fixed;
        right: 385px;
        bottom: 70px;
        margin: 20px;
    }

    .screenshot-btn:hover {
        background: #0c54c0;
    }

    @media screen and (max-width: 950px) {
        .screenshot-btn {
            position: relative;
            z-index: 1;
            bottom: 0;
            left: 90%;
            margin-top: 40px;
        }
    }

    @media screen and (max-width: 600px) {
        .screenshot-btn {
            left: 85%;
        }
    }

    @media screen and (max-width: 450px) {
        .screenshot-btn {
            left: 75%;
        }
    }

    @media screen and (max-width: 320px) {
        .screenshot-btn {
            left: 70%;
        }
    }

    .screenshot-btn .fa-camera-retro {
        position: relative;
        top: 4px;
    }
</style>
<script setup lang="ts">
    import { useOptionsStore } from '@/stores/options'
    import { storeToRefs } from 'pinia'
    import { DepStatusColors, Themes } from "@/types"

    const optionsStore = useOptionsStore()
    const { themeOption } = storeToRefs(optionsStore)

    defineProps<{
        title: string
        statusMsg: string
        statusColor: DepStatusColors
    }>()

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
</style>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useOptionsStore } from '@/stores/options'
  import { storeToRefs } from 'pinia'
  import { BkColours } from "@/types"
  import { adjustColor } from '@/utilities/utils'

  const optionsStore = useOptionsStore()
  const { backgroundOption, customBackgroundOption } = storeToRefs(optionsStore)
  const { updateBackgroundOption } = optionsStore

  const setBkColor = () => {
      return customBackgroundOption.value.length !== 0 ? customBackgroundOption.value : '#8A4AF3'
  }

  const customColor = ref(setBkColor())

  const showActive = (bkColor: BkColours, color: BkColours) => {
    return bkColor === color
  }

</script>

<template>
  <h5>Choose Background Colour</h5>
  <div class="bk-color-container">
    <div class="color-option" @click="updateBackgroundOption(BkColours.White)">
      <span class="color-circle"></span>
      <p><span v-if="showActive(backgroundOption, BkColours.White)" class="active-element"></span>{{ BkColours.White }}</p>
    </div>
    <div class="color-option" @click="updateBackgroundOption(BkColours.Black)">
      <span class="color-circle"></span>
      <p><span v-if="showActive(backgroundOption, BkColours.Black)" class="active-element"></span>{{ BkColours.Black }}</p>
    </div>
    <div class="color-option" @click="updateBackgroundOption(BkColours.Grey)">
      <span class="color-circle"></span>
      <p><span v-if="showActive(backgroundOption, BkColours.Grey)" class="active-element"></span>{{ BkColours.Grey }}</p>
    </div>
    <div class="color-option">
      <span class="color-circle"><input type="color" v-model="customColor" @click="customColor = adjustColor(customColor, 1)" @change="updateBackgroundOption(BkColours.Custom, customColor)"/></span>
      <p><span v-if="showActive(backgroundOption, BkColours.Custom)" class="active-element"></span>{{ BkColours.Custom }}</p>
    </div>
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
  .bk-color-container {
    display: flex;
    justify-content: space-between;
  }

  .bk-color-container .color-circle {
    display: block;
    height: 40px;
    width: 40px;
    border-radius: 50px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
  }

  .bk-color-container p {
    text-align: center;
    margin-top: 5px;
    font-family: "Karla", sans-serif;
    font-weight: 500;
    color: #4c4d55;
    text-transform: uppercase;
    font-size: 12px;
  }

  .bk-color-container p .active-element {
    background: #0d6af7;
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50px;
    margin-left: -13px;
    margin-right: 5px;
    box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
  }

  .bk-color-container .color-option {
    cursor: pointer;
  }

  .bk-color-container .color-option:first-child .color-circle {
    background: #ffffff;
  }

  .bk-color-container .color-option:nth-child(2) .color-circle {
    background: #000000;
  }

  .bk-color-container .color-option:nth-child(3) .color-circle {
    background: #e5e5e5;
  }

  .bk-color-container .color-option:nth-child(4) .color-circle {
    background: linear-gradient(116.64deg, #0d6af7 11.9%, #8a4af3 68.06%);
  }

  .bk-color-container input {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    -webkit-appearance: none;
  }

  .bk-color-container input::-webkit-color-swatch-wrapper {
    padding: 0; 
  }

  .bk-color-container input::-webkit-color-swatch, .bk-color-container input::-moz-color-swatch {
    border: none;
    border-radius: 100%;
  }
</style>

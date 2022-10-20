<script setup lang="ts">
  import { useOptionsStore } from '@/stores/options'
  import { storeToRefs } from 'pinia'
  import { Themes } from "@/types"

  const optionsStore = useOptionsStore()
  const { themeOption } = storeToRefs(optionsStore)
  const { updateThemeOption } = optionsStore
</script>

<template>
  <h5>Choose Tile Theme</h5>
  <div class="tile-theme-container">
    <div class="theme-option" @click="updateThemeOption(Themes.NetMinded)">
      <div class="theme-option-netminded">
        <span class="tile-header"></span>
      </div>
      <p><span v-if="themeOption === Themes.NetMinded" class="active-element"></span>NetMinded</p>
    </div>
    <div class="theme-option" @click="updateThemeOption(Themes.PTI)">
      <div class="theme-option-pti">
        <span class="tile-header"></span>
      </div>
      <p><span v-if="themeOption === Themes.PTI" class="active-element"></span>PTI Digital</p>
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

.tile-theme-container {
  display: flex;
}

.tile-theme-container .theme-option {
  cursor: pointer;
}

.tile-theme-container .theme-option p {
  text-align: center;
  margin-top: 5px;
  font-family: "Karla", sans-serif;
  font-weight: 500;
  color: #4c4d55;
  text-transform: uppercase;
  font-size: 12px;
}

.tile-theme-container p .active-element {
  background: #0d6af7;
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50px;
  margin-left: -13px;
  margin-right: 5px;
  box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
}

.tile-theme-container .theme-option:nth-child(2) {
  margin-left: 40px;
}

.tile-theme-container .theme-option-netminded {
  background: #e9eff4;
  width: 100px;
  height: 60px;
  border-radius: 7px;
  box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
}

.tile-theme-container .theme-option-netminded .tile-header {
  display: block;
  height: 20px;
  background: linear-gradient(90deg, #77df81 0%, #4ea43d 100%);
  border-radius: 7px 7px 0 0;
}

.tile-theme-container .theme-option-pti {
  background: #3e3e3f;
  width: 100px;
  height: 60px;
  box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
}

.tile-theme-container .theme-option-pti .tile-header {
  display: block;
  height: 20px;
  background: linear-gradient(90deg, #77df81 0%, #4ea43d 100%);
}
</style>

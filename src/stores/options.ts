import { ref } from "vue";
import { defineStore } from "pinia";
import { BkColours, Themes } from "@/types"

export const useOptionsStore = defineStore("options", () => {
  const backgroundOption = ref(BkColours.White)
  const customBackgroundOption = ref('')
  const themeOption = ref(Themes.NetMinded)
  const updateBackgroundOption = (color: BkColours, customCol?: string) => {
    backgroundOption.value = color
    customCol ? customBackgroundOption.value = customCol : customBackgroundOption.value = ''
  }
  const updateThemeOption = (theme: Themes) => {
    themeOption.value = theme
  }

  return { backgroundOption, customBackgroundOption, themeOption, updateBackgroundOption, updateThemeOption }
})

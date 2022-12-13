<script setup lang="ts">
    import { ref } from "vue"
    import { DepStatusColors } from "@/types"
    import { storeToRefs } from 'pinia'
    import { useOptionsStore } from '@/stores/options'
    import { useDepsStore } from '@/stores/deps'
    import { isInArray } from "@/utilities/utils"

    const optionsStore = useOptionsStore()
    const { toggleSupportMsg } = storeToRefs(optionsStore)
    const depsStore = useDepsStore()
    const { depsList } = storeToRefs(depsStore)

    const props = defineProps<{
      index: number
    }>()

    const defaultSupportMsgs = {
      [DepStatusColors.Red]: '',
      [DepStatusColors.Amber]: '',
      [DepStatusColors.Green]: '',
      [DepStatusColors.Default]: ''
    }

    // If the dependency values exist in the local store update the value
    // const isInArray = (index: number) => {
    //   return typeof depsList.value[index] !== undefined ? true : false
    // }

    const setTitle = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].title : ""
    }

    const setStatusMsg = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].statusMsg : ""
    }

    const setStatusColor = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].statusColor : DepStatusColors.Green
    }

    const setExpanded = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].expanded : true
    }

    const setSupportMsgs = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].supportMsgs : defaultSupportMsgs
    }

    //Initialse the dependency values to either a default or what is in the store for persistence on refresh
    const title = ref(setTitle(props.index))
    const statusMsg = ref(setStatusMsg(props.index))
    const statusColor = ref(setStatusColor(props.index))
    const expanded = ref(setExpanded(props.index))
    const supportMsgs = ref(setSupportMsgs(props.index))
    const supportMsgRed = ref(supportMsgs.value.Red)
    const supportMsgAmber = ref(supportMsgs.value.Amber)
    const supportMsgGreen = ref(supportMsgs.value.Green)

    // Set the active status color status
    const showActive = (statusColor: DepStatusColors, color: DepStatusColors) => {
      return statusColor === color
    }
</script>

<template>
  <div class="dep-list-item">
    <div class="dep-list-item-header">
      <h6 class="dep-header-handle">{{ title }}</h6>
      <div class="dep-list-item-actions">
        <span>
          <font-awesome-icon v-if="expanded" icon="fa-solid fa-chevron-up" @click="expanded = !expanded" /> 
          <font-awesome-icon v-else icon="fa-solid fa-chevron-down" @click="expanded = !expanded" />
        </span>
      </div>
    </div>
    <div v-if="expanded" class="dep-list-item-body">
      <div class="status-color-container">
        <div class="color-option">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Green)" class="active-element"></span>{{ DepStatusColors.Green }}</p>
        </div>
        <div class="color-option">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Amber)" class="active-element"></span>{{ DepStatusColors.Amber }}</p>
        </div>
        <div class="color-option">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Red)" class="active-element"></span>{{ DepStatusColors.Red }}</p>
        </div>
        <div class="color-option">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Default)" class="active-element"></span>{{ DepStatusColors.Default }}</p>
        </div>
      </div>
      <input type="text" placeholder="Title" required v-model="title" disabled />
      <input name="depStatusMsg" type="text" placeholder="Status Message" required v-model="statusMsg" disabled />
      <div class="support-msg-input-container" v-if="toggleSupportMsg">
        <textarea row="1" type="text" placeholder="Green Status Support Message" v-model="supportMsgGreen" disabled ></textarea>
        <textarea row="1" type="text" placeholder="Amber Status Support Message" v-model="supportMsgAmber" disabled ></textarea>
        <textarea row="1" type="text" placeholder="Red Status Support Message" v-model="supportMsgRed" disabled ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dep-list-item {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #bfbfbf;
}
.status-color-container {
  display: flex;
  justify-content: space-between;
}
.dep-list-item-header {
  display: flex;
}

h6 {
  color: #4c4d55;
  font-family: "Poppins";
  font-weight: 800;
  font-size: 14px;
  flex-grow: 1;
}

.dep-list-item-header .dep-list-item-actions span:first-child {
  color: #4c4d55;
  padding: 20px 10px;
  cursor: pointer;
}

.dep-list-item-header .dep-list-item-actions span:last-child {
  color: #4c4d55;
  padding: 20px 0 20px 10px;
  cursor: pointer;
}

.dep-list-item-body input, .dep-list-item-body textarea {
  background: transparent;
  border: transparent;
  border-bottom: 3px solid #1b1a4b;
  border-radius: 0;
  color: #4c4d55;
  font-family: "Karla", sans-serif;
  font-size: 16px;
  padding: 10px 20px 10px 0;
  width: 100%;
}

.dep-list-item-body input:focus, .dep-list-item-body textarea:focus {
  box-shadow: none;
  outline: 0;
}

.dep-list-item-body input::placeholder, .dep-list-item-body textarea::placeholder {
  color: #0c0c0c;
}
.dep-list-item-body p {
  font-size: 14px;
  font-family: "Karla";
  text-align: right;
  margin-top: 10px;
}
.status-color-container {
  margin-top: 20px;
  margin-bottom: 15px;
}

.status-color-container .color-circle {
  display: block;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
}

.status-color-container p {
  text-align: center;
  margin-top: 5px;
  font-family: "Karla", sans-serif;
  font-weight: 500;
  color: #4c4d55;
  text-transform: uppercase;
  font-size: 12px;
}

.status-color-container p .active-element {
  background: #0d6af7;
  display: inline-block;
  height: 8px;
  width: 8px;
  border-radius: 50px;
  margin-left: -13px;
  margin-right: 5px;
  box-shadow: 0px 0px 14px rgba(33, 48, 79, 0.25);
}

.status-color-container .color-option:first-child .color-circle {
  background: linear-gradient(90deg, #77df81 0%, #4ea43d 100%);
}

.status-color-container .color-option:nth-child(2) .color-circle {
  background: linear-gradient(90deg, #ffb74d 0%, #f09103 100%);
}

.status-color-container .color-option:nth-child(3) .color-circle {
  background: linear-gradient(90deg, #f1673b 0%, #c84114 100%);
}

.status-color-container .color-option:nth-child(4) .color-circle {
  background: linear-gradient(90deg, #afb1c0 0%, #8f9fae 100%);
}

.support-msg-input-container {
  padding-top: 20px;
}
</style>

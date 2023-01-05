<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import { DepStatusColors } from "@/types"
    import { storeToRefs } from 'pinia'
    import { useOptionsStore } from '@/stores/options'
    import { useDepsStore } from '@/stores/deps'
    import { isInArray } from "@/utilities/utils"
    import Swal from 'sweetalert2'
    import  Quill from 'quill'
    import 'quill/dist/quill.snow.css'

    const optionsStore = useOptionsStore()
    const { toggleSupportMsg } = storeToRefs(optionsStore)
    const depsStore = useDepsStore()
    const { depsList, depItem } = storeToRefs(depsStore)
    const { updateDep, removeDep } = depsStore

    const props = defineProps<{
      index: number
    }>()

    const defaultSupportMsgs = {
      [DepStatusColors.Red]: '',
      [DepStatusColors.Amber]: '',
      [DepStatusColors.Green]: '',
      [DepStatusColors.Default]: ''
    }

    const defaultDepInfo = {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: ''
    }

    // If the dependency values exist in the local store update the value

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

    const setThirdPartyToggle = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].thirdPartyItem : false
    }

    const setDepInfo = (index: number) => {
      return isInArray(index, depsList.value) ? depsList.value[index].depInfo : defaultDepInfo
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
    const toggleThirdParty = ref(setThirdPartyToggle(props.index))
    const depInfo = ref(setDepInfo(props.index))

    // Update the dependency status color 
    const updateStatusColor = (color: DepStatusColors) => {
        statusColor.value = color
    }

    // Set the active status color status
    const showActive = (statusColor: DepStatusColors, color: DepStatusColors) => {
      return statusColor === color
    }

    // Check id a dependency item has been saved
    const isAdded = (index: number) => {
      return depItem.value(index).added
    }

    const updateSupport = (red: string, amber: string, green: string) => {
      supportMsgs.value = {
        Red: red,
        Amber: amber,
        Green: green,
        Grey: ''
      }
    }

    const openEditor = () => {
      let editor1: Quill, editor2: Quill, editor3: Quill, editor4: Quill, editor5: Quill
      Swal.fire({
        title: 'Diagnostic Item Info',
        html:
          '<h3>Item Purpose</h3>' +
          '<div class="q1Editor"></div>' +
          '<h3>Item Owner</h3>' +
          '<div class="q2Editor"></div>' +
          '<h3>Item Source</h3>' +
          '<div class="q3Editor"></div>' +
          '<h3>Item History</h3>' +
          '<div class="q4Editor"></div>' +
          '<h3>Item Notes</h3>' +
          '<div class="q5Editor"></div>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: () => {
          editor1 = new Quill('.q1Editor', {
            theme: 'snow',
            placeholder: 'What is the purpose of this item? Which stakeholder group or groups is it relevant to?'
          })
          if(depInfo.value.q1.length !== 0) editor1.setContents(JSON.parse(depInfo.value.q1))
          editor1.on('text-change', () => {
            depInfo.value.q1 = JSON.stringify(editor1.getContents())
          })
          editor2 = new Quill('.q2Editor', {
            theme: 'snow',
            placeholder: 'Who is the owner of this item? Who is the technical lead or point of contact for this item?'
          })
          if(depInfo.value.q2.length !== 0) editor2.setContents(JSON.parse(depInfo.value.q2))
          editor2.on('text-change', () => {
            depInfo.value.q2 = JSON.stringify(editor2.getContents())
          })
          editor3 = new Quill('.q3Editor', {
            theme: 'snow',
            placeholder: 'Where does this item come from? Are there any technical integrations, API\'s etc needed to utilise this item?'
          })
          if(depInfo.value.q3.length !== 0) editor3.setContents(JSON.parse(depInfo.value.q3))
          editor3.on('text-change', () => {
            depInfo.value.q3 = JSON.stringify(editor3.getContents())
          })
          editor4 = new Quill('.q4Editor', {
            theme: 'snow',
            placeholder: 'What is the latest version of this item? Have there been previous versions or revisions?'
          })
          if(depInfo.value.q4.length !== 0) editor4.setContents(JSON.parse(depInfo.value.q4))
          editor4.on('text-change', () => {
            depInfo.value.q4 = JSON.stringify(editor4.getContents())
          })
          editor5 = new Quill('.q5Editor', {
            theme: 'snow',
            placeholder: 'Any other information relevant to this item...'
          })
          if(depInfo.value.q5.length !== 0) editor5.setContents(JSON.parse(depInfo.value.q5))
          editor5.on('text-change', () => {
            depInfo.value.q5 = JSON.stringify(editor5.getContents())
          })
        }
      })
    }
</script>

<template>
  <div class="dep-list-item">
    <div class="dep-list-item-header">
      <h6 class="dep-header-handle"><font-awesome-icon icon="fa-solid fa-grip-lines" />{{ title }}</h6>
      <div class="dep-list-item-actions">
        <span>
          <font-awesome-icon v-if="expanded" icon="fa-solid fa-chevron-up" @click="expanded = !expanded" /> 
          <font-awesome-icon v-else icon="fa-solid fa-chevron-down" @click="expanded = !expanded" />
        </span>
        <span><font-awesome-icon icon="fa-regular fa-trash-can" @click="removeDep(index)" /></span>
      </div>
    </div>
    <div v-if="expanded" class="dep-list-item-body">
      <div class="status-color-container">
        <div class="color-option" @click="updateStatusColor(DepStatusColors.Green)">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Green)" class="active-element"></span>{{ DepStatusColors.Green }}</p>
        </div>
        <div class="color-option" @click="updateStatusColor(DepStatusColors.Amber)">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Amber)" class="active-element"></span>{{ DepStatusColors.Amber }}</p>
        </div>
        <div class="color-option" @click="updateStatusColor(DepStatusColors.Red)">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Red)" class="active-element"></span>{{ DepStatusColors.Red }}</p>
        </div>
        <div class="color-option" @click="updateStatusColor(DepStatusColors.Default)">
          <span class="color-circle"></span>
          <p><span v-if="showActive(statusColor, DepStatusColors.Default)" class="active-element"></span>{{ DepStatusColors.Default }}</p>
        </div>
      </div>
      <input type="text" placeholder="Title" required v-model="title" />
      <input class="dep-status-input" name="depStatusMsg" type="text" placeholder="Status Message" required v-model="statusMsg" />
      <p class="char-text">{{ 60 - statusMsg.length }}/60</p>
      <div class="dep-actions">
        <button class="btn btn-secondary" @click="openEditor">
          <font-awesome-icon icon="fa-regular fa-file-lines"/>Manage Info
        </button>
      </div>
      <div class="support-msg-input-container" v-if="toggleSupportMsg">
        <textarea row="1" type="text" placeholder="Green Status Support Message" v-model="supportMsgGreen"></textarea>
        <textarea row="1" type="text" placeholder="Amber Status Support Message" v-model="supportMsgAmber"></textarea>
        <textarea row="1" type="text" placeholder="Red Status Support Message" v-model="supportMsgRed"></textarea>
      </div>
      <div class="btn-container">
        <div class="third-party-container">
          <p class="third-party-text"><font-awesome-icon icon="fa-regular fa-share-from-square" /> Partner Service</p>
          <label class="switch">
              <input type="checkbox" :checked="toggleThirdParty" @click="toggleThirdParty = !toggleThirdParty">
              <span class="slider round"></span>
          </label>
        </div>
        <button
          type="button"
          class="btn"
          :disabled="statusMsg.length > 60 || title.length <= 0"
          @click="expanded = !expanded, updateSupport(supportMsgRed, supportMsgAmber, supportMsgGreen), 
          updateDep(index, title, statusMsg, statusColor, true, expanded, supportMsgs, false, toggleThirdParty, depInfo)"
          >
          {{ isAdded(index) ? 'Update' : 'Add'}}
        </button>
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
  cursor: move;
}

.dep-list-item-header .fa-grip-lines {
  padding-right: 8px;
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
.dep-status-input {
  padding-right: 50px !important;
}

.dep-list-item-body .char-text {
  font-size: 14px;
  font-family: "Karla";
  color: #4c4d55;
  text-align: right;
  margin-left: auto;
  margin-top: -32px;
  width: 50px;
  padding-left: 5px;
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

.status-color-container .color-option {
  cursor: pointer;
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

.third-party-text {
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Karla", sans-serif;
  font-weight: 500;
  color: #4c4d55;
  text-transform: uppercase;
  font-size: 12px;
}

.fa-share-from-square {
  font-size: 16px;
  margin-right: 5px;
  transform: scaleX(-1);
}

.switch {
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 48px;
  height: 22px;
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
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 2px;
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
  -webkit-transform: translateX(21px);
  -ms-transform: translateX(21px);
  transform: translateX(21px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 34px;
}

.support-msg-input-container {
  padding-top: 20px;
}

.btn-container {
  display: flex;
  justify-content: space-between;
}

.third-party-container {
  position: relative;
  top: 8px;
}

.btn {
  background: #0d6af6;
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
  margin-top: 20px;
  cursor: pointer;
}

.btn:hover {
  background: #0c54c0;
}

.btn:disabled {
  background: #4c4d55;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  border: 0 solid transparent;
  color: #0d6af6;
  padding: 10px 0;
  border-radius: 0;
  box-shadow: none;
}

.btn-secondary:hover {
  background: transparent;
  color: #0c54c0;
}

.fa-file-lines {
  margin-right: 5px;
}
</style>

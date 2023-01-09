<script setup lang="ts">
    import { ref } from "vue"
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

    const setDescription = (index: number) => {
      return isInArray(index, depsList.value) && depsList.value[index].description ? depsList.value[index].description : ""
    }

    const setCreatedBy = (index: number) => {
      return isInArray(index, depsList.value) && depsList.value[index].createdBy ? depsList.value[index].createdBy : ""
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
      return isInArray(index, depsList.value) && depsList.value[index].depInfo ? depsList.value[index].depInfo : defaultDepInfo
    }

    //Initialse the dependency values to either a default or what is in the store for persistence on refresh
    const title = ref(setTitle(props.index))
    const description = ref(setDescription(props.index))
    const createdBy = ref(setCreatedBy(props.index))
    const statusMsg = ref(setStatusMsg(props.index))
    const statusColor = ref(setStatusColor(props.index))
    const expanded = ref(setExpanded(props.index))
    const supportMsgs = ref(setSupportMsgs(props.index))
    const supportMsgRed = ref(supportMsgs.value.Red)
    const supportMsgAmber = ref(supportMsgs.value.Amber)
    const supportMsgGreen = ref(supportMsgs.value.Green)
    const toggleThirdParty = ref(setThirdPartyToggle(props.index))
    const depInfo = ref(setDepInfo(props.index))

    // Set the active status color status
    const showActive = (statusColor: DepStatusColors, color: DepStatusColors) => {
      return statusColor === color
    }

    const openEditor = () => {
      let editor1: Quill, editor2: Quill, editor3: Quill, editor4: Quill, editor5: Quill
      Swal.fire({
        title: `Diagnostic Item Info${title.value.length > 0 && `: ${title.value}`}`,
        html:
          '<h3>Item Purpose</h3>' +
          '<div class="q1Editor"></div><br/>' +
          '<h3>Item Owner</h3>' +
          '<div class="q2Editor"></div><br/>' +
          '<h3>Item Source</h3>' +
          '<div class="q3Editor"></div><br/>' +
          '<h3>Item History</h3>' +
          '<div class="q4Editor"></div><br/>' +
          '<h3>Item Notes</h3>' +
          '<div class="q5Editor"></div><br/>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: () => {
          editor1 = new Quill('.q1Editor', {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            },
            placeholder: 'What is the purpose of this item? Which stakeholder group or groups is it relevant to?'
          })
          if(depInfo.value && depInfo.value.q1.length !== 0) editor1.setContents(JSON.parse(depInfo.value.q1))
          editor2 = new Quill('.q2Editor', {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            },
            placeholder: 'Who is the owner of this item? Who is the technical lead or point of contact for this item?'
          })
          if(depInfo.value && depInfo.value.q2.length !== 0) editor2.setContents(JSON.parse(depInfo.value.q2))
          editor3 = new Quill('.q3Editor', {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            },
            placeholder: 'Where does this item come from? Are there any technical integrations, API\'s etc needed to utilise this item?'
          })
          if(depInfo.value && depInfo.value.q3.length !== 0) editor3.setContents(JSON.parse(depInfo.value.q3))
          editor4 = new Quill('.q4Editor', {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            },
            placeholder: 'What is the latest version of this item? Have there been previous versions or revisions?'
          })
          if(depInfo.value && depInfo.value.q4.length !== 0) editor4.setContents(JSON.parse(depInfo.value.q4))
          editor5 = new Quill('.q5Editor', {
            theme: 'snow',
            readOnly: true,
            modules: {
                toolbar: false
            },
            placeholder: 'Any other information relevant to this item...'
          })
          if(depInfo.value && depInfo.value.q5.length !== 0) editor5.setContents(JSON.parse(depInfo.value.q5))
        }
      })
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
      <input type="text" placeholder="Title" v-model="title" disabled />
      <input class="dep-created-by-input" name="depCreatedBy" type="text" placeholder="Created By" v-model="createdBy" disabled />
      <input class="dep-description-input" name="depDescription" type="text" placeholder="Description" v-model="description" disabled />
      <input name="depStatusMsg" type="text" placeholder="Status Message" v-model="statusMsg" disabled />
      <div class="dep-actions">
        <button class="btn btn-secondary" @click="openEditor">
          <font-awesome-icon icon="fa-regular fa-file-lines"/>Manage Info
        </button>
      </div>
      <div class="support-msg-input-container" v-if="toggleSupportMsg">
        <textarea row="1" type="text" placeholder="Green Status Support Message" v-model="supportMsgGreen" disabled ></textarea>
        <textarea row="1" type="text" placeholder="Amber Status Support Message" v-model="supportMsgAmber" disabled ></textarea>
        <textarea row="1" type="text" placeholder="Red Status Support Message" v-model="supportMsgRed" disabled ></textarea>
      </div>
      <div v-if="toggleThirdParty" class="third-party-container">
          <p class="third-party-text"><font-awesome-icon icon="fa-regular fa-share-from-square" /> Partner Service</p>
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

.third-party-container {
  margin-top: 20px;
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

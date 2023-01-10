<script setup lang="ts">
  import DepsPanel from "../components/DepsPanel.vue"
  import ConfigPanel from "../components/ConfigPanel.vue"
  import { storeToRefs } from 'pinia'
  import { useDepsStore } from '@/stores/deps'
  import { useRoute } from 'vue-router'

  const depsStore = useDepsStore()
  const { addedDepsList, allDepsList } = storeToRefs(depsStore)
  const { updateDepsList, updateDepName } = depsStore

  const router = useRoute()
  let chainId = router.params.id
  if (chainId) {
    const depItem = allDepsList.value.filter(dep => dep.chainId === chainId)
    updateDepsList(depItem[0].chain)
    updateDepName(depItem[0].chainName)
  } else {
    updateDepsList([])
    updateDepName('')
  }
</script>

<template>
  <main>
    <div class="dashboard-container">
      <DepsPanel :depList="addedDepsList" :showScreenCaptureBtn="true" :isThumbnailPreview="false" />
      <ConfigPanel :chainId="chainId" />
    </div>
  </main>
</template>

<style scoped>
  main {
    height: calc(100vh - 115px);
  }

  @media screen and (max-width: 950px) {
    main {
      height: auto;
    }
  }

  .dashboard-container {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  @media screen and (max-width: 950px) {
    .dashboard-container {
      flex-direction: column;
    }
  }
</style>

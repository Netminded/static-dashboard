<script setup lang="ts">
  import DepsPanel from "../components/DepsPanel.vue"
  import ConfigPanel from "../components/ConfigPanel.vue"
</script>

<template>
  <main>
    <div class="dashboard-container">
      <DepsPanel />
      <ConfigPanel />
    </div>
  </main>
</template>

<style scoped>
  main {
    height: calc(100vh - 135px);
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

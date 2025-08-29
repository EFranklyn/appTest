<script setup lang="ts">


</script>

<template>
  <q-layout view="hHh lpR fFf">
    <!-- TAB fixada no topo como header -->
    <q-header elevated class="bg-teal text-yellow">
      <q-tabs
          align="left"
          dense
          class="shadow-2"
          active-color="white"
          indicator-color="yellow"
      >
        <q-route-tab name="tables" label="Tables" to="/intents/tables/" />
      </q-tabs>
    </q-header>

    <!-- O resto da tela é do conteúdo das rotas -->
    <q-page-container class="wm">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.wm {
  min-width: 100%;
}
</style>

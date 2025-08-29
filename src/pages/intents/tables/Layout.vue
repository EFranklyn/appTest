<script setup lang="ts">


</script>

<template>
  <q-page class="column fit wm ">
    <q-header elevated >
      <q-tabs
          dense
          class="text-white"
          align="left"
          active-color="negative"
          indicator-color="negative"
      >
        <q-route-tab name="intent1" label="Intent 1" to="/intents/tables/intent1" />
        <q-route-tab name="intent2" label="Intent 2" to="/intents/tables/intent2" />
        <q-route-tab name="intent3" label="Intent 3" to="/intents/tables/intent3" />
        <q-route-tab name="intent4" label="Intent 4" to="/intents/tables/intent4" />
      </q-tabs>
    </q-header>

    <div class="q-pa-md fit wm">
      <router-view />
    </div>
  </q-page>
</template>

<style scoped>
.margin {
  margin-bottom: 3rem;
}
.wm {
  min-width: 100%;
}

</style>
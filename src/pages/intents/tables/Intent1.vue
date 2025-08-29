<script setup lang="ts">
import VueDraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import {computed, ref} from "vue";
import TableOne from "./components/TableOne.vue";
import {TablePOS} from "./types.ts";
import {mockTables} from "./constants.ts";

const dragConfig = ref({
  newLayout: false,
  editPosition: false,
  resize: false
});

const zoom = ref(1.0);

const zoomStyle = computed(() => ({
  transform: `scale(${zoom.value})`,
  transformOrigin: 'top left'
}));

const _tables = ref<TablePOS[]>(mockTables);
const dragContainer = ref<HTMLElement | null>(null);

const onEditSave = () => {
  const isEdit = dragConfig.value.editPosition;

  if (isEdit) {
    dragConfig.value.editPosition = false;
    dragConfig.value.resize = false;
    alert('your display settings have been saved');

  } else {
    dragConfig.value.editPosition = true;
    dragConfig.value.resize = true;

  }

};

const updatePosition = (id: number, position) => {
  const table = _tables.value.find(t => t.id === id);

  console.log(position);
  if (table) {
    table.table.x = position.x;
    table.table.y = position.y;
  }

}
console.log(_tables.value);

const sizerForRetangle = (table:any) =>{
  if(table.shape === 'rectangle'){
    return table.height + 70
  }else{
    return table.height
  }
}

</script>
<template>
  <q-page class="q-pa-md  main-layout column items-center justify-start" style="min-height: 100vh;">
    <q-card class="q-mt-xl full-width full card-custom" >
      <q-card-section class="text-h6 text-primary">
        <b>List tables</b>
        <q-btn
            color="positive"
            :label="dragConfig.editPosition ? 'save view': 'Edit view'"
            @click="onEditSave"
        />
        <q-btn-group class="q-mb-md">
          <q-btn icon="remove" @click="zoom = Math.max(0.2, zoom - 0.1)" />
          <q-btn icon="add" @click="zoom = Math.min(3, zoom + 0.1)" />
        </q-btn-group>
        <span>{{ Math.round(zoom * 100) }}%</span>

      </q-card-section>

      <q-card-section>
        <div
            class="drag-container"
            ref="dragContainer"
        >
          <vue-draggable-resizable
              :style="zoomStyle"
              v-for="table in _tables"
              :key="table.table.id"
              :x="table.table.x"
              :y="table.table.y"
              :minW="140"
              :minH="140"
              :w="sizerForRetangle(table.table)"
              :h="table.table.height"
              :parent="true"
              :bounds="dragContainer"
              :draggable="dragConfig.editPosition"
              :resizable="dragConfig.editPosition"
              @resize-end="console.log('22')"
              @drag-end="(position) => updatePosition(table.table.id, position)"
          >
            <TableOne :table="table" :isEditing="dragConfig.editPosition"/>
          </vue-draggable-resizable>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<style scoped>
 .full {
   width: 100%;
 }

 .drag-container {
   width: 100%;
   height: 100%;
   overflow: hidden;
   min-height: 600px;
   position: relative;


 }
</style>
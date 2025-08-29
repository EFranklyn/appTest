<script setup lang="ts">
import VueDraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import {computed, ref} from "vue";
import TableOne from "./components/TableOne.vue";
import {Table, TablePOS} from "./types.ts";
import {mockTables, mocTables2} from "./constants.ts";
import TableCompact from "./components/TableCompact.vue";
import CreateEditTableDialog from "./components/CreateEditTableDialog.vue";
import TableTwo from "./components/TableTwo.vue";



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

const _tables = ref<Table[]>(mocTables2);
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

const updatePosition = (id: string, position) => {
  const table = _tables.value.find(t => t.id === id);

  console.log(position);
  if (table) {
    table.x = position.x;
    table.y = position.y;
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

const showCreateDialog = ref(false)
const tables = ref<Table[]>([])

function handleTableCreated(newTable: Table) {
  console.log('new table', newTable)
  _tables.value.push(newTable)

  console.log(newTable)
}
const createTable = () => {
  if(!showCreateDialog.value){
    showCreateDialog.value = true
  }
}

</script>
<template>
  <CreateEditTableDialog v-model="showCreateDialog" @submit="handleTableCreated" />
  <q-page class="q-pa-md  main-layout column items-center justify-start" style="min-height: 100vh;">
    <q-card class="q-mt-xl full-width full card-custom" >
      <q-card-section class="text-h6 text-primary header">
        <div class="space">
        <b>List tables</b>
        <q-btn
          color="positive"
          :label="dragConfig.editPosition ? 'save view': 'Edit view'"
          @click="onEditSave"
        />
        </div>
        <div class="space">
        <q-btn-group class="q-mb-md">
          <q-btn icon="remove" @click="zoom = Math.max(0.2, zoom - 0.1)" />
          <q-btn icon="add" @click="zoom = Math.min(3, zoom + 0.1)" />
        </q-btn-group>
        <span>{{ Math.round(zoom * 100) }}%</span>
          <div>
          <q-btn
              color="positive"
              label="add table"
              @click="createTable"
          />
          </div>
        </div>

      </q-card-section>

      <q-card-section>
        <div
            class="drag-container"
            ref="dragContainer"
            :style="zoomStyle"
        >
          <vue-draggable-resizable
              v-for="table in _tables"
              :key="table.id"
              :x="table.x"
              :y="table.y"
              :minW="140"
              :minH="140"
              :w="sizerForRetangle(table)"
              :h="table.height"
              :parent="true"
              :bounds="dragContainer"
              :draggable="dragConfig.editPosition"
              :resizable="dragConfig.editPosition"
              @resize-end="console.log('22')"
              @drag-end="(position) => updatePosition(table.id, position)"
          >

            <TableTwo :table="table" :isEditing="dragConfig.editPosition"
                      @update:table="(t) => table = t" />

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

.space {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  justify-items: baseline;
  gap: 0.5rem

}

.header {
  display: flex;
  justify-content: space-between;
}
</style>
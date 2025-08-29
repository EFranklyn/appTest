<script setup lang="ts">

import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import {computed, nextTick, onMounted, ref} from "vue";

import {Table} from "./types.ts";
import {mocTables3} from "./constants.ts";

import CreateEditTableDialog from "./components/CreateEditTableDialog.vue";
import TableTwo from "./components/TableTwo.vue";
import {GridStack} from "gridstack";

const dragConfig = ref({
  newLayout: false,
  editPosition: true,
  resize: false
});

const zoom = ref(1.0);

const gridRef = ref<HTMLElement | null>(null)

let grid: GridStack

const zoomStyle = computed(() => ({
  transform: `scale(${zoom.value})`,
  transformOrigin: 'top left',
  minWidth: `${200 * zoom.value}%`,
  minHeight: `${200 * zoom.value}%`// simula o grid sendo “mais largo” ao reduzir zoom
}))

// const zoomStyle = computed(() => ({
//   width: `${zoom.value * 100}%`,
//   height: `${zoom.value * 100}%`
// }));

const _tables = ref<Table[]>(mocTables3);

const onEditSave = () => {
  const isEdit = dragConfig.value.editPosition;

  if (isEdit) {
    dragConfig.value.editPosition = false;
    dragConfig.value.resize = false;
    alert('your display settings have been saved');
    initGrid()
    grid.commit()
    grid.disable()

  } else {
    dragConfig.value.editPosition = true;
    dragConfig.value.resize = true;
    grid.enable()

  }

};

const zoomOut = () =>{
  zoom.value = Math.max(0.2, zoom.value - 0.1)
  console.log(grid.cellWidth())
  // grid.column(grid.getColumn() + 1)

  console.log(grid.getColumn())
}

const zoomIn = () =>{
  zoom.value = Math.min(3, zoom.value + 0.1)
  // grid.column(grid.getColumn() - 1)
}


console.log(_tables.value);

const showCreateDialog = ref(false)
const tables = ref<Table[]>([])

function handleTableCreated(newTable: Table) {
  console.log('new table', newTable)
  _tables.value.push(newTable)

  nextTick(() => {
    const el = gridRef.value?.querySelector(`[gs-id="${newTable.id}"]`)
    if (el) {
      grid.makeWidget(el as HTMLElement)
    }
  })

  console.log(newTable)
}
const createTable = () => {
  if(!showCreateDialog.value){
    showCreateDialog.value = true
  }
}



const initGrid = () => {
  grid = GridStack.init({ cellHeight: 100,  column:24, float: true }, gridRef.value!)

  if (!dragConfig.value.editPosition) grid.disable()

  grid.on('change', (_, items) => {
    items.forEach(item => {
      const t = tables.value.find(t => t.id === item.el.getAttribute('gs-id'))
      if (t) {
        t.x = item.x
        t.y = item.y
        t.width = item.w
        t.height = item.h
      }
      console.log(item)
    })
  })
}


onMounted(() => {
  initGrid()
})

const updateTable = (id: string, newData: Table) => {
  const t = tables.value.find(t => t.id === id)
  if (t) Object.assign(t, newData)
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
            <q-btn icon="remove" @click="zoomOut" />
            <q-btn icon="add" @click="zoomIn" />
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
        <div class="zoom-wrapper">
          <!-- aplica zoom visual apenas aumentando o espaço -->
          <div ref="gridRef" class="grid-stack" :style="zoomStyle">
            <div
                class="grid-stack-item"
                v-for="table in _tables"
                :key="table.id"
                :gs-id="table.id"
                :gs-x="table.x"
                :gs-y="table.y"
                :gs-w="table.width"
                :gs-h="table.height"
            >
              <div class="grid-stack-item-content">
                <TableTwo :table="table" :isEditing="dragConfig.editPosition" @update:table="updateTable(table.id, $event)" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<style scoped>
.full {
  width: 100%;
}

.zoom-wrapper {
  width: 100%;
  min-height: 600px; /* ou 100vh ou auto com min-height */
  overflow: auto;
  background: #121212;
}

.grid-stack {
  min-width: 200%;
  min-height: 200%;
  position: relative;
}

.grid-stack-item-content {
  overflow: hidden !important;
  background: #1e1e1e;
  padding: 0.5rem;
  border-radius: 8px;
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
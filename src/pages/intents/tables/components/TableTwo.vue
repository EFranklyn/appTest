
<script setup lang="ts">
import {CSSProperties, computed, ref} from 'vue'
import {Table, } from '../types.ts'
import CreateEditTableDialog from "./CreateEditTableDialog.vue";
import ManagerTable from "./ManagerTable.vue";
import { DateTime } from 'luxon'

interface Props {
  table: Table
  isEditing: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:table', payload: Table): void
}>()

const viewDialog = ref(false)

const openViewDialog = () => viewDialog.value = true

const markForCleaning = () => {
  console.log('Marcar mesa como em limpeza')
}

const getTableStyle = (table: Table): CSSProperties => {
  return {
    color: table.fontColor,
    background: `linear-gradient(to bottom, ${table.bgColor1}, ${table.bgColor2})`,
  }
}

const shapeClass = computed(() => {
  return `shape-${props.table.shape || 'rectangle'}`
})


const minutesOpen = computed(() => {
  if (!props.table.openedAt) return null
  const opened = new Date(props.table.openedAt)
  const now = new Date()
  const diff = Math.floor((now.getTime() - opened.getTime()) / 60000)
  return diff
})




const pendingItems = computed(() => {
  const items = props.table.order?.items.filter(item => item.status !== 'served')

  return items?.length || 0

})
const totalItems = computed(() => {
  const items = props.table.order?.items
  return items?.length || 0

})


const editTableDialog = ref(false)
const viewTableState = ref(false)

const editTable = () => {
  if (!editTableDialog.value) {
    editTableDialog.value = true
  }
}
function handleTableEdited(editedTable: Table) {
  console.log('Table edited', editedTable)

  emit('update:table', editedTable)

  console.log(editedTable)
}
const viewTable = () =>{
  if (!viewTableState.value && !props.isEditing ) {
    viewTableState.value = true
  }
}

const formatTime = (iso: string) => {
  return DateTime.fromISO(iso).toFormat('HH:mm')
}

const minutesSince = (iso: string) => {
  const now = DateTime.now()
  const time = DateTime.fromISO(iso)
  const diff = now.diff(time, 'minutes').toObject().minutes ?? 0
  return Math.floor(diff)
}

</script>
<template>
  <CreateEditTableDialog v-model="editTableDialog" @submit="handleTableEdited"
  :table="props.table"
  />

  <div
      class="table-box"
      :style="getTableStyle(props.table)"
      :class="shapeClass"
      @click="viewTable"
  >
    <div class="table-header">
      <div class="table-number">#{{ props.table.number }} {{props.table.name}} </div>
      <q-btn
          style="z-index: 1;"
          v-if="!props.isEditing"
          @click.stop
          dense round flat icon="more_vert" size="xs" class="menu-btn">
        <q-menu class="bg-dark">
          <q-list style="min-width: 150px">
            <q-item clickable @click.stop="editTable">
              <q-item-section>Edit</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="table-info">
      <div class="info-item">
        <i class="material-icons">people</i>
        {{ props.table.seatsOccupied }} / {{ props.table.seats }} seats
      </div>

      <div v-if="pendingItems || totalItems" class="info-item">
        Items:  {{pendingItems}} Pending - {{totalItems}} Total
      </div>
<!--      <div v-if="totalItems" class="info-item">-->
<!--        Total items {{totalItems}}-->
<!--      </div>-->

      <div v-if="minutesOpen !== null" class="info-item">
        <i class="material-icons">schedule</i>
          Occupation time: {{ formatTime(props.table?.openedAt) }}  {{ minutesOpen }}min
      </div>
      <div v-if="props.table.order?.lastOrderTime" class="info-item">
        Last requested:
         {{ minutesSince(props.table.order.lastOrderTime) }} min
      </div>
      <div v-if="props.table.order?.totalOrder && !props.table.order.isPaid" class="info-item">
        Total:
        ${{ props.table.order?.totalOrder }}
      </div>

      <div v-if="props.table.order?.isPaid" class="info-item ">
        <div class="status-badge">
          PAID
        </div>
      </div>

      <div v-if="props.table.isOccupied && !props.table.isCleaning" class="status-badge">
        Occupied
      </div>
      <div v-else-if="props.table.isOccupied && props.table.isCleaning" class="status-badge">
        Awaiting cleaning
      </div>
      <div v-else class="status-badge">
        available
      </div>
    </div>
  </div>

  <ManagerTable
      v-if="viewTableState"
      v-model="viewTableState"
      :table="props.table"
  />
</template>

<style scoped lang="scss">
.table-box {
  width: 100%;
  height: 100%;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.75rem;
  position: relative;
  color: #fff;
}


.shape-rectangle {

  border-radius: 10px;
}
.shape-square {
  border-radius: 4px;
}
.shape-circle {
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  padding: 19px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 0.85rem;
}

.menu-btn {
  color: inherit;
}

.table-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: flex-start;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  opacity: 0.9;
}

.status-badge {
  font-size: 0.65rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 3px;
  width: fit-content;
  text-transform: uppercase;
  font-weight: bold;
}

.group-label {
  font-size: 0.65rem;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 2px 4px;
  border-radius: 3px;
  width: fit-content;
}
</style>
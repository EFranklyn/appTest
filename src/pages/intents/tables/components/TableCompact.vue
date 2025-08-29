
<script setup lang="ts">
import {CSSProperties, computed, ref} from 'vue'
import { TablePOS } from '../types.ts'

interface Props {
  table: TablePOS
  isEditing: boolean
}

const props = defineProps<Props>()

const viewDialog = ref(false)
const editDialog = ref(false)

const openViewDialog = () => viewDialog.value = true
const openEditDialog = () => editDialog.value = true
const markForCleaning = () => {
  console.log('Marcar mesa como em limpeza')
  // lógica futura
}

const getTableStyle = (table: TablePOS['table']): CSSProperties => {
  return {
    color: table.fontColor,
    background: `linear-gradient(to bottom, ${table.bgColor1}, ${table.bgColor2})`,
  }
}

const shapeClass = computed(() => {
  return `shape-${props.table.table.shape || 'rectangle'}`
})


const minutesOpen = computed(() => {
  if (!props.table.openedAt) return null
  const opened = new Date(props.table.openedAt)
  const now = new Date()
  const diff = Math.floor((now.getTime() - opened.getTime()) / 60000)
  return diff
})


const seatsOccupied = computed(() => {
  if (!props.table.isOccupied) return 0
  return Math.min(props.table.table.seats ?? 0, Math.floor(Math.random() * (props.table.table.seats || 1)) + 1)
})
</script>

<template>
  <div
      class="table-box"
      :style="getTableStyle(props.table.table)"
      :class="shapeClass"
  >
    <div class="table-header">
      <div class="table-number">#{{ props.table.table.number }} {{props.table.table.name}} </div>
      <q-btn
          v-if="!props.isEditing"
          dense round flat icon="more_vert" size="xs" class="menu-btn">
        <q-menu class="bg-dark">
          <q-list style="min-width: 150px">
            <q-item clickable @click="openViewDialog">
              <q-item-section>Details</q-item-section>
            </q-item>
            <q-item clickable @click="openEditDialog">
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item clickable @click="markForCleaning">
              <q-item-section>Send to clear</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="table-info">
      <div class="info-item">
        <i class="material-icons">people</i>
        {{ seatsOccupied }} / {{ props.table.table.seats }} seats
      </div>

      <div v-if="minutesOpen !== null" class="info-item">
        <i class="material-icons">schedule</i>
        Open {{ minutesOpen }} min
      </div>

      <div v-if="props.table.totalOrderValue" class="info-item">
        <i class="material-icons">attach_money</i>
        R$ {{ props.table.totalOrderValue.toFixed(2) }}
      </div>

      <div v-if="props.table.status" class="status-badge">
        {{ props.table.status.toUpperCase() }} {{ `${props.table.groupId? 'G#'+ props.table.groupId: ''}` }}
      </div>
    </div>
  </div>
  <q-dialog v-model="viewDialog">
    <q-card class="card-custom" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">table details</div>
      </q-card-section>
      <q-card-section>
        <div><strong>Table:</strong> {{ props.table.table.name }}</div>
        <div><strong>Waiter:</strong> {{ props.table.waiterName }}</div>
        <div><strong>Status:</strong> {{ props.table.status }}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
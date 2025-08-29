<script setup lang="ts">
import { ref } from 'vue'
import { Table } from '../types'

const emit = defineEmits<{
  (e: 'submit', payload: Table): void
}>()

interface Props {
  table?: Table
  isEditing?: boolean
}

const props = defineProps<Props>()

const isOpen = defineModel<boolean>()

const generateRandomId=()=>{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const newTable = ref<Table>({
  id: '',
  name: '',
  x: 0,
  y: 0,
  number: 1,
  shape: 'rectangle',
  width: 2,
  height: 2,
  status: 'open',
  bgColor1: '#2196F3',
  bgColor2: '#1565C0',
  fontColor: '#FFFFFF',
  seats: 5,
  seatsOccupied: 0
})

const table = ref<Table>(props.table! || newTable)

function submit() {
  if (!props.isEditing) {
    table.value.id = generateRandomId()
  }

  emit('submit', { ...table.value })
  isOpen.value = false
}
</script>

<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 700px; min-height: 300px" dark>
      <q-card-section class="text-h6">New Table</q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <q-input v-model.number="table.number" label="Table Number" dense dark class="col"/>
          <q-input v-model="table.name" label="Name" dense dark class="col" />
          <q-input v-model="table.seats" label="Seats" dense dark class="col" />
        </div>

        <q-select
            class="m-tp"
            v-model="table.shape"
            :options="['rectangle', 'circle', 'square']"
            label="Format Table"
            dense dark
        />

        <div class="row q-col-gutter-sm m-tp gp">
          <input v-model="table.fontColor" label="Font color" type="color"  dark class="col" />
          <input v-model="table.bgColor1" label="Back ground color 1" type="color"  dark class="col" />
          <input v-model="table.bgColor2" label="Back ground color 2" type="color"  dark class="col" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="white" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
 .column {
   display: flex;
   flex-direction: row;

 }

 .m-tp {
   margin-top: 10px;
 }

 .gp {
   gap: 10px;
 }

</style>
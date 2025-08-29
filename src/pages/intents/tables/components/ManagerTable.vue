<script setup lang="ts">
import {Order, Table} from "../types.ts";
import {computed, CSSProperties, ref} from "vue";
import { DateTime } from 'luxon'
import AddProductDialog from "./AddProductDialog.vue";

interface Props {
  table: Table

}

const emit = defineEmits<{
  (e: 'update:table', payload: Table): void
}>()


const props = defineProps<Props>()
const isOpen = defineModel<boolean>()

const openedAtFormatted = computed(() => {
  if (!props.table.openedAt) return '—'
  return DateTime.fromISO(props.table.openedAt).toFormat('HH:mm')
})

const minutesOpen = computed(() => {
  if (!props.table.openedAt) return null
  const opened = DateTime.fromISO(props.table.openedAt)
  const now = DateTime.now()
  const diff = now.diff(opened, 'minutes').toObject().minutes ?? 0
  return Math.floor(diff)
})

const items = computed(() => {
  return props.table?.order?.items || []
})

const getTableStyle = (table: Table): CSSProperties => {
  return {
    color: table.fontColor,
    background: `linear-gradient(to bottom, ${table.bgColor1}, ${table.bgColor2})`,
  }
}

const save = ()=> {
  console.log('Table edited', props.table)

  emit('update:table', props.table)
}

const occupyTable = () => {
  props.table.seatsOccupied = 0
  props.table.isOccupied = true
  props.table.openedAt = DateTime.now().toISO()
  save()

}

const incrementDecrementSeats = (action: 'increment' | 'decrement') => {
  if (action === 'increment') {
    props.table.seatsOccupied++
  }else{
    if (props.table.seatsOccupied === 0) return
    props.table.seatsOccupied--
  }
  save()
}

const showAddProduct = ref(false)

const formatTime = (iso: string) => {
  return DateTime.fromISO(iso).toFormat('HH:mm')
}

const minutesSince = (iso: string) => {
  const now = DateTime.now()
  const time = DateTime.fromISO(iso)
  const diff = now.diff(time, 'minutes').toObject().minutes ?? 0
  return Math.floor(diff)
}

const toggleItemStatus = (itemIndex: number) => {
  const item = props.table.order?.items[itemIndex]
  if (!item) return
  item.status = 'served'
  item.servedAt = DateTime.now().toISO()
  save()
}

const showReleaseDialog = ref(false)

const payOrder = () => {
  alert('Order Paid!')

  if (props.table?.order) {
    props.table.order.isPaid = true;
  }
  // props.table?.order?.isPaid = true
  save()
  showReleaseDialog.value = true
}

const updateTableTo = (s:string)=>{
  if(s==='clear'){
    props.table.isCleaning = true
    save()
  }else if(s==='release'){
    props.table.isCleaning = false
    props.table.isOccupied = false
    props.table.openedAt = null
    props.table.seatsOccupied = 0
      if (props.table.order) {
        props.table.order = undefined
      }
    save()
  }

  if(showReleaseDialog.value){
    showReleaseDialog.value = false
  }
}
</script>

<template>
  <div class="q-pa-md q-gutter-sm"
       style="width: 600px; height: 100%"
  >
    <q-dialog
        v-model="isOpen"
        position="right"
        backdrop-filter="grayscale(100%)"
        maximized
    >
      <q-card
          class="card-custom"
          style="width: 600px; height: 100%">

        <q-card-section
            class="row items-center no-wrap"
            style="padding: 0"
        >
          <div class="table-header" :style="getTableStyle(props.table)">
            <span>
              Table: #{{props.table.number}} {{props.table.name}}
            </span>
          </div>
          <q-space />
        </q-card-section>

        <q-card-section>
          <div
          v-if="props.table.isOccupied && !props.table.order?.isPaid"
          class="first-content"
          >
            <div class="text-subtitle2">
              Occupation time: <strong>{{ openedAtFormatted }}  ( {{ minutesOpen }} min away )</strong>
            </div>
            <div class="section-seats">
              <q-btn icon="remove" color="negative" @click="incrementDecrementSeats('decrement')" />
              <div>seats {{ props.table.seatsOccupied }}/{{props.table.seats}} occupied</div>
              <q-btn icon="add" color="positive" @click="() => incrementDecrementSeats('increment')" />
            </div>

            <div v-if="items.length && !props.table.order?.isPaid" class="q-mt-md section-items full-width" style="max-height: 300px; overflow-x: auto;">
              <q-list bordered class="bg-grey-10 text-white rounded-borders">
                <q-item v-for="(item, index) in items" :key="index">
                  <q-item-section>
                    <div><strong>{{ item.Product.name }}</strong> x {{ item.quantity }}</div>
                    <div class="text-caption text-grey-4"
                    v-if="item.status !== 'served'"
                    >
                      Requested: {{ formatTime(item.requestedAt) }} —
                      {{ minutesSince(item.requestedAt) }} min
                    </div>
                    <div class="text-caption text-grey-4"
                         v-else
                    >
                      Served: {{ formatTime(item?.servedAt!) }} —
                      {{ minutesSince(item?.servedAt!) }} min
                    </div>
                  </q-item-section>

                  <q-item-section side top>
                    <q-btn
                        v-if="item.status !== 'served'"
                        size="sm"
                        color="positive"
                        label="Serve Product"
                        @click="toggleItemStatus(index)"
                    />
                    <q-badge v-else color="grey" label="Served" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="q-mt-md text-subtitle2">
              <div><strong>Total:</strong> $ {{ props.table.order?.totalOrder.toFixed(2) }}</div>
              <div v-if="props.table.order?.lastOrderTime">
                <strong>last time requested:</strong>
                {{ formatTime(props.table.order.lastOrderTime) }} ({{ minutesSince(props.table.order.lastOrderTime) }} min)
              </div>
            </div>

            <div class="section-items">
              <span v-if="items.length === 0">
                No product on the table
              </span>

              <q-btn
                  v-if="!props.table.order?.isPaid"
                  color="primary"
                  @click="showAddProduct = true"
              >
                Add Product
              </q-btn>

              <div class="section-f-actions"></div>
              <q-btn
                  v-if="!props.table.order?.isPaid && items.length > 0"
                  class="q-mt-md"
                  color="accent"
                  icon="paid"
                  label="Pay"
                  @click="payOrder"
              />
              <q-btn
                  v-else
                  class="q-mt-md"
                  color="accent"
                  icon="close"
                  label="Close table"
                  @click="updateTableTo('release')"
              />
            </div>
          </div>
          <div
              v-if="props.table.order?.isPaid && props.table.isOccupied"
              class="second-section">

            <div>
              Order paid
            </div>

            <div v-if="!props.table.isCleaning">
              Waiting to send for cleaning
            </div>
            <div v-else>
              Waiting for a table to become available
            </div>

            <q-btn
                v-if="props.table.isOccupied && !props.table.isCleaning"
                class="q-mt-md"
                color="accent"
                label="send for cleaning"
                @click="updateTableTo('clear')"
            />
            <q-btn
                v-else
                class="q-mt-md"
                color="accent"
                label="Release table"
                @click="updateTableTo('release')"
            />
          </div>
        </q-card-section>
        <div
            class="box-closed-action"
            v-if="!props.table.isOccupied">
         <span
            class="status-table"
         >
           <q-btn
           color="primary"
           @click="occupyTable"
           >
            occupy table
          </q-btn>
         </span>
        </div>
      </q-card>
    </q-dialog>
  </div>
  <AddProductDialog
      v-model="showAddProduct"
      :order="props.table.order!"
      @update:order="(newOrder) => table.order = newOrder"
  />
  <q-dialog v-model="showReleaseDialog" persistent>
    <q-card style="min-width: 350px" class="card-custom">
      <q-card-section class="text-h6">Free up table</q-card-section>

      <q-card-section>
        <div>
          Do you want to make the table available?
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="not yet" color="primary" v-close-popup />
        <q-btn
            flat
            label="Send for cleaning"
            color="negative"
            @click="updateTableTo('clear')"
        />
        <q-btn
            flat
            label="Make table available"
            color="negative"
            @click="updateTableTo('release')"
        />

      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

.second-section{
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}


.table-header{
  width: 100%;
  height: 50px;
  padding: 0.7rem;
  font-size: 1.2rem;
  font-weight: 600;
  gap: 0.5rem;
}

.box-closed-action{
  height: 100%;
  align-content: center;
  justify-content: center;
  align-items: start;
  display: flex;

}
.status-table{
  margin-top: 100px;
  font-size: 1.5rem;
}

.first-content{
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
.section-seats {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  justify-items: center ;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

</style>
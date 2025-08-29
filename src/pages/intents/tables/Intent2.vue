<script setup lang="ts">
import { onMounted, ref } from 'vue'
import interact from 'interactjs'
import { TablePOS } from './types.ts'
import TableOne from './components/TableOne.vue'
import { mockTables } from './constants.ts'

const tables = ref<TablePOS[]>(mockTables)

const dragConfig = ref({
  editPosition: false
})

const mapRef = ref<HTMLElement | null>(null)

function enableInteractions() {

  interact('.draggable-table').unset()

  if (!dragConfig.value.editPosition) return

  interact('.draggable-table')
      .draggable({
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'parent',
            endOnly: true
          }),
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: 20, y: 20 })],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
          })
        ],
        listeners: {
          move(event) {
            const target = event.target as HTMLElement
            if(!target) return
            const mapEl = mapRef.value
            if (!mapEl) return

            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

            const elWidth = target.offsetWidth
            const elHeight = target.offsetHeight
            const mapRect = mapEl.getBoundingClientRect()

            // Limita o movimento visual à área do mapa
            const maxX = mapRect.width - elWidth
            const maxY = mapRect.height - elHeight
            x = Math.max(0, Math.min(x, maxX))
            y = Math.max(0, Math.min(y, maxY))

            target.style.transform = `translate(${x}px, ${y}px)`
            target.setAttribute('data-x', x.toString())
            target.setAttribute('data-y', y.toString())
          }
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent',
            endOnly: true
          }),
          interact.modifiers.snapSize({
            targets: [interact.snappers.grid({ x: 20, y: 20 })]
          })
        ],
        listeners: {
          move(event) {
            const target = event.target
            let x = parseFloat(target.getAttribute('data-x')) || 0
            let y = parseFloat(target.getAttribute('data-y')) || 0

            const width = event.rect.width
            const height = event.rect.height
            target.style.width = `${width}px`
            target.style.height = `${height}px`

            x += event.deltaRect.left
            y += event.deltaRect.top
            target.style.transform = `translate(${x}px, ${y}px)`
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
          },
          end(event) {
            const target = event.target as HTMLElement
            const id = parseInt(target.dataset.id || '0')
            const x = parseFloat(target.dataset.x || '0')
            const y = parseFloat(target.dataset.y || '0')
            updateTablePosition(id, x, y)
          }
        }
      })
}
onMounted(() => {
  enableInteractions()
})

function getInitialStyle(table: TablePOS) {
  return {
    width: `${table.table.width || 120}px`,
    height: `${table.table.height || 100}px`,
    position: 'absolute',
    transform: `translate(${table.table.x}px, ${table.table.y}px)`
  }
}

function updateTablePosition(tableId: number, x: number, y: number) {
  const table = tables.value.find(t => t.id === tableId)
  if (table) {
    table.table.x = x
    table.table.y = y
  }
}
</script>

<template>
  <q-page class="q-pa-md">
    <q-card class="q-mt-xl card-custom">
      <q-card-section class="text-h6 text-primary row items-center justify-between">
        <span><b>Map with InteractJS</b></span>
        <q-btn
            color="primary"
            :label="dragConfig.editPosition ? 'Save' : 'Edit'"
            @click="() => {
              dragConfig.editPosition = !dragConfig.editPosition
              enableInteractions()
            }"
        />
      </q-card-section>

      <q-card-section>
        <div class="map-area" ref="mapRef">
          <div
              v-for="table in tables"
              :key="table.id"
              class="draggable-table"
              :data-id="table.id"
              :data-x="table.table.x"
              :data-y="table.table.y"
              :style="getInitialStyle(table)"
          >
            <TableOne :table="table" :isEditing="dragConfig.editPosition" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.map-area {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px dashed #1c1717;
  overflow: hidden;
}

</style>
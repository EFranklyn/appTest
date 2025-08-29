<script setup lang="ts">
import { ref } from 'vue'
import { Order, Items, Product } from '../types'

const props = defineProps<{
  order: Order
}>()

const emit = defineEmits<{
  (e: 'update:order', payload: Order): void
}>()

const isOpen = defineModel<boolean>()

const products = ref<Product[]>([
  { name: '1/2 Pizza', price: 30 },
  { name: 'Beer', price: 8 },
  { name: 'Burger', price: 12 },
  { name: 'Kebab', price: 15 }
])

const selectedQuantities = ref<Record<string, number>>({})

function increment(product: Product) {
  selectedQuantities.value[product.name] = (selectedQuantities.value[product.name] || 0) + 1
}

function decrement(product: Product) {
  if ((selectedQuantities.value[product.name] || 0) > 0) {
    selectedQuantities.value[product.name]--
  }
}

function saveItems() {
  const newItems: Items[] = []

  for (const [productName, qty] of Object.entries(selectedQuantities.value)) {
    if (qty > 0) {
      const product = products.value.find(p => p.name === productName)
      if (product) {
        newItems.push({
          Product: product,
          quantity: qty,
          status: 'preparing',
          requestedAt: new Date().toISOString()
        })
      }
    }
  }

  const updatedOrder: Order = {
    ...props.order,
    items: [...(props.order?.items || []), ...newItems],
    totalOrder: (props.order?.totalOrder || 0) + newItems.reduce((sum, item) => sum + (item.Product.price * item.quantity), 0),
    lastOrderTime: new Date().toISOString(),
    isPaid: false
  }

  emit('update:order', updatedOrder)
  selectedQuantities.value = {}
  isOpen.value = false
}
</script>

<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 400px; max-width: 90vw;" class="card-custom">
      <q-card-section>
        <div class="text-h6">Add Products</div>
      </q-card-section>

      <q-card-section class="q-gutter-sm">
        <q-list>
          <q-item v-for="product in products" :key="product.name">
            <q-item-section>
              <div class="text-subtitle1">{{ product.name }}</div>
              <div class="text-caption text-grey">R$ {{ product.price.toFixed(2) }}</div>
            </q-item-section>

            <q-item-section side>
              <div class="row items-center q-gutter-xs">
                <q-btn size="sm" icon="remove" color="negative" dense round @click="decrement(product)" />
                <div>{{ selectedQuantities[product.name] || 0 }}</div>
                <q-btn size="sm" icon="add" color="positive" dense round @click="increment(product)" />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="white" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="saveItems" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
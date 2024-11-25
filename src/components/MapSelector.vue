<template>
  <div class="map-container h-[600px] relative">
    <div id="map" ref="mapRef" class="h-full w-full"></div>
    <div class="absolute top-4 right-4 bg-white p-4 rounded shadow-lg">
      <h3 class="text-lg font-semibold mb-2">Selected Area</h3>
      <div v-if="selectedArea">
        <p>Routes: {{ selectedArea.routes }}</p>
        <p>Addresses: {{ selectedArea.addresses }}</p>
        <p>Estimated Cost: ${{ selectedArea.cost }}</p>
      </div>
      <div v-else>
        <p class="text-gray-500">No area selected</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const props = defineProps<{
  type: string;
}>();

const mapRef = ref<HTMLElement | null>(null);
const map = ref<L.Map | null>(null);
const selectedArea = ref<{
  routes: number;
  addresses: number;
  cost: number;
} | null>(null);

onMounted(async () => {
  await nextTick();
  if (!mapRef.value) return;

  // Initialize map with default view
  map.value = L.map('map').setView([51.505, -0.09], 13);
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value);

  // Initialize FeatureGroup to store editable layers
  const drawnItems = new L.FeatureGroup();
  map.value.addLayer(drawnItems);

  // Initialize draw control
  const drawControl = new (L.Control as any).Draw({
    draw: {
      polygon: true,
      marker: false,
      circlemarker: false,
      circle: false,
      rectangle: true,
      polyline: false
    },
    edit: {
      featureGroup: drawnItems,
      remove: true
    }
  });

  map.value.addControl(drawControl);

  // Handle draw events
  map.value.on(L.Draw.Event.CREATED, (e: any) => {
    const layer = e.layer;
    drawnItems.addLayer(layer);
    updateSelectedArea();
  });

  map.value.on(L.Draw.Event.EDITED, () => {
    updateSelectedArea();
  });

  map.value.on(L.Draw.Event.DELETED, () => {
    selectedArea.value = null;
  });
});

function updateSelectedArea() {
  // Simulate area calculation
  selectedArea.value = {
    routes: Math.floor(Math.random() * 10) + 1,
    addresses: Math.floor(Math.random() * 1000) + 100,
    cost: Number((Math.random() * 1000 + 100).toFixed(2))
  };
}

watch(() => props.type, (newType) => {
  // Update map behavior based on mailer type
  if (map.value) {
    map.value.setView([51.505, -0.09], 13);
  }
});
</script>

<style scoped>
.map-container :deep(.leaflet-container) {
  z-index: 1;
}
.map-container :deep(.leaflet-control) {
  z-index: 2;
}
</style>
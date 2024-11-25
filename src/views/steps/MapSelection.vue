<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Select Your Target Area</h2>
      <p class="text-gray-600 mb-6">
        Use the map to select the carrier routes you want to target. You can select multiple routes
        to create your campaign.
      </p>
      
      <MapSelector :type="type" @selection-change="handleSelectionChange" />
      
      <div class="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Selected Area Summary</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-500">Total Routes</p>
            <p class="text-lg font-semibold">{{ selectedRoutes }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total Addresses</p>
            <p class="text-lg font-semibold">{{ selectedAddresses }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Estimated Cost</p>
            <p class="text-lg font-semibold">${{ estimatedCost }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapSelector from '../../components/MapSelector.vue';
import { MailerType } from '../../types';

const props = defineProps<{
  type: MailerType;
}>();

const selectedRoutes = ref(0);
const selectedAddresses = ref(0);
const estimatedCost = ref(0);

function handleSelectionChange(selection: { 
  routes: number; 
  addresses: number; 
  cost: number; 
}) {
  selectedRoutes.value = selection.routes;
  selectedAddresses.value = selection.addresses;
  estimatedCost.value = selection.cost;
}
</script>
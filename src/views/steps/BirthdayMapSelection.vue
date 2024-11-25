<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Select Target Area</h2>
      <p class="text-gray-600 mb-6">
        Define the geographic area where you want to send birthday mailers.
      </p>

      <!-- Map Component -->
      <div class="mb-6">
        <MapSelector 
          :type="MailerType.BIRTHDAY"
          @selection-change="handleSelectionChange"
        />
      </div>

      <!-- Targeting Options -->
      <div class="mt-6 space-y-4">
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="targetingType"
              value="radius"
              class="text-blue-600"
            />
            <span class="ml-2">Radius Targeting</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="targetingType"
              value="custom"
              class="text-blue-600"
            />
            <span class="ml-2">Custom Area</span>
          </label>
        </div>

        <!-- Radius Controls -->
        <div v-if="targetingType === 'radius'" class="flex items-center space-x-4">
          <div class="w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Radius (miles)
            </label>
            <input
              type="range"
              v-model="radius"
              min="1"
              max="50"
              class="w-full"
            />
          </div>
          <div class="w-20">
            <input
              type="number"
              v-model="radius"
              min="1"
              max="50"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
            />
          </div>
        </div>
      </div>

      <!-- Selection Summary -->
      <div class="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Selected Area Summary</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-500">Estimated Households</p>
            <p class="text-lg font-semibold">{{ estimatedHouseholds }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Average Age</p>
            <p class="text-lg font-semibold">{{ averageAge }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Monthly Birthdays (est.)</p>
            <p class="text-lg font-semibold">{{ monthlyBirthdays }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MailerType } from '../../types';
import MapSelector from '../../components/MapSelector.vue';

const targetingType = ref('radius');
const radius = ref(5);
const selectedArea = ref(null);

const estimatedHouseholds = computed(() => {
  // Simulate calculation based on area
  return targetingType.value === 'radius'
    ? Math.round(Math.PI * Math.pow(radius.value, 2) * 100)
    : 5000;
});

const averageAge = computed(() => {
  return '42 years';
});

const monthlyBirthdays = computed(() => {
  return Math.round(estimatedHouseholds.value / 12);
});

function handleSelectionChange(selection: any) {
  selectedArea.value = selection;
}
</script>
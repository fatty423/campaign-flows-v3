<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <nav class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">EDDM Campaign</h1>
        <div class="flex space-x-4">
          <div v-for="(step, index) in steps" :key="step.name"
            class="flex items-center"
            :class="{ 'text-blue-600': currentStepIndex === index, 'text-gray-500': currentStepIndex !== index }">
            <div class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center rounded-full"
                :class="currentStepIndex >= index ? 'bg-blue-600 text-white' : 'bg-gray-200'">
                {{ index + 1 }}
              </span>
              <span class="ml-2 text-sm font-medium">{{ step.name }}</span>
            </div>
            <div v-if="index < steps.length - 1" class="ml-4 w-8 h-px bg-gray-300"></div>
          </div>
        </div>
      </nav>
    </div>

    <router-view></router-view>

    <div class="mt-8 flex justify-between">
      <button 
        v-if="currentStepIndex > 0"
        @click="goToPreviousStep"
        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
        Back
      </button>
      <button 
        v-if="currentStepIndex < steps.length - 1"
        @click="goToNextStep"
        class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Continue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const steps = [
  { name: 'Map Selection', path: 'map' },
  { name: 'Product Configuration', path: 'product' },
  { name: 'Delivery Schedule', path: 'schedule' },
  { name: 'Analytics Setup', path: 'analytics' },
  { name: 'Order Summary', path: 'summary' }
];

const currentStepIndex = computed(() => {
  const currentPath = route.path.split('/').pop();
  return steps.findIndex(step => step.path === currentPath);
});

function goToNextStep() {
  if (currentStepIndex.value < steps.length - 1) {
    const nextPath = `/eddm/${steps[currentStepIndex.value + 1].path}`;
    router.push(nextPath);
  }
}

function goToPreviousStep() {
  if (currentStepIndex.value > 0) {
    const previousPath = `/eddm/${steps[currentStepIndex.value - 1].path}`;
    router.push(previousPath);
  }
}
</script>
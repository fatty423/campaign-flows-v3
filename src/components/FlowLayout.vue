<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <StepNavigation
        :title="title"
        :steps="steps"
        :current-step-index="currentStepIndex"
      />
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
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import StepNavigation from './StepNavigation.vue';

const props = defineProps<{
  title: string;
  steps: Array<{ name: string; path: string }>;
  baseRoute: string;
}>();

const router = useRouter();
const route = useRoute();

const currentStepIndex = computed(() => {
  const currentPath = route.path.split('/').pop();
  return props.steps.findIndex(step => step.path === currentPath);
});

function goToNextStep() {
  if (currentStepIndex.value < props.steps.length - 1) {
    const nextPath = `/${props.baseRoute}/${props.steps[currentStepIndex.value + 1].path}`;
    router.push(nextPath);
  }
}

function goToPreviousStep() {
  if (currentStepIndex.value > 0) {
    const previousPath = `/${props.baseRoute}/${props.steps[currentStepIndex.value - 1].path}`;
    router.push(previousPath);
  }
}
</script>
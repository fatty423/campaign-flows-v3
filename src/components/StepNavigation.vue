<template>
  <nav class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
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
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  steps: Array<{ name: string; path: string }>;
  currentStepIndex: number;
}>();
</script>
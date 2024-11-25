<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
      :placeholder="placeholder || 'Enter address'"
    />
    <div v-if="suggestions.length > 0" class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
      <ul class="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
          @click="selectSuggestion(suggestion)"
        >
          <span class="block truncate">{{ suggestion.address }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'select', value: string): void;
}>();

const suggestions = ref<Array<{ id: string; address: string }>>([]);

async function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  
  if (value.length > 2) {
    // Simulate API call for address suggestions
    suggestions.value = [
      { id: '1', address: value + ' Street' },
      { id: '2', address: value + ' Avenue' },
      { id: '3', address: value + ' Road' }
    ];
  } else {
    suggestions.value = [];
  }
}

function selectSuggestion(suggestion: { id: string; address: string }) {
  emit('update:modelValue', suggestion.address);
  emit('select', suggestion.address);
  suggestions.value = [];
}
</script>
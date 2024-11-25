<template>
  <div class="space-y-6">
    <!-- Upload Section -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Upload Suppression List</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            List Name
          </label>
          <input
            type="text"
            v-model="newListName"
            class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
            placeholder="Enter a name for this list"
          />
        </div>
        
        <FileUpload
          accept=".csv"
          @upload="handleFileUpload"
          :description="'Upload a CSV file with customer addresses to suppress'"
        />
      </div>
    </div>

    <!-- Existing Lists -->
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Manage Suppression Lists</h3>
      
      <div v-if="lists.length === 0" class="text-center py-6 text-gray-500">
        No suppression lists uploaded yet
      </div>
      
      <div v-else class="space-y-4">
        <div v-for="list in lists" :key="list.id" class="border rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-900">{{ list.name }}</h4>
              <div class="mt-1 text-sm text-gray-500">
                <p>{{ list.recordCount.toLocaleString() }} records</p>
                <p>Uploaded {{ formatDate(list.uploadDate) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :checked="selectedLists.includes(list.id)"
                  @change="toggleList(list.id)"
                  class="rounded border-gray-300 text-blue-600"
                />
                <span class="text-sm text-gray-700">Enable</span>
              </label>
              <button
                @click="deleteList(list.id)"
                class="text-red-600 hover:text-red-700"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="selectedLists.length > 0" class="mt-6 bg-gray-50 rounded-lg p-4">
        <div class="text-sm text-gray-600">
          <p>{{ totalRecords.toLocaleString() }} addresses will be suppressed</p>
          <p>Selected lists: {{ selectedLists.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import FileUpload from './FileUpload.vue';
import type { SuppressionList } from '../types';

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const newListName = ref('');
const lists = ref<SuppressionList[]>([]);
const selectedLists = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const totalRecords = computed(() => {
  return lists.value
    .filter(list => selectedLists.value.includes(list.id))
    .reduce((sum, list) => sum + list.recordCount, 0);
});

function formatDate(date: Date) {
  return format(date, 'MMM d, yyyy');
}

function handleFileUpload(file: File) {
  // Simulate file processing
  const newList: SuppressionList = {
    id: crypto.randomUUID(),
    name: newListName.value || file.name.replace('.csv', ''),
    fileName: file.name,
    uploadDate: new Date(),
    recordCount: Math.floor(Math.random() * 10000) + 100,
    enabled: true
  };
  
  lists.value.push(newList);
  newListName.value = '';
  
  // Auto-select the new list
  selectedLists.value = [...selectedLists.value, newList.id];
}

function toggleList(listId: string) {
  const index = selectedLists.value.indexOf(listId);
  if (index === -1) {
    selectedLists.value = [...selectedLists.value, listId];
  } else {
    selectedLists.value = selectedLists.value.filter(id => id !== listId);
  }
}

function deleteList(listId: string) {
  lists.value = lists.value.filter(list => list.id !== listId);
  selectedLists.value = selectedLists.value.filter(id => id !== listId);
}
</script>
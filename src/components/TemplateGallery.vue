<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="template in templates"
      :key="template.id"
      class="relative rounded-lg overflow-hidden border hover:border-blue-500 cursor-pointer"
      @click="selectTemplate(template.id)"
    >
      <img :src="template.thumbnail" :alt="template.name" class="w-full h-40 object-cover" />
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10">
        <span class="text-white font-medium opacity-0 hover:opacity-100">
          Select Template
        </span>
      </div>
      <div class="p-2 bg-white">
        <h4 class="text-sm font-medium text-gray-900">{{ template.name }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const templates = [
  {
    id: '1',
    name: 'Modern Business',
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: '2',
    name: 'Professional Service',
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: '3',
    name: 'Special Offer',
    thumbnail: 'https://via.placeholder.com/300x200'
  }
];

const emit = defineEmits<{
  (e: 'select', templateId: string): void;
}>();

function selectTemplate(templateId: string) {
  emit('select', templateId);
}
</script>
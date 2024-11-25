<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Configure Your Mailer</h2>
      <p class="text-gray-600 mb-6">
        Choose your mailer specifications and design options.
      </p>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Configuration Options -->
        <div class="space-y-6">
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Mailer Specifications</h3>
            <ProductConfigurator :type="type" />
          </div>
        </div>

        <!-- Right Column: Preview & Price -->
        <div class="space-y-6">
          <!-- Product Preview -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Product Preview</h3>
            <div class="aspect-[4/3] bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <div class="text-center p-4">
                <div class="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <template v-if="store.product.designType === 'custom' && previewImage">
                    <img :src="previewImage" alt="Design Preview" class="max-h-full max-w-full object-contain" />
                  </template>
                  <template v-else>
                    <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </template>
                </div>
                <p class="text-sm text-gray-500">
                  {{ getPreviewText }}
                </p>
              </div>
            </div>
          </div>

          <!-- Price Calculator -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Price Breakdown</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Base Price (per piece)</span>
                <span class="font-medium text-gray-900">${{ basePrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Size Premium</span>
                <span class="font-medium text-gray-900">+${{ sizePremium.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Material Premium</span>
                <span class="font-medium text-gray-900">+${{ materialPremium.toFixed(2) }}</span>
              </div>
              <div class="pt-3 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="text-gray-900 font-medium">Total (per piece)</span>
                  <span class="text-lg font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div class="flex items-center space-x-4">
                <input 
                  type="number" 
                  v-model="quantity"
                  min="100"
                  step="100"
                  class="w-32 rounded-md border-gray-300 shadow-sm text-gray-900"
                />
                <div class="flex-1">
                  <input
                    type="range"
                    v-model="quantity"
                    min="100"
                    max="10000"
                    step="100"
                    class="w-full"
                  />
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Minimum order: 100 pieces
              </p>
            </div>

            <!-- Order Total -->
            <div class="mt-6 bg-blue-50 p-4 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="text-blue-900 font-medium">Order Total</span>
                <span class="text-xl font-bold text-blue-900">
                  ${{ (totalPrice * quantity).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MailerType } from '../../types';
import ProductConfigurator from '../../components/ProductConfigurator.vue';
import { useOrderStore } from '../../stores/orderStore';

const props = defineProps<{
  type: MailerType;
}>();

const store = useOrderStore();
const quantity = ref(1000);
const previewImage = ref<string | null>(null);

const basePrice = computed(() => 0.25);
const sizePremium = computed(() => {
  switch (store.product.size) {
    case '6x11': return 0.05;
    case '9x12': return 0.10;
    default: return 0;
  }
});

const materialPremium = computed(() => {
  switch (store.product.material) {
    case '14pt': return 0.03;
    case '16pt': return 0.05;
    default: return 0;
  }
});

const totalPrice = computed(() => 
  basePrice.value + sizePremium.value + materialPremium.value
);

const getPreviewText = computed(() => {
  switch (store.product.designType) {
    case 'custom':
      return previewImage.value 
        ? 'Custom design preview' 
        : 'Upload your design to see preview';
    case 'template':
      return 'Select a template to see preview';
    case 'later':
      return 'Design will be created later';
    default:
      return 'Select design option to see preview';
  }
});

// Watch for file uploads and create preview
function handleFileUpload(file: File) {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style scoped>
input[type="range"] {
  @apply h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer;
}

input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-blue-600 rounded-full cursor-pointer;
}

input[type="range"]::-moz-range-thumb {
  @apply w-4 h-4 bg-blue-600 border-0 rounded-full cursor-pointer;
}
</style>
<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Campaign Setup</h2>
      <p class="text-gray-600 mb-6">
        Configure your new movers campaign settings and mailing preferences.
      </p>

      <!-- Campaign Type -->
      <div class="space-y-6">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Campaign Type
          </label>
          <div class="space-y-4">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="campaignType"
                value="one-time"
                class="text-blue-600"
              />
              <span class="ml-2">One-time Send</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="campaignType"
                value="recurring"
                class="text-blue-600"
              />
              <span class="ml-2">Recurring (Weekly/Monthly)</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="campaignType"
                value="auto-trigger"
                class="text-blue-600"
              />
              <span class="ml-2">Auto-trigger for New Move-ins</span>
            </label>
          </div>
        </div>

        <!-- Monthly Budget -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Monthly Budget
          </label>
          <div class="flex items-center space-x-2">
            <span class="text-gray-500">$</span>
            <input
              type="number"
              v-model="monthlyBudget"
              min="100"
              step="50"
              class="w-32 rounded-md border-gray-300 shadow-sm text-gray-900"
            />
            <span class="text-sm text-gray-500">
              Estimated {{ estimatedReach }} households per month
            </span>
          </div>
        </div>

        <!-- Campaign End Date -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Campaign End Date (Optional)
          </label>
          <Datepicker
            v-model="endDate"
            :min-date="new Date()"
            :enable-time-picker="false"
            auto-apply
            input-class-name="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
          />
        </div>

        <!-- Suppression List -->
        <div class="form-group">
          <div class="flex items-center justify-between mb-4">
            <label class="block text-sm font-medium text-gray-700">
              Suppression List
            </label>
            <button
              type="button"
              @click="showSuppressionManager = !showSuppressionManager"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {{ showSuppressionManager ? 'Hide Manager' : 'Show Manager' }}
            </button>
          </div>
          
          <div v-if="showSuppressionManager">
            <SuppressionListManager v-model="selectedSuppressionLists" />
          </div>
        </div>

        <!-- Design Options -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Design Selection
          </label>
          <div class="space-y-4">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="designType"
                value="template"
                class="text-blue-600"
              />
              <span class="ml-2">Use Existing Template</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="designType"
                value="custom"
                class="text-blue-600"
              />
              <span class="ml-2">Upload Custom Design</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="designType"
                value="later"
                class="text-blue-600"
              />
              <span class="ml-2">Design Later</span>
            </label>
          </div>

          <!-- Template Gallery -->
          <div v-if="designType === 'template'" class="mt-4">
            <TemplateGallery @select="handleTemplateSelect" />
          </div>

          <!-- Custom Design Upload -->
          <div v-if="designType === 'custom'" class="mt-4">
            <FileUpload 
              @upload="handleDesignUpload"
              accept="image/*,.pdf"
            />
          </div>
        </div>

        <!-- Price Calculator -->
        <div class="bg-gray-50 rounded-lg p-4 mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Price Breakdown</h3>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Base Price (per piece)</span>
              <span class="font-medium">${{ basePrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Monthly Volume (est.)</span>
              <span class="font-medium">{{ estimatedReach }} pieces</span>
            </div>
            <div v-if="campaignType !== 'one-time'" class="flex justify-between text-sm">
              <span class="text-gray-600">Volume Discount</span>
              <span class="font-medium text-green-600">-${{ discount.toFixed(2) }}</span>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="flex justify-between">
                <span class="font-medium">Monthly Total</span>
                <span class="text-lg font-bold">${{ monthlyTotal.toFixed(2) }}</span>
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
import Datepicker from '@vuepic/vue-datepicker';
import TemplateGallery from '../../components/TemplateGallery.vue';
import FileUpload from '../../components/FileUpload.vue';
import SuppressionListManager from '../../components/SuppressionListManager.vue';

const campaignType = ref('one-time');
const monthlyBudget = ref(500);
const endDate = ref<Date | null>(null);
const designType = ref('template');
const showSuppressionManager = ref(false);
const selectedSuppressionLists = ref<string[]>([]);

const basePrice = computed(() => 0.75);
const estimatedReach = computed(() => Math.floor(monthlyBudget.value / basePrice.value));
const discount = computed(() => {
  if (campaignType.value !== 'one-time') {
    return basePrice.value * estimatedReach.value * 0.1;
  }
  return 0;
});

const monthlyTotal = computed(() => {
  const subtotal = basePrice.value * estimatedReach.value;
  return subtotal - discount.value;
});

function handleTemplateSelect(templateId: string) {
  console.log('Selected template:', templateId);
}

function handleDesignUpload(file: File) {
  console.log('Uploaded design:', file);
}
</script>

<style>
.dp__input {
  @apply text-gray-900 bg-white border-gray-300 rounded-md shadow-sm;
}
.dp__input:focus {
  @apply border-blue-500 ring-1 ring-blue-500;
}
</style>
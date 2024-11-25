<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Campaign Setup</h2>
      <p class="text-gray-600 mb-6">
        Configure your birthday mailer campaign settings and design options.
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
                v-model="config.campaignType"
                value="one-time"
                class="text-blue-600"
              />
              <span class="ml-2">One-time Campaign</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="config.campaignType"
                value="recurring"
                class="text-blue-600"
              />
              <span class="ml-2">Recurring Campaign</span>
            </label>
          </div>
        </div>

        <!-- Frequency Settings (for recurring campaigns) -->
        <div v-if="config.campaignType === 'recurring'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Repeat Every
              </label>
              <div class="flex space-x-2">
                <input
                  type="number"
                  v-model="config.frequency.value"
                  min="1"
                  class="w-20 rounded-md border-gray-300 shadow-sm text-gray-900"
                />
                <select
                  v-model="config.frequency.unit"
                  class="rounded-md border-gray-300 shadow-sm text-gray-900"
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                End Date (Optional)
              </label>
              <Datepicker
                v-model="config.frequency.endDate"
                :min-date="new Date()"
                :enable-time-picker="false"
                auto-apply
                input-class-name="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              />
            </div>
          </div>
        </div>

        <!-- Design Selection -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Design Selection
          </label>
          <div class="space-y-4">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="config.designType"
                value="template"
                class="text-blue-600"
              />
              <span class="ml-2">Use Existing Template</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="config.designType"
                value="custom"
                class="text-blue-600"
              />
              <span class="ml-2">Upload Custom Design</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="config.designType"
                value="later"
                class="text-blue-600"
              />
              <span class="ml-2">Design Later</span>
            </label>
          </div>

          <!-- Template Gallery -->
          <div v-if="config.designType === 'template'" class="mt-4">
            <TemplateGallery @select="handleTemplateSelect" />
          </div>

          <!-- Custom Design Upload -->
          <div v-if="config.designType === 'custom'" class="mt-4">
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
              <span class="font-medium">{{ monthlyVolume }} pieces</span>
            </div>
            <div v-if="config.campaignType === 'recurring'" class="flex justify-between text-sm">
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
import type { BirthdayMailerConfig } from '../../types';

const config = ref<BirthdayMailerConfig>({
  campaignType: 'one-time',
  frequency: {
    value: 1,
    unit: 'months'
  },
  designType: 'template',
  targetArea: {
    type: 'radius',
    radius: 5
  }
});

const monthlyVolume = ref(250); // This would come from the map selection
const basePrice = computed(() => 0.75);
const discount = computed(() => {
  if (config.value.campaignType === 'recurring') {
    return basePrice.value * monthlyVolume.value * 0.1;
  }
  return 0;
});

const monthlyTotal = computed(() => {
  const subtotal = basePrice.value * monthlyVolume.value;
  return subtotal - discount.value;
});

function handleTemplateSelect(templateId: string) {
  config.value.templateId = templateId;
}

function handleDesignUpload(file: File) {
  config.value.customDesign = file;
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
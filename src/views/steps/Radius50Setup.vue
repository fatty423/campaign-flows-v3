<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Campaign Setup</h2>
      <p class="text-gray-600 mb-6">
        Configure your Radius 50 campaign to target the 50 closest homes to your service location.
      </p>

      <!-- Service Location -->
      <div class="space-y-6">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Service Location
            <span class="text-red-500">*</span>
          </label>
          <AddressAutocomplete 
            v-model="config.serviceAddress"
            @select="handleAddressSelect"
          />
        </div>

        <!-- Quantity -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Number of Homes
            <span class="text-red-500">*</span>
          </label>
          <div class="flex items-center space-x-4">
            <input 
              type="number" 
              v-model="config.quantity"
              min="1"
              max="100"
              class="w-32 rounded-md border-gray-300 shadow-sm text-gray-900"
            />
            <div class="flex-1">
              <input
                type="range"
                v-model="config.quantity"
                min="1"
                max="100"
                class="w-full"
              />
            </div>
          </div>
          <p class="mt-1 text-sm text-gray-500">Maximum: 100 homes</p>
        </div>

        <!-- Seed List -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Seed List Options
          </label>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="config.seedList.type"
                value="upload"
                class="text-blue-600"
              />
              <span>Upload address list</span>
            </div>
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="config.seedList.type"
                value="manual"
                class="text-blue-600"
              />
              <span>Enter seed address manually</span>
            </div>
          </div>

          <div v-if="config.seedList.type === 'upload'" class="mt-4">
            <FileUpload @upload="handleFileUpload" />
          </div>

          <div v-if="config.seedList.type === 'manual'" class="mt-4">
            <AddressAutocomplete 
              v-model="seedAddress"
              placeholder="Enter seed address"
              @select="handleSeedAddressSelect"
            />
          </div>
        </div>

        <!-- Campaign Frequency -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Campaign Frequency
          </label>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="config.frequency.type"
                value="one-time"
                class="text-blue-600"
              />
              <span>One-time campaign</span>
            </div>
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="config.frequency.type"
                value="recurring"
                class="text-blue-600"
              />
              <span>Recurring campaign</span>
            </div>
          </div>

          <div v-if="config.frequency.type === 'recurring'" class="mt-4 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Repeat Every
                </label>
                <div class="flex space-x-2">
                  <input 
                    type="number" 
                    v-model="config.frequency.interval.value"
                    min="1"
                    class="w-20 rounded-md border-gray-300 shadow-sm text-gray-900"
                  />
                  <select 
                    v-model="config.frequency.interval.unit"
                    class="rounded-md border-gray-300 shadow-sm text-gray-900"
                  >
                    <option value="days">Days</option>
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
        </div>

        <!-- Design Selection -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Design Selection
          </label>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="designType"
                value="custom"
                class="text-blue-600"
              />
              <span>Upload custom design</span>
            </div>
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="designType"
                value="template"
                class="text-blue-600"
              />
              <span>Choose from templates</span>
            </div>
            <div class="flex items-center space-x-3">
              <input 
                type="radio" 
                v-model="designType"
                value="later"
                class="text-blue-600"
              />
              <span>Design later</span>
            </div>
          </div>

          <div v-if="designType === 'custom'" class="mt-4">
            <FileUpload @upload="handleDesignUpload" accept="image/*,.pdf" />
          </div>

          <div v-if="designType === 'template'" class="mt-4">
            <TemplateGallery @select="handleTemplateSelect" />
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
              <span class="text-gray-600">Quantity ({{ config.quantity }} pieces)</span>
              <span class="font-medium">${{ (basePrice * config.quantity).toFixed(2) }}</span>
            </div>
            <div v-if="config.frequency.type === 'recurring'" class="flex justify-between text-sm">
              <span class="text-gray-600">Recurring Campaign Discount</span>
              <span class="font-medium text-green-600">-${{ discount.toFixed(2) }}</span>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="flex justify-between">
                <span class="font-medium">Total</span>
                <span class="text-lg font-bold">${{ total.toFixed(2) }}</span>
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
import { useRouter } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker';
import AddressAutocomplete from '../../components/AddressAutocomplete.vue';
import FileUpload from '../../components/FileUpload.vue';
import TemplateGallery from '../../components/TemplateGallery.vue';
import type { Radius50Config } from '../../types';

const router = useRouter();
const seedAddress = ref('');
const designType = ref('template');

const config = ref<Radius50Config>({
  serviceAddress: '',
  quantity: 50,
  seedList: {
    type: 'manual',
    addresses: []
  },
  frequency: {
    type: 'one-time',
    interval: {
      value: 1,
      unit: 'months'
    }
  }
});

const basePrice = computed(() => 0.75);
const discount = computed(() => {
  if (config.value.frequency.type === 'recurring') {
    return basePrice.value * config.value.quantity * 0.1;
  }
  return 0;
});

const total = computed(() => {
  const subtotal = basePrice.value * config.value.quantity;
  return subtotal - discount.value;
});

function handleAddressSelect(address: string) {
  config.value.serviceAddress = address;
}

function handleSeedAddressSelect(address: string) {
  config.value.seedList.addresses = [address];
}

function handleFileUpload(file: File) {
  // Handle CSV file upload for seed addresses
  console.log('Processing file:', file);
}

function handleDesignUpload(file: File) {
  // Handle design file upload
  console.log('Processing design:', file);
}

function handleTemplateSelect(templateId: string) {
  // Handle template selection
  console.log('Selected template:', templateId);
}
</script>
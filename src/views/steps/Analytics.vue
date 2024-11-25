<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Track and measure campaign performance</h2>
      <p class="text-gray-600 mb-6">
        Enhance your marketing campaign's effectiveness with our exclusive call tracking and landing page
        services, enabling you to monitor and optimize your campaign results seamlessly.
      </p>

      <!-- Analytics Options -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Call Tracking -->
        <div class="border rounded-lg p-6 relative">
          <div class="absolute top-4 right-4">
            <input 
              type="checkbox" 
              v-model="analytics.callTracking.enabled"
              class="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="h-12 w-12 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Call Tracking</h3>
            <p class="text-sm text-gray-600 mb-4">Track and analyze phone call data</p>
            <p class="text-xl font-bold text-gray-900">$5</p>
          </div>
        </div>

        <!-- Landing Page -->
        <div class="border rounded-lg p-6 relative">
          <div class="absolute top-4 right-4">
            <input 
              type="checkbox" 
              v-model="analytics.landingPage.enabled"
              class="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="h-12 w-12 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Custom Landing Page</h3>
            <p class="text-sm text-gray-600 mb-4">We will contact you for details</p>
            <p class="text-xl font-bold text-gray-900">$10</p>
          </div>
        </div>

        <!-- QR Code -->
        <div class="border rounded-lg p-6 relative">
          <div class="absolute top-4 right-4">
            <input 
              type="checkbox" 
              v-model="analytics.qrCode.enabled"
              class="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
          </div>
          <div class="flex flex-col items-center text-center">
            <div class="h-12 w-12 text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Tracking QR Code</h3>
            <p class="text-sm text-gray-600 mb-4">Generate QR codes to track engagement</p>
            <p class="text-xl font-bold text-gray-900">$15</p>
          </div>
        </div>
      </div>

      <!-- Call Tracking Configuration -->
      <div v-if="analytics.callTracking.enabled" class="space-y-6 border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900">Call Tracking Configuration</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Number Type</label>
            <select 
              v-model="analytics.callTracking.numberType"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
            >
              <option value="local">Local Number</option>
              <option value="tollfree">Toll Free Number</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Area Code</label>
            <input 
              type="text" 
              v-model="analytics.callTracking.areaCode"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              placeholder="Enter area code"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Call Forwarding Number</label>
            <input 
              type="tel" 
              v-model="analytics.callTracking.forwardingNumber"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              placeholder="Enter your business phone number"
            />
          </div>
        </div>
      </div>

      <!-- QR Code Configuration -->
      <div v-if="analytics.qrCode.enabled" class="space-y-6 border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900">QR Code Configuration</h3>
        
        <div class="space-y-4">
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" v-model="analytics.qrCode.type" value="web" class="text-blue-600">
              <span class="ml-2 text-gray-900">Web Link</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="analytics.qrCode.type" value="phone" class="text-blue-600">
              <span class="ml-2 text-gray-900">Phone Call</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="analytics.qrCode.type" value="directions" class="text-blue-600">
              <span class="ml-2 text-gray-900">Directions</span>
            </label>
          </div>

          <div v-if="analytics.qrCode.type === 'web'">
            <input 
              type="url" 
              v-model="analytics.qrCode.data"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              placeholder="Enter website URL"
            />
          </div>

          <div v-if="analytics.qrCode.type === 'phone'">
            <div class="flex items-center space-x-4">
              <input 
                type="checkbox" 
                v-model="useCallTrackingNumber"
                class="rounded border-gray-300 text-blue-600"
                :disabled="!analytics.callTracking.enabled"
              />
              <span class="text-gray-900">Use Call Tracking Number</span>
            </div>
            <input 
              v-if="!useCallTrackingNumber"
              type="tel" 
              v-model="analytics.qrCode.data"
              class="mt-2 w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              placeholder="Enter phone number"
            />
          </div>

          <div v-if="analytics.qrCode.type === 'directions'">
            <input 
              type="text" 
              v-model="analytics.qrCode.data"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              placeholder="Enter business address"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useOrderStore } from '../../stores/orderStore';
import type { Analytics } from '../../types';

const store = useOrderStore();
const useCallTrackingNumber = ref(false);

const analytics = ref<Analytics>({
  callTracking: {
    enabled: false,
    numberType: 'local',
    areaCode: '',
    forwardingNumber: ''
  },
  qrCode: {
    enabled: false,
    type: 'web',
    data: ''
  },
  landingPage: {
    enabled: false
  }
});

watch(analytics, (newAnalytics) => {
  store.analytics = newAnalytics;
}, { deep: true });

watch(useCallTrackingNumber, (useTracking) => {
  if (useTracking && analytics.value.callTracking.enabled) {
    analytics.value.qrCode.data = analytics.value.callTracking.forwardingNumber;
  }
});
</script>
<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column - Order Details -->
      <div class="space-y-6">
        <div class="bg-white shadow-sm rounded-lg p-6">
          <!-- Order Name -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Order Name</label>
            <input 
              type="text" 
              v-model="orderName"
              class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
              placeholder="Enter a name for your order (optional)"
            />
          </div>

          <!-- Product Details -->
          <div class="border-t pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Product Details</h3>
              <button 
                @click="editSection('product')"
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <span>Edit</span>
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <dl class="grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Type</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">{{ formatValue(summary.product.type) }}</dd>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Size</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">{{ formatValue(summary.product.size) }}</dd>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Material</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">{{ formatValue(summary.product.material) }}</dd>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Design Option</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">{{ formatValue(summary.product.designType) }}</dd>
              </div>
            </dl>
          </div>

          <!-- Delivery Schedule -->
          <div class="border-t pt-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Delivery Schedule</h3>
              <button 
                @click="editSection('schedule')"
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <span>Edit</span>
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <dl class="grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Frequency</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">{{ summary.delivery.frequency }} time(s)</dd>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Drop Type</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">{{ formatDropType(summary.delivery.dropType) }}</dd>
              </div>
              <div v-if="summary.delivery.rushDelivery" class="col-span-2">
                <dt class="text-sm text-gray-500">Rush Delivery</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">Yes (+$125.00)</dd>
              </div>
            </dl>
          </div>

          <!-- Analytics -->
          <div class="border-t pt-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Analytics</h3>
              <button 
                @click="editSection('analytics')"
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <span>Edit</span>
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <dl class="grid grid-cols-2 gap-4">
              <div v-if="summary.analytics.callTracking.enabled" class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Call Tracking</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">Enabled (+$5.00)</dd>
              </div>
              <div v-if="summary.analytics.qrCode.enabled" class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">QR Code</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">Enabled (+$15.00)</dd>
              </div>
              <div v-if="summary.analytics.landingPage.enabled" class="col-span-2 sm:col-span-1">
                <dt class="text-sm text-gray-500">Landing Page</dt>
                <dd class="mt-1 text-sm font-medium text-gray-900">Enabled (+$10.00)</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Right Column - Payment & Summary -->
      <div class="space-y-6">
        <div class="bg-white shadow-sm rounded-lg p-6">
          <!-- Order Summary -->
          <h3 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
          <div class="bg-gray-50 rounded-lg p-4">
            <dl class="space-y-3">
              <div class="flex justify-between">
                <dt class="text-sm text-gray-500">Base Price</dt>
                <dd class="text-sm font-medium text-gray-900">${{ summary.pricing.basePrice.toFixed(2) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm text-gray-500">Shipping</dt>
                <dd class="text-sm font-medium text-gray-900">${{ summary.pricing.shipping.toFixed(2) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm text-gray-500">Analytics</dt>
                <dd class="text-sm font-medium text-gray-900">${{ summary.pricing.analytics.toFixed(2) }}</dd>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between text-green-600">
                <dt class="text-sm">Discount</dt>
                <dd class="text-sm font-medium">-${{ discountAmount.toFixed(2) }}</dd>
              </div>
              <div class="pt-3 border-t border-gray-200">
                <div class="flex justify-between">
                  <dt class="text-base font-medium text-gray-900">Total</dt>
                  <dd class="text-base font-medium text-gray-900">${{ summary.pricing.total.toFixed(2) }}</dd>
                </div>
              </div>
            </dl>
          </div>

          <!-- Promo Code -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Promotional Code</label>
            <div class="flex space-x-4">
              <div class="relative flex-1">
                <input 
                  type="text" 
                  v-model="promoCode"
                  :disabled="isApplyingPromo"
                  class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
                  :class="{ 'bg-gray-50': isApplyingPromo }"
                  placeholder="Enter promo code"
                />
                <div v-if="isApplyingPromo" class="absolute inset-y-0 right-3 flex items-center">
                  <svg class="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                </div>
              </div>
              <button 
                @click="applyPromoCode"
                :disabled="isApplyingPromo || !promoCode"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            <p v-if="promoError" class="mt-2 text-sm text-red-600">{{ promoError }}</p>
            <p v-if="promoSuccess" class="mt-2 text-sm text-green-600">{{ promoSuccess }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-8 space-y-4">
            <button 
              @click="addToCart"
              :disabled="isProcessing"
              class="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isProcessing ? 'Processing...' : 'Add to Cart' }}
            </button>
            <button 
              @click="generateQuote"
              :disabled="isProcessing"
              class="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../../stores/orderStore';
import type { OrderSummary } from '../../types';

const router = useRouter();
const store = useOrderStore();

const orderName = ref('');
const promoCode = ref('');
const promoError = ref('');
const promoSuccess = ref('');
const isApplyingPromo = ref(false);
const isProcessing = ref(false);
const discountAmount = ref(0);

const summary = computed<OrderSummary>(() => store.getSummary());

function formatValue(value: string | undefined): string {
  if (!value) return 'Not selected';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDropType(type: string): string {
  return type === 'all' ? 'Mail all at once' : 'Split into multiple drops';
}

function editSection(section: string) {
  const baseRoute = router.currentRoute.value.path.split('/')[1];
  router.push(`/${baseRoute}/${section}`);
}

async function applyPromoCode() {
  if (!promoCode.value) return;
  
  isApplyingPromo.value = true;
  promoError.value = '';
  promoSuccess.value = '';

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (promoCode.value === 'SAVE10') {
      discountAmount.value = summary.value.pricing.total * 0.1;
      promoSuccess.value = 'Promo code applied successfully!';
    } else {
      promoError.value = 'Invalid promo code';
    }
  } catch (error) {
    promoError.value = 'Failed to apply promo code';
  } finally {
    isApplyingPromo.value = false;
  }
}

async function addToCart() {
  isProcessing.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Adding to cart:', summary.value);
  } catch (error) {
    console.error('Failed to add to cart:', error);
  } finally {
    isProcessing.value = false;
  }
}

async function generateQuote() {
  isProcessing.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Generating quote:', summary.value);
  } catch (error) {
    console.error('Failed to generate quote:', error);
  } finally {
    isProcessing.value = false;
  }
}
</script>
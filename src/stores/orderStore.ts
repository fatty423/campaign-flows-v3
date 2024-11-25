import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ProductConfig, DeliverySchedule, Analytics, OrderSummary } from '../types';

export const useOrderStore = defineStore('order', () => {
  const product = ref<ProductConfig>({
    type: 'postcard',
    size: '6.25x9',
    material: '100lb',
    designType: 'template',
    sides: 'single',
    suppressionLists: []
  });
  
  const delivery = ref<DeliverySchedule>({
    frequency: 1,
    dropType: 'all',
    dates: [{ date: new Date(), quantity: 1000 }],
    rushDelivery: false,
    warehouseQuantity: 1000
  });
  
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
  
  const orderName = ref('');

  const totalPrice = computed(() => {
    let base = calculateBasePrice();
    let shipping = calculateShipping();
    let analyticsPrice = calculateAnalyticsPrice();
    return base + shipping + analyticsPrice;
  });

  function calculateBasePrice() {
    let basePrice = 29.99;
    if (product.value.size === '6x11') basePrice += 5;
    if (product.value.size === '9x12') basePrice += 10;
    if (product.value.material === '14pt') basePrice += 3;
    if (product.value.material === '16pt') basePrice += 5;
    return basePrice;
  }

  function calculateShipping() {
    return delivery.value.rushDelivery ? 19.99 : 9.99;
  }

  function calculateAnalyticsPrice() {
    let price = 0;
    if (analytics.value.callTracking.enabled) price += 5;
    if (analytics.value.qrCode.enabled) price += 15;
    if (analytics.value.landingPage.enabled) price += 10;
    return price;
  }

  function getSummary(): OrderSummary {
    return {
      name: orderName.value,
      product: { ...product.value },
      delivery: { ...delivery.value },
      analytics: { ...analytics.value },
      pricing: {
        basePrice: calculateBasePrice(),
        shipping: calculateShipping(),
        analytics: calculateAnalyticsPrice(),
        total: totalPrice.value
      }
    };
  }

  function updateProduct(newProduct: Partial<ProductConfig>) {
    product.value = { ...product.value, ...newProduct };
  }

  function updateDelivery(newDelivery: Partial<DeliverySchedule>) {
    delivery.value = { ...delivery.value, ...newDelivery };
  }

  function updateAnalytics(newAnalytics: Partial<Analytics>) {
    analytics.value = { ...analytics.value, ...newAnalytics };
  }

  function setOrderName(name: string) {
    orderName.value = name;
  }

  return {
    product,
    delivery,
    analytics,
    orderName,
    totalPrice,
    getSummary,
    updateProduct,
    updateDelivery,
    updateAnalytics,
    setOrderName
  };
});
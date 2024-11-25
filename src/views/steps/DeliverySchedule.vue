<template>
  <div class="space-y-6">
    <div class="bg-white shadow-sm rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Schedule Your Delivery</h2>
      <p class="text-gray-600 mb-6">
        Plan your mailing schedule and delivery options.
      </p>
      
      <div class="space-y-6">
        <!-- Contact Frequency -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            How many times do you want to reach out?
          </label>
          <select 
            v-model="schedule.frequency" 
            class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
            @change="handleFrequencyChange"
          >
            <option value="1">1 time</option>
            <option value="2">2 times</option>
            <option value="3">3 times</option>
            <option value="4">4 times</option>
          </select>
        </div>

        <!-- Drop Type Selection -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Would you like to mail all pieces at once?
          </label>
          <select 
            v-model="schedule.dropType" 
            class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
            :disabled="schedule.frequency === 1"
            @change="handleDropTypeChange"
          >
            <option value="all">Mail all at once</option>
            <option value="split">Split into multiple drops (2-6)</option>
          </select>
        </div>

        <!-- Number of Drops Selection -->
        <div v-if="schedule.dropType === 'split'" class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Number of Drops
          </label>
          <select 
            v-model="numberOfDrops" 
            class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
            @change="handleNumberOfDropsChange"
          >
            <option v-for="n in 5" :key="n" :value="n + 1">{{ n + 1 }} drops</option>
          </select>
        </div>

        <!-- Drop Schedule -->
        <div v-if="schedule.dropType === 'split'" class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-md mb-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Total Pieces: {{ schedule.warehouseQuantity }}</span>
              <span>Remaining: {{ remainingQuantity }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(remainingQuantity / schedule.warehouseQuantity) * 100}%` }"
              ></div>
            </div>
          </div>

          <div v-for="(drop, index) in schedule.dates" :key="index" class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-sm font-medium text-gray-700">
                Drop {{ index + 1 }} Date
              </label>
              <span v-if="dateErrors[index]" class="text-sm text-red-600">
                {{ dateErrors[index] }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <Datepicker
                v-model="drop.date"
                :min-date="getMinDate(index)"
                :disabled-dates="disabledDates"
                :enable-time-picker="false"
                :format="dateFormat"
                text-input
                auto-apply
                input-class-name="text-gray-900 bg-white border-gray-300 rounded-md shadow-sm w-full"
                :class="{ 'border-red-300': dateErrors[index] }"
                @update:model-value="validateDates"
              />
              <div class="relative">
                <input 
                  type="number" 
                  v-model="drop.quantity"
                  class="w-full rounded-md border-gray-300 shadow-sm text-gray-900"
                  :placeholder="`Max: ${getMaxQuantity(index)}`"
                  :max="getMaxQuantity(index)"
                  min="1"
                  @input="validateQuantities"
                />
                <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  pieces
                </span>
              </div>
            </div>
          </div>

          <!-- Warehouse Allocation -->
          <div class="bg-gray-50 p-4 rounded-md mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Warehouse Allocation</h4>
            <p class="text-sm text-gray-600">
              Remaining pieces ({{ remainingQuantity }}) will be stored in our warehouse for future use.
            </p>
          </div>

          <div v-if="totalQuantityError" class="text-sm text-red-600 mt-2">
            {{ totalQuantityError }}
          </div>
        </div>

        <!-- Rush Delivery Option -->
        <div class="form-group">
          <label class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="schedule.rushDelivery"
              class="rounded border-gray-300 text-blue-600"
            />
            <span class="text-sm text-gray-700">Rush Delivery (+$125.00)</span>
          </label>
          <p class="mt-1 text-sm text-gray-500">
            We'll work as hard as possible to mail your job faster than the selected date
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useOrderStore } from '../../stores/orderStore';
import type { DeliverySchedule } from '../../types';
import { format, isWeekend, addDays, isBefore, isAfter } from 'date-fns';

const store = useOrderStore();
const dateErrors = ref<string[]>([]);
const totalQuantityError = ref('');
const numberOfDrops = ref(2);

const holidays = [
  '2024-01-01', // New Year's Day
  '2024-01-15', // Martin Luther King Jr. Day
  '2024-02-19', // Presidents' Day
  '2024-05-27', // Memorial Day
  '2024-07-04', // Independence Day
  '2024-09-02', // Labor Day
  '2024-10-14', // Columbus Day
  '2024-11-11', // Veterans Day
  '2024-11-28', // Thanksgiving Day
  '2024-12-25', // Christmas Day
];

const schedule = ref<DeliverySchedule>({
  frequency: 1,
  dropType: 'all',
  dates: [{ date: addDays(new Date(), 5), quantity: 1000 }],
  rushDelivery: false,
  warehouseQuantity: 1000
});

const remainingQuantity = computed(() => {
  if (schedule.value.dropType === 'all') return 0;
  const usedQuantity = schedule.value.dates.reduce((sum, drop) => sum + (drop.quantity || 0), 0);
  return schedule.value.warehouseQuantity - usedQuantity;
});

const dateFormat = (date: Date) => {
  return format(date, 'MMM dd, yyyy');
};

const disabledDates = (date: Date) => {
  if (isWeekend(date)) return true;
  const dateString = format(date, 'yyyy-MM-dd');
  if (holidays.includes(dateString)) return true;
  if (isBefore(date, new Date())) return true;
  return false;
};

const getMinDate = (index: number) => {
  if (index === 0) return new Date();
  const previousDate = schedule.value.dates[index - 1].date;
  return addDays(previousDate, 1);
};

const getMaxQuantity = (index: number) => {
  const usedQuantity = schedule.value.dates.reduce((sum, drop, i) => {
    return i === index ? sum : sum + (drop.quantity || 0);
  }, 0);
  return schedule.value.warehouseQuantity - usedQuantity;
};

function handleDropTypeChange() {
  if (schedule.value.dropType === 'all') {
    schedule.value.dates = [{
      date: addDays(new Date(), 5),
      quantity: schedule.value.warehouseQuantity
    }];
  } else {
    handleNumberOfDropsChange();
  }
}

function handleNumberOfDropsChange() {
  const drops = numberOfDrops.value;
  const baseQuantity = Math.floor(schedule.value.warehouseQuantity / drops);
  
  schedule.value.dates = Array(drops).fill(null).map((_, index) => ({
    date: addDays(new Date(), 5 + (index * 7)),
    quantity: baseQuantity
  }));
  
  // Add remainder to first drop
  const remainder = schedule.value.warehouseQuantity - (baseQuantity * drops);
  if (remainder > 0) {
    schedule.value.dates[0].quantity += remainder;
  }
  
  validateDates();
  validateQuantities();
}

function handleFrequencyChange() {
  if (schedule.value.frequency === 1) {
    schedule.value.dropType = 'all';
    handleDropTypeChange();
  }
}

function validateDates() {
  dateErrors.value = [];
  let isValid = true;

  schedule.value.dates.forEach((drop, index) => {
    if (!drop.date) {
      dateErrors.value[index] = 'Please select a date';
      isValid = false;
      return;
    }

    if (index > 0) {
      const previousDate = schedule.value.dates[index - 1].date;
      if (!isAfter(drop.date, previousDate)) {
        dateErrors.value[index] = 'Date must be after previous drop';
        isValid = false;
      }
    }
  });

  return isValid;
}

function validateQuantities() {
  const totalQuantity = schedule.value.dates.reduce((sum, drop) => sum + (drop.quantity || 0), 0);
  
  if (totalQuantity > schedule.value.warehouseQuantity) {
    totalQuantityError.value = `Total quantity cannot exceed ${schedule.value.warehouseQuantity} pieces`;
    return false;
  }
  
  totalQuantityError.value = '';
  return true;
}

watch(schedule, (newSchedule) => {
  if (validateDates() && validateQuantities()) {
    store.updateDelivery(newSchedule);
  }
}, { deep: true });

onMounted(() => {
  if (store.delivery) {
    schedule.value = { ...store.delivery };
    if (schedule.value.dropType === 'split') {
      numberOfDrops.value = schedule.value.dates.length;
    }
  }
});
</script>

<style>
.dp__input {
  @apply text-gray-900 bg-white border-gray-300 rounded-md shadow-sm;
}
.dp__input:focus {
  @apply border-blue-500 ring-1 ring-blue-500;
}
.dp__input_error {
  @apply border-red-300 ring-1 ring-red-300;
}
</style>
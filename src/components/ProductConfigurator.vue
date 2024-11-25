<template>
  <div class="product-config space-y-6">
    <!-- Mailer Type Selection -->
    <div class="form-group">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Mailer Type
        <span class="ml-1 text-gray-400">(Required)</span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label 
          v-for="type in availableMailerTypes" 
          :key="type.value"
          class="relative flex"
        >
          <input 
            type="radio" 
            :value="type.value"
            :checked="store.product.type === type.value"
            @change="updateField('type', type.value)"
            class="sr-only peer"
          />
          <div class="w-full p-4 text-gray-600 bg-white border rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50">
            <div class="text-sm font-medium">{{ type.label }}</div>
            <p class="text-xs text-gray-500 mt-1">{{ type.description }}</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Size Selection -->
    <div class="form-group">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Size
        <span class="ml-1 text-gray-400">(Required)</span>
      </label>
      <div class="grid grid-cols-3 gap-3">
        <label 
          v-for="size in availableSizes" 
          :key="size.value"
          class="relative flex"
        >
          <input 
            type="radio" 
            :value="size.value"
            :checked="store.product.size === size.value"
            @change="updateField('size', size.value)"
            class="sr-only peer"
          />
          <div class="w-full p-3 text-gray-600 bg-white border rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50">
            <div class="text-sm font-medium text-center">{{ size.label }}</div>
            <p class="text-xs text-gray-500 text-center mt-1">{{ size.dimensions }}</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Material Selection -->
    <div class="form-group">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Material
        <span class="ml-1 text-gray-400">(Required)</span>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label 
          v-for="material in availableMaterials" 
          :key="material.value"
          class="relative flex"
        >
          <input 
            type="radio" 
            :value="material.value"
            :checked="store.product.material === material.value"
            @change="updateField('material', material.value)"
            class="sr-only peer"
          />
          <div class="w-full p-4 text-gray-600 bg-white border rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50">
            <div class="text-sm font-medium">{{ material.label }}</div>
            <p class="text-xs text-gray-500 mt-1">{{ material.description }}</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Design Workflow -->
    <div class="form-group">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Design Option
        <span class="ml-1 text-gray-400">(Required)</span>
      </label>
      <div class="space-y-3">
        <label 
          v-for="option in designOptions" 
          :key="option.value"
          class="relative flex p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
          :class="{'border-blue-500 bg-blue-50': store.product.designType === option.value}"
        >
          <input 
            type="radio" 
            :value="option.value"
            :checked="store.product.designType === option.value"
            @change="updateField('designType', option.value)"
            class="sr-only"
          />
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <div class="w-4 h-4 border rounded-full flex items-center justify-center"
                :class="{'border-blue-500': store.product.designType === option.value}">
                <div class="w-2 h-2 rounded-full bg-blue-500"
                  v-show="store.product.designType === option.value"></div>
              </div>
            </div>
            <div class="ml-3">
              <span class="block text-sm font-medium text-gray-900">{{ option.label }}</span>
              <span class="block text-sm text-gray-500">{{ option.description }}</span>
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useOrderStore } from '../stores/orderStore';
import { MailerType } from '../types';

const props = defineProps<{
  type: MailerType;
}>();

const store = useOrderStore();

const mailerSpecs = {
  [MailerType.EDDM]: {
    types: [
      { value: 'postcard', label: 'Postcard', description: 'Standard EDDM postcards' },
      { value: 'brochure', label: 'Brochure', description: 'Folded brochures' }
    ],
    sizes: {
      postcard: [
        { value: '6.25x9', label: 'Standard', dimensions: '6.25" x 9"' },
        { value: '6x11', label: 'Large', dimensions: '6" x 11"' },
        { value: '9x12', label: 'Extra Large', dimensions: '9" x 12"' }
      ],
      brochure: [
        { value: '11x17', label: 'Standard', dimensions: '11" x 17"' }
      ]
    }
  },
  [MailerType.TARGETED]: {
    types: [
      { value: 'postcard', label: 'Postcard', description: 'Direct mail postcards' },
      { value: 'brochure', label: 'Brochure', description: 'Multi-page brochures' },
      { value: 'letter', label: 'Letter', description: 'Personal letters' }
    ],
    sizes: {
      postcard: [
        { value: '4x6', label: 'Standard', dimensions: '4" x 6"' },
        { value: '6x9', label: 'Large', dimensions: '6" x 9"' },
        { value: '6x11', label: 'Extra Large', dimensions: '6" x 11"' }
      ],
      brochure: [
        { value: '8.5x11', label: 'Standard', dimensions: '8.5" x 11"' },
        { value: '11x17', label: 'Large', dimensions: '11" x 17"' }
      ],
      letter: [
        { value: '8.5x11', label: 'Standard', dimensions: '8.5" x 11"' }
      ]
    }
  },
  [MailerType.NEW_MOVER]: {
    types: [
      { value: 'postcard', label: 'Postcard', description: 'Welcome postcards' },
      { value: 'brochure', label: 'Brochure', description: 'Welcome packages' },
      { value: 'letter', label: 'Letter', description: 'Welcome letters' }
    ],
    sizes: {
      postcard: [
        { value: '6x9', label: 'Standard', dimensions: '6" x 9"' },
        { value: '6x11', label: 'Large', dimensions: '6" x 11"' }
      ],
      brochure: [
        { value: '8.5x11', label: 'Standard', dimensions: '8.5" x 11"' },
        { value: '11x17', label: 'Large', dimensions: '11" x 17"' }
      ],
      letter: [
        { value: '8.5x11', label: 'Standard', dimensions: '8.5" x 11"' }
      ]
    }
  }
};

const materials = {
  postcard: [
    { 
      value: '100lb-cover', 
      label: '100lb Cover',
      description: 'Sturdy, premium cardstock perfect for postcards'
    },
    { 
      value: '14pt', 
      label: '14pt Card Stock',
      description: 'Professional-grade, durable card stock'
    }
  ],
  brochure: [
    { 
      value: '80lb-gloss', 
      label: '80lb Gloss Text',
      description: 'Lightweight, glossy paper ideal for brochures'
    },
    { 
      value: '100lb-gloss', 
      label: '100lb Gloss Text',
      description: 'Premium weight paper with excellent durability'
    }
  ],
  letter: [
    {
      value: '24lb-bond',
      label: '24lb Bond',
      description: 'Professional letterhead paper'
    },
    {
      value: '28lb-bond',
      label: '28lb Premium Bond',
      description: 'Premium weight letterhead paper'
    }
  ]
};

const designOptions = [
  { 
    value: 'template', 
    label: 'Select Template',
    description: 'Choose from our professionally designed templates'
  },
  { 
    value: 'custom', 
    label: 'Upload Custom Design',
    description: 'Upload your own design files'
  },
  { 
    value: 'later', 
    label: 'Design Later',
    description: 'Skip design now and come back to it later'
  }
];

const availableMailerTypes = computed(() => 
  mailerSpecs[props.type]?.types || []
);

const availableSizes = computed(() => 
  mailerSpecs[props.type]?.sizes[store.product.type] || []
);

const availableMaterials = computed(() => 
  materials[store.product.type] || []
);

function updateField(field: string, value: string) {
  store.updateProduct({ [field]: value });
  
  // Reset dependent fields when type changes
  if (field === 'type') {
    const defaultSize = availableSizes.value[0]?.value;
    const defaultMaterial = availableMaterials.value[0]?.value;
    store.updateProduct({ 
      size: defaultSize,
      material: defaultMaterial
    });
  }
}
</script>
export enum MailerType {
  EDDM = 'eddm',
  TARGETED = 'targeted',
  NEW_MOVER = 'new-mover',
  LETTER = 'letter',
  SATURATION = 'saturation',
  RADIUS_50 = 'radius-50',
  BIRTHDAY = 'birthday'
}

export interface SuppressionList {
  id: string;
  name: string;
  fileName: string;
  uploadDate: Date;
  recordCount: number;
  enabled: boolean;
}

export interface ProductConfig {
  type: string;
  size: string;
  material: string;
  designType: 'custom' | 'template' | 'later';
  sides: 'single' | 'double';
  suppressionLists?: string[];
}

export interface DeliverySchedule {
  frequency: number;
  dropType: 'all' | 'split';
  dates: Array<{
    date: Date;
    quantity: number;
  }>;
  rushDelivery: boolean;
  warehouseQuantity: number;
}

export interface Analytics {
  callTracking: {
    enabled: boolean;
    numberType: 'local' | 'tollfree';
    areaCode: string;
    forwardingNumber: string;
  };
  qrCode: {
    enabled: boolean;
    type: 'web' | 'phone' | 'directions';
    data: string;
  };
  landingPage: {
    enabled: boolean;
  };
}

export interface OrderSummary {
  name: string;
  product: ProductConfig;
  delivery: DeliverySchedule;
  analytics: Analytics;
  pricing: {
    basePrice: number;
    shipping: number;
    analytics: number;
    total: number;
  };
}

export interface Radius50Config {
  serviceAddress: string;
  quantity: number;
  seedList: {
    type: 'upload' | 'manual';
    addresses: string[];
  };
  frequency: {
    type: 'one-time' | 'recurring';
    interval: {
      value: number;
      unit: 'days' | 'weeks' | 'months';
    };
    endDate?: Date;
  };
  suppressionLists?: string[];
}

export interface BirthdayMailerConfig {
  campaignType: 'one-time' | 'recurring';
  frequency: {
    value: number;
    unit: 'weeks' | 'months';
    endDate?: Date;
  };
  designType: 'template' | 'custom' | 'later';
  templateId?: string;
  customDesign?: File;
  targetArea: {
    type: 'radius' | 'custom';
    radius?: number;
    coordinates?: Array<[number, number]>;
  };
}
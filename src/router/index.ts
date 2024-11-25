import { createRouter, createWebHistory } from 'vue-router';
import { MailerType } from '../types';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/eddm',
    component: () => import('../views/flows/EDDMFlow.vue'),
    children: [
      {
        path: 'map',
        component: () => import('../views/steps/MapSelection.vue'),
        props: { type: MailerType.EDDM }
      },
      {
        path: 'product',
        component: () => import('../views/steps/ProductConfig.vue'),
        props: { type: MailerType.EDDM }
      },
      {
        path: 'schedule',
        component: () => import('../views/steps/DeliverySchedule.vue'),
        props: { type: MailerType.EDDM }
      },
      {
        path: 'analytics',
        component: () => import('../views/steps/Analytics.vue'),
        props: { type: MailerType.EDDM }
      },
      {
        path: 'summary',
        component: () => import('../views/steps/OrderSummary.vue'),
        props: { type: MailerType.EDDM }
      }
    ]
  },
  {
    path: '/targeted',
    component: () => import('../views/flows/TargetedFlow.vue'),
    children: [
      {
        path: 'map',
        component: () => import('../views/steps/MapSelection.vue'),
        props: { type: MailerType.TARGETED }
      },
      {
        path: 'product',
        component: () => import('../views/steps/ProductConfig.vue'),
        props: { type: MailerType.TARGETED }
      },
      {
        path: 'schedule',
        component: () => import('../views/steps/DeliverySchedule.vue'),
        props: { type: MailerType.TARGETED }
      },
      {
        path: 'analytics',
        component: () => import('../views/steps/Analytics.vue'),
        props: { type: MailerType.TARGETED }
      },
      {
        path: 'summary',
        component: () => import('../views/steps/OrderSummary.vue'),
        props: { type: MailerType.TARGETED }
      }
    ]
  },
  {
    path: '/new-mover',
    component: () => import('../views/flows/NewMoverFlow.vue'),
    children: [
      {
        path: 'map',
        component: () => import('../views/steps/MapSelection.vue'),
        props: { type: MailerType.NEW_MOVER }
      },
      {
        path: 'setup',
        component: () => import('../views/steps/NewMoverSetup.vue')
      },
      {
        path: 'analytics',
        component: () => import('../views/steps/Analytics.vue'),
        props: { type: MailerType.NEW_MOVER }
      },
      {
        path: 'summary',
        component: () => import('../views/steps/OrderSummary.vue'),
        props: { type: MailerType.NEW_MOVER }
      }
    ]
  },
  {
    path: '/radius-50',
    component: () => import('../views/flows/Radius50Flow.vue'),
    children: [
      {
        path: 'setup',
        component: () => import('../views/steps/Radius50Setup.vue')
      },
      {
        path: 'analytics',
        component: () => import('../views/steps/Analytics.vue'),
        props: { type: MailerType.RADIUS_50 }
      },
      {
        path: 'summary',
        component: () => import('../views/steps/OrderSummary.vue'),
        props: { type: MailerType.RADIUS_50 }
      }
    ]
  },
  {
    path: '/birthday',
    component: () => import('../views/flows/BirthdayFlow.vue'),
    children: [
      {
        path: 'map',
        component: () => import('../views/steps/BirthdayMapSelection.vue')
      },
      {
        path: 'setup',
        component: () => import('../views/steps/BirthdaySetup.vue')
      },
      {
        path: 'analytics',
        component: () => import('../views/steps/Analytics.vue'),
        props: { type: MailerType.BIRTHDAY }
      },
      {
        path: 'summary',
        component: () => import('../views/steps/OrderSummary.vue'),
        props: { type: MailerType.BIRTHDAY }
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
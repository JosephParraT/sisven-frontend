import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CustomersView from '@/views/CustomersView.vue';
import CategoriesView from '@/views/CategoriesView.vue';
import PayModesView from '@/views/PayModesView.vue';
import ProductsView from '@/views/ProductsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomersView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView
  },
  {
    path: '/pay-modes',
    name: 'pay-modes',
    component: PayModesView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

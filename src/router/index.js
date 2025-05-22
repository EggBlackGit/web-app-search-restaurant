import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../pages/SearchPage.vue';

const routes = [
  {
    path: '/',
    name: 'Search',
    component: SearchPage,
  },
  // คุณสามารถเพิ่ม route อื่น ๆ ได้ที่นี่
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

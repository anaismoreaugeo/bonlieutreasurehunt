import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import HuntingResult from '../components/HuntingResult.vue';
import TreasureResult from '../components/TreasureResult.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/hunting-result', name: 'HuntingResult', component: HuntingResult },
  { path: '/treasure-result', name: 'TreasureResult', component: TreasureResult },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

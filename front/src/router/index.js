import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import HuntingResult from '../components/HuntingResult.vue';
import TreasureResult from '../components/TreasureResult.vue';
import WallResult from '../components/WallResult.vue';
import Wall from "@/components/Wall.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/hunting-result', name: 'HuntingResult', component: HuntingResult },
  { path: '/treasure-result', name: 'TreasureResult', component: TreasureResult },
  { path: '/wall-result', name: 'WallResult', component: WallResult },
  { path: '/wall', name: 'Wall', component: Wall },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
<template>
  <footer class="footer">
    <button
      @click="navigateTo('Home')"
      :class="['footer-btn', { active: isActive('Home') }]"
    > 
    <img class="rec" src="@/assets/scan.svg">
      <span>SCAN</span>
    </button>
    <button
      @click="navigateTo('HuntingResult')"
      :class="['footer-btn', { active: isActive('HuntingResult') }]">
      <img class="rec" src="@/assets/search.svg">
      <span>CARNET DE TOTEMS</span>
    </button>
    <button
      @click="navigateTo('TreasureResult')"
      :class="['footer-btn', { active: isActive('TreasureResult') }]">
      <img class="rec" src="@/assets/mur.svg">
      <span>LE MUR</span>
    </button>
  </footer>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'AppFooter',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navigateTo = (routeName) => {
      router.push({ name: routeName });
    };

    const isActive = (routeName) => {
      return route.name === routeName;
    };

    return { navigateTo, isActive };
  },
};
</script>

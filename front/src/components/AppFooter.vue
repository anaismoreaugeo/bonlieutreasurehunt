<template>
  <footer class="footer">
    <button
      @click="navigateTo('Home')"
      :class="['footer-btn', { active: isActive('Home') }]"
    >
      <i class="fas fa-home"></i>
      <span>Home</span>
    </button>
    <button
      @click="navigateTo('HuntingResult')"
      :class="['footer-btn', { active: isActive('HuntingResult') }]"
    >
      <i class="fas fa-search"></i>
      <span>Hunting Result</span>
    </button>
    <button
      @click="navigateTo('TreasureResult')"
      :class="['footer-btn', { active: isActive('TreasureResult') }]"
    >
      <i class="fas fa-gem"></i>
      <span>Treasure Result</span>
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

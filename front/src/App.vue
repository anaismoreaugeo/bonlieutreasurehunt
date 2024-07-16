<template>
  
    <AppHeader />
    <main>
      <router-view></router-view>
    </main>
    <AppFooter />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  mounted() {
    document.addEventListener('touchmove', ev => {
      ev.preventDefault()
    }, { passive: false })
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>

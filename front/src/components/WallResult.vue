<template>
  <div class="wall-result">
    <div class="instruction">
      <h2 class="bold" style="text-align: center">
        VOTRE TOTEM A <br>
        ETE AJOUTE EN <br>
        POSITION <span style="text-decoration: underline">{{ logoPosition }}</span></h2>
      <p style="text-align: center">
        Rendez-vous sur le mur <br>
        digital présent dans le <br>
        forum pour voir votre <br>
        contribution et celle des <br>
        autres participants !
      </p>
    </div>
    <div class="result-container" style="position: relative;">
      <img src="@/assets/logo-presentation.png" alt="" style="transform: scale(1.13);">
      <Logo :logo="this.logo" :is-positioned="true" />
    </div>
  </div>
</template>
<script>
import Logo from "@/components/LogoTotem.vue";

export default {
  name: 'WallResult',
  components: {Logo},
  data() {
    return {
      logo: null,
      logoPosition: null
    };
  },
  async created() {
    this.logo = this.$store.getters.getFullLogo()
    this.logoPosition = this.$store.getters.getLogoPositionOnWall().position

    if (!this.logo) {
      await this.$router.push({name: 'Home'});
    }
  },
};
</script>

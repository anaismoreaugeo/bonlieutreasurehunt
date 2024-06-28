<template>
  <div class="wall-result">
    <div class="instruction">
      <h2 class="bold" style="text-align: center">
        MUR DES SYMBOLES
      </h2>
    </div>
    <div class="result-container" style="position: relative; display: grid !important; grid-template-columns: repeat(12, 100px);">
      <div v-for="index in 72" :key="index">
        <Logo v-if="this.logos[index]" :logo="this.logos[index]" :is-positioned="false" />
        <div v-else>
          <img :src="this.murImages[index]" alt="" width="100" height="100">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "@/components/LogoTotem.vue";
import axios from "axios";

export default {
  name: 'WallResult',
  components: {Logo},
  data() {
    return {
      logos: null,
      murImages: []
    };
  },
  async created() {
    try {
      const result = await axios.get('/api/list-logos')

      console.log(result.data.logos)

      this.logos = result.data.logos
    } catch (error) {
      console.error(error)
      alert('Impossible de récupérer les logos.')
    }
  },
  mounted() {
    this.murImages = this.generateRandomMurImages(73);
  },
  methods: {
    getRandomImage() {
      const imageNumber = Math.floor(Math.random() * 12) + 1;
      return require(`@/assets/partiemur_${imageNumber}.svg`);
    },
    generateRandomMurImages(count) {
      const randomImages = [];
      for (let i = 0; i < count; i++) {
        randomImages.push(this.getRandomImage());
      }
      return randomImages;
    }
  }
};
</script>

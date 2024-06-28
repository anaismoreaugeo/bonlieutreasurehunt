<template>
  <div class="wall-result">
    <div class="instruction">
      <h2 class="bold" style="text-align: center">
        MUR DES SYMBOLES
      </h2>
    </div>
    <div class="result-container" style="position: relative; display: grid !important; grid-template-columns: repeat(12, 100px); gap: 30px;">
      <div v-for="col in cols" :key="col">
        <div style="margin-top: 10px; margin-bottom: 10px" v-for="row in rows" :key="row">
          <Logo v-if="logoAtPosition(row, col)" :logo="logoAtPosition(row, col)" :is-positioned="false" :id="row + col" />
          <div v-else>
            <img :src="this.murImages[getIndex(row, col)]" alt="" width="100" height="100">
          </div>
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
  components: { Logo },
  data() {
    return {
      logos: [],
      positions: [],
      murImages: [],
      intervalId: null, // Ajout de la propriété intervalId
      rows: ['1', '2', '3', '4', '5', '6'],
      cols: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    };
  },
  async created() {
    await this.fetchLogos();
  },
  mounted() {
    this.murImages = this.generateRandomMurImages(73);
    // Démarre l'intervalle pour appeler fetchLogos toutes les 10 secondes
    this.intervalId = setInterval(this.fetchLogos, 10000);
  },
  beforeUnmount() {
    // Nettoyer l'intervalle pour éviter les fuites de mémoire
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    async fetchLogos() {
      console.log('fetchingLogo')
      try {
        const result = await axios.get('/api/list-logos');

        const data = result.data.data;
        this.logos = data.logos;
        this.positions = data.positions;
      } catch (error) {
        console.error(error);
        alert('Impossible de récupérer les logos.');
      }
    },
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
    },
    getIndex(row, col) {
      // Convertir la colonne en index (A=0, B=1, ..., L=11)
      const colIndex = col.charCodeAt(0) - 'A'.charCodeAt(0);
      // Convertir la ligne en index (1=0, 2=1, ..., 6=5)
      const rowIndex = parseInt(row) - 1;
      // Calculer l'index total dans une grille de 12 colonnes
      return rowIndex * 12 + colIndex;
    },
    logoAtPosition(row, col) {
      const position = `${col}${row}`;

      const index = this.positions.indexOf(position);

      return index !== -1 ? this.logos[index] : null;
    }
  }
};
</script>
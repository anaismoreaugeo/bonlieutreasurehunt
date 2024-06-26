<template>
  <div class="treasure-result">
    <div class="instruction">
        <h2 class="bold">{{ instructionTitle }}</h2>
        <p>{{ instructionText1 }}</p>
        <p>{{ instructionText2 }}</p>
    </div>
    <div class="content">
      <div class="center-square" :class="{ 'no-border': validated }">
        <SliderSquare class="inner-square top-left" :colorClass="colors[0]" @update-last-clicked="updateLastClicked(0)" :id="0"/>
        <SliderSquare class="inner-square top-right" :colorClass="colors[1]" @update-last-clicked="updateLastClicked(1)" :id="1" />
        <SliderSquare class="inner-square bottom-left" :colorClass="colors[2]" @update-last-clicked="updateLastClicked(2)" :id="2" />
        <SliderSquare class="inner-square bottom-right" :colorClass="colors[3]" @update-last-clicked="updateLastClicked(3)" :id="3" />
      </div>
    </div>
    <div class="bottom-dots">
      <button class="dot red" @click="changeColor(Colors.Color1)"></button>
      <button class="dot blue" @click="changeColor(Colors.Color2)"></button>
      <button class="dot yellow" @click="changeColor(Colors.Color3)"></button>
      <button class="dot green" @click="changeColor(Colors.Color4)"></button>
      <button class="dot black" @click="changeColor(Colors.Default)"></button>
    </div>
    <div class="treasure-validation">
      <button class="ui-btn-black" v-if="!validated" @click="validate">VALIDER</button>
      <button class="ui-btn-black" v-if="validated" @click="downloadImage">
        <img src="@/assets/download.svg">TELECHARGER
      </button>
      <button class="ui-btn-black" v-if="validated" @click="placeOnWall">PLACER SUR LE MUR</button>
    </div>
  </div>
</template>

<script>
import SliderSquare from './SliderSquare.vue';
import html2canvas from 'html2canvas';
import axios from "axios";
import {Colors} from "@/store";

export default {
  name: 'TreasureResult',
  computed: {
    Colors() {
      return Colors
    }
  },
  components: {
    SliderSquare
  },
  data() {
    return {
      colors: ['cls-1', 'cls-1', 'cls-1', 'cls-1'],
      lastClickedIndex: null,
      validated: false,
      instructionTitle: "PERSONNALISEZ VOTRE PICTOGRAMME",
      instructionText1: "CLIQUEZ SUR UNE PARTIE POUR CHANGER LA FORME ET LA COULEUR",
      instructionText2: "AJOUTEZ VOTRE PIERRE A L'EDIFICE DU MUR DE BONLIEU"
    };
  },
  methods: {
    updateLastClicked(index) {
      this.lastClickedIndex = index;
    },
    changeColor(colorClass) {
      if (this.lastClickedIndex !== null) {
        const updatedColors = [...this.colors];
        updatedColors[this.lastClickedIndex] = colorClass;

        let logoStructure = this.$store.getters.getLogoStructure(this.lastClickedIndex)

        this.$store.dispatch('updateLogoStructure', { id: this.lastClickedIndex, form: logoStructure.form, color: colorClass });

        this.colors = updatedColors;

        this.lastClickedIndex = null; // Reset last clicked index
      }
    },
    validate() {
      this.validated = true;
      this.instructionTitle = "BRAVO ! VOTRE PICTOGRAMME EST MAGNIFIQUE!";
      this.instructionText1 = "VOUS POUVEZ MAINTENANT L'ENREGISTRER ET LE PLACER SUR LE MUR !";
      this.instructionText2 = "";
    },

    async downloadImage() {
      const element = this.$el.querySelector('.center-square');
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'treasure-result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    },

    async placeOnWall() {
      try {
        await axios.post('/api/add-logo', {
          logo: this.$store.getters.getFullLogo()
        })
      } catch (error) {
        console.error(error)
        alert('Impossible de sauvegarder votre logo.')
      }

      await this.$router.push({name: 'WallResult'});
    }
  }
};
</script>

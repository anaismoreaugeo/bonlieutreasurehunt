<template>
  <div class="treasure-result">
    <div class="instruction">
        <h2 class="bold">{{ instructionTitle }}</h2>
        <p>{{ instructionText1 }}</p>
        <p>{{ instructionText2 }}</p>
    </div>
    <div class="content">
      <div class="center-square">
        <SliderSquare class="inner-square top-left" :colorClass="colors[Category.Canard]" :id="Category.Canard"/>
        <SliderSquare v-if="this.totem2Available" class="inner-square top-right" :colorClass="colors[Category.Poisson]" :id="Category.Poisson" />
        <img v-else src="@/assets/poisson-lock.png" alt="">
        <SliderSquare v-if="this.totem3Available" class="inner-square bottom-left" :colorClass="colors[Category.Poulpe]" :id="Category.Poulpe" />
        <img v-else src="@/assets/poulpe-lock.png" alt="">
        <SliderSquare v-if="this.totem4Available" class="inner-square bottom-right" :colorClass="colors[Category.Bateau]" :id="Category.Bateau" />
        <img v-else src="@/assets/bateau-lock.png" alt="">
      </div>
    </div>
    <div class="bottom-dots" v-if="!this.isValidated">
      <button class="dot red" v-bind:style="[this.selectedColor === Colors.Color1 ? {'border': '2px solid black'} : {}]" @click="changeColor(Colors.Color1)"></button>
      <button class="dot blue" v-bind:style="[this.selectedColor === Colors.Color2 ? {'border': '2px solid black'} : {}]" @click="changeColor(Colors.Color2)"></button>
      <button class="dot yellow" v-bind:style="[this.selectedColor === Colors.Color3 ? {'border': '2px solid black'} : {}]" @click="changeColor(Colors.Color3)"></button>
      <button class="dot green" v-bind:style="[this.selectedColor === Colors.Color4 ? {'border': '2px solid black'} : {}]" @click="changeColor(Colors.Color4)"></button>
      <button class="dot black" v-bind:style="[this.selectedColor === Colors.Default ? {'border': '2px solid black'} : {}]" @click="changeColor(Colors.Default)"></button>
    </div>
    <div class="treasure-validation">
      <button class="ui-btn-black" v-if="!this.isValidated && totem1Available && totem2Available && totem3Available && totem4Available" @click="validate">VALIDER</button>
      <button class="ui-btn-black" v-if="this.isValidated" @click="downloadImage">
        <img src="@/assets/download.svg">TELECHARGER
      </button>
      <button class="ui-btn-black" v-if="this.isValidated" @click="placeOnWall">DECOUVRIR MON TOTEM SUR LE MUR</button>
    </div>
  </div>
</template>

<script>
import SliderSquare from './SliderSquare.vue';
import html2canvas from 'html2canvas';
import axios from "axios";
import {Category, Colors} from "@/store";

export default {
  name: 'TreasureResult',
  computed: {
    Category() {
      return Category
    },
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
      isValidated: null,
      instructionTitle: "PERSONNALISEZ VOTRE PICTOGRAMME",
      instructionText1: "CLIQUEZ SUR UNE PARTIE POUR CHANGER LA FORME ET LA COULEUR",
      instructionText2: "AJOUTEZ VOTRE PIERRE A L'EDIFICE DU MUR DE BONLIEU",
      selectedColor: null,
      totem1Available: null,
      totem2Available: null,
      totem3Available: null,
      totem4Available: null,
    };
  },
  async created() {
    const isValidated = this.$store.getters.isValidated();

    if (isValidated) {
      this.isValidated = isValidated.isValidated
    }

    this.totem1Available = this.$store.getters.isActive('totem1')
    this.totem2Available = this.$store.getters.isActive('totem2')
    this.totem3Available = this.$store.getters.isActive('totem3')
    this.totem4Available = this.$store.getters.isActive('totem4')

    if (!this.totem1Available) {
      await this.$router.push({name: 'Home'});
    }

    if (this.isValidated) {
      await this.$router.push({name: 'WallResult'});
    }
  },
  methods: {
    changeColor(colorClass) {
      const selectedSquare = this.$store.getters.getSelectedSquare()

      if (!selectedSquare) {
        return
      }

      const selectedSquareId = selectedSquare.id;

      if (selectedSquareId !== null) {
        const updatedColors = [...this.colors];

        updatedColors[selectedSquareId] = colorClass;

        let logoStructure = this.$store.getters.getLogoStructure(selectedSquareId)

        this.$store.dispatch('updateLogoStructure', { id: selectedSquareId, form: logoStructure.form, color: colorClass });

        this.colors = updatedColors;

        this.selectedColor = colorClass

        this.$store.dispatch('updateSelectedColor', { color: colorClass });

        // this.lastClickedIndex = null; // Reset last clicked index
      }
    },
    validate() {
      this.$store.dispatch('updateSelectedSquare', { id: null });
      this.$store.dispatch('updateIsValidated', { isValidated: true });

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
        const result = await axios.post('/api/add-logo', {
          logo: this.$store.getters.getFullLogo()
        })

        this.$store.dispatch('updateLogoPositionOnWall', { position: result.data.message });
      } catch (error) {
        console.error(error)
        alert('Impossible de sauvegarder votre logo.')
      }

      await this.$router.push({name: 'WallResult'});
    }
  },
  watch: {
    '$store.state.selectedColor': {
      handler() {
        const selectedColor = this.$store.getters.getSelectedColor();

        if (selectedColor.color) {
          this.selectedColor = selectedColor.color
        }
      }
    },
    '$store.state.isValidated': {
      handler() {
        const isValidated = this.$store.getters.isValidated();

        if (isValidated) {
          this.isValidated = isValidated.isValidated
        }
      }
    }
  }
};
</script>

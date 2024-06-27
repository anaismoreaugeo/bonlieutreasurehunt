<template>
  <div class="slider-square" @click="selectSquare" :id="id" v-bind:style="[this.selectedSquare ? {'border': '2px solid black'} : {}]">
    <div v-if="this.selectedSquare" @click="previousImage" style="margin-right: 6px">
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.35247 8.11719C-0.11628 8.60547 -0.11628 9.39844 0.35247 9.88672L7.55247 17.3867C8.02122 17.875 8.78247 17.875 9.25122 17.3867C9.71997 16.8984 9.71997 16.1055 9.25122 15.6172L2.89872 9L9.24747 2.38281C9.71622 1.89453 9.71622 1.10156 9.24747 0.613281C8.77872 0.125 8.01747 0.125 7.54872 0.613281L0.34872 8.11328L0.35247 8.11719Z" fill="#333333"/>
      </svg>
    </div>
    <svg v-if="currentForm === Forms.Form1" :class="colorClass" viewBox="0 0 200 200">
      <polygon points="-156.84 131.24 -156.84 356.66 66.49 356.66 66.49 244 183.78 244 183.78 15.61 -40.17 15.61 -40.17 128.79 68.99 128.79 66.49 244 -41.86 244 -40.17 128.79 -156.84 131.24"/>
    </svg>
    <svg v-if="currentForm === Forms.Form2" :class="colorClass" viewBox="0 0 200 200">
      <circle cx="-1.23" cy="201.84" r="193.18"/>
    </svg>
    <svg v-if="currentForm === Forms.Form3" :class="colorClass" viewBox="0 0 200 200">
      <polyline points="0 200 184.77 15.23 184.77 200"/>
    </svg>
    <svg v-if="currentForm === Forms.Form4" :class="colorClass" viewBox="0 0 200 200">
      <circle cx="99.91" cy="100.51" r="27.06"/>
    </svg>
    <div v-if="this.selectedSquare" @click="nextImage" style="margin-left: 6px;">
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.64753 8.11719C10.1163 8.60547 10.1163 9.39844 9.64753 9.88672L2.44753 17.3867C1.97878 17.875 1.21753 17.875 0.748779 17.3867C0.280029 16.8984 0.280029 16.1055 0.748779 15.6172L7.10128 9L0.752529 2.38281C0.283779 1.89453 0.283779 1.10156 0.752529 0.613281C1.22128 0.125 1.98253 0.125 2.45128 0.613281L9.65128 8.11328L9.64753 8.11719Z" fill="#333333"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {Colors, Forms} from "@/store";

export default {
  name: 'SliderSquare',
  computed: {
    Forms() {
      return Forms
    }
  },
  props: {
    colorClass: {
      type: String,
      default: Colors.Default
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentForm: this.$store.getters.getLogoStructure(this.id).form,
      currentColor: this.colorClass,
      selectedSquare: false
    };
  },
  created() {
    const logoStructure = this.$store.getters.getLogoStructure(this.id);
    if (logoStructure) {
      this.currentForm = logoStructure.form;
      this.currentColor = logoStructure.color;
    }
  },
  methods: {
    selectSquare() {
      this.selectedSquare = true
      this.$store.dispatch('updateSelectedSquare', { id: this.id });
    },
    previousImage() {
      this.currentForm = (this.currentForm - 1) % 4;
      this.$store.dispatch('updateLogoStructure', { id: this.id, form: this.currentForm, color: this.colorClass });
      this.$emit('update-last-clicked');
    },
    nextImage() {
      this.currentForm = (this.currentForm + 1) % 4;
      this.$store.dispatch('updateLogoStructure', { id: this.id, form: this.currentForm, color: this.colorClass });
      this.$emit('update-last-clicked');
    }
  },
  watch: {
    // Watcher pour mettre à jour form et currentColor si le store change
    '$store.state.logoStructure': {
      handler() {
        const logoStructure = this.$store.getters.getLogoStructure(this.id);
        if (logoStructure) {
          this.currentForm = logoStructure.form;
          this.currentColor = logoStructure.color;
        }
      },
      deep: true
    },
    '$store.state.selectedSquare': {
      handler() {
        const selectedSquareId = this.$store.getters.getSelectedSquare();

        if (selectedSquareId.id !== this.id) {
          this.selectedSquare = false
        }

        const logoStructure = this.$store.getters.getLogoStructure(selectedSquareId.id);

        if (logoStructure) {
          this.$store.dispatch('updateSelectedColor', { color: logoStructure.color });

        }
      }
    }
  }
};
</script>

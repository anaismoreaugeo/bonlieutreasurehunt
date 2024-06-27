<template>
  <div class="slider-square" @click="selectSquare" :id="id" v-bind:style="[this.selectedSquare ? {'border': '2px solid black'} : {}]">
    <div v-if="this.selectedSquare" @click="previousImage" style="margin-right: 6px">
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.35247 8.11719C-0.11628 8.60547 -0.11628 9.39844 0.35247 9.88672L7.55247 17.3867C8.02122 17.875 8.78247 17.875 9.25122 17.3867C9.71997 16.8984 9.71997 16.1055 9.25122 15.6172L2.89872 9L9.24747 2.38281C9.71622 1.89453 9.71622 1.10156 9.24747 0.613281C8.77872 0.125 8.01747 0.125 7.54872 0.613281L0.34872 8.11328L0.35247 8.11719Z" fill="#333333"/>
      </svg>
    </div>

    <div v-if="id === Category.Canard">
      <svg v-if="currentForm === Forms.Form1" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40.9142 75.5858L75.5858 40.9142C76.3668 40.1332 76.3668 38.8668 75.5858 38.0858L40.9142 3.41421C40.1332 2.63316 38.8668 2.63316 38.0858 3.41421L3.41422 38.0858C2.63317 38.8668 2.63317 40.1332 3.41422 40.9142L38.0858 75.5858C38.8668 76.3668 40.1332 76.3668 40.9142 75.5858Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
      <svg v-if="currentForm === Forms.Form2" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="74" height="74" rx="2" stroke-width="5"/>
      </svg>
      <svg v-if="currentForm === Forms.Form3" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="74" height="74" rx="3" stroke-width="5"/>
        <circle cx="56" cy="23.4314" r="4"/>
        <circle cx="24" cy="57.4314" r="4"/>
      </svg>
    </div>

    <div v-if="id === Category.Poisson">
      <svg v-if="currentForm === Forms.Form1" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M77.1733 40.2416L51.98 76.1487C51.6056 76.6823 50.9946 77 50.3428 77L5.00557 77C3.35645 77 2.41597 75.1164 3.4069 73.7982L28.5918 40.296C29.1379 39.5696 29.1256 38.5664 28.5619 37.8537L3.56261 6.24056C2.52563 4.92926 3.45959 3 5.13136 3L50.3731 3C51.008 3 51.6052 3.30147 51.9823 3.81232L77.1452 37.9052C77.6558 38.597 77.6671 39.5377 77.1733 40.2416Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
      <svg v-if="currentForm === Forms.Form2" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M45.5567 77L5 77C3.89543 77 3 76.1046 3 75L3 5C3 3.89543 3.89543 3 5 3L45.5567 3C46.154 3 46.7201 3.26696 47.1 3.72786L75.9513 38.7279C76.5603 39.4666 76.5603 40.5334 75.9513 41.2722L47.1 76.2721C46.7201 76.733 46.154 77 45.5567 77Z" stroke-width="5" stroke-linejoin="round"/>
        <circle cx="33" cy="40" r="4"/>
      </svg>
      <svg v-if="currentForm === Forms.Form3" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.349 41.4098L6.41865 76.5599C5.16054 77.8259 3.00001 76.9349 3 75.1501L3 4.84991C3 3.06508 5.16053 2.17412 6.41864 3.44014L41.349 38.5902C42.1242 39.3703 42.1242 40.6298 41.349 41.4098Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
    </div>

    <div v-if="id === Category.Poulpe">
      <svg v-if="currentForm === Forms.Form1" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40.5247 3.48387L76.4249 39.9346C76.7934 40.3088 77 40.8129 77 41.338V75.032C77 76.8331 74.8058 77.7164 73.5579 76.4177L40.5424 42.0578C39.7416 41.2244 38.4031 41.2413 37.6236 42.0947L6.47669 76.1938C5.24537 77.5418 3 76.6707 3 74.8449V41.3087C3 40.801 3.19306 40.3123 3.54002 39.9417L37.6398 3.52037C38.4165 2.69084 39.7274 2.67426 40.5247 3.48387Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
      <svg v-if="currentForm === Forms.Form2" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M77 37.7787L77 5C77 3.89543 76.1046 3 75 3L5 3C3.89543 3 3 3.89543 3 5L3 73.7247C3 75.2209 4.58266 76.1873 5.91361 75.5038L75.9136 39.5579C76.5806 39.2154 77 38.5285 77 37.7787Z" stroke-width="5" stroke-linejoin="round"/>
        <circle cx="8" cy="8" r="4" transform="matrix(-1 -2.18557e-08 -2.18557e-08 1 48 17)"/>
      </svg>
      <svg v-if="currentForm === Forms.Form3" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.91422 6.28922L74.7108 77.0858C75.9707 78.3457 78.125 77.4534 78.125 75.6716L78.125 4.875C78.125 3.77043 77.2296 2.875 76.125 2.875L5.32843 2.875C3.54662 2.875 2.65429 5.02929 3.91422 6.28922Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
    </div>

    <div v-if="id === Category.Bateau">
      <svg v-if="currentForm === Forms.Form1" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M74.7974 39H5.0128C3.20567 39 2.32524 36.7933 3.63605 35.5493L37.645 3.27394C38.4026 2.55494 39.5859 2.54001 40.3614 3.23965L76.1371 35.515C77.4972 36.742 76.6292 39 74.7974 39Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
      <svg v-if="currentForm === Forms.Form2" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23" cy="21.875" r="4"/>
        <path d="M73.5718 6.29162L6.66181 72.9748C5.4009 74.2314 3.25 73.3383 3.25 71.5581L3.24999 4.87501C3.25 3.77043 4.14542 2.875 5.24999 2.875L72.16 2.875C73.9434 2.875 74.835 5.03267 73.5718 6.29162Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
      <svg v-if="currentForm === Forms.Form3" :class="colorClass" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.9854 44L5 44C3.89543 44 3 43.1046 3 42L3 5.3C3 4.19544 3.89544 3.3 5 3.3L72.0446 3.30001C73.844 3.30001 74.7282 5.49068 73.4329 6.7397L35.3737 43.4397C35.0009 43.7991 34.5032 44 33.9854 44Z" stroke-width="5" stroke-linejoin="round"/>
      </svg>
    </div>
    <div v-if="this.selectedSquare" @click="nextImage" style="margin-left: 6px;">
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.64753 8.11719C10.1163 8.60547 10.1163 9.39844 9.64753 9.88672L2.44753 17.3867C1.97878 17.875 1.21753 17.875 0.748779 17.3867C0.280029 16.8984 0.280029 16.1055 0.748779 15.6172L7.10128 9L0.752529 2.38281C0.283779 1.89453 0.283779 1.10156 0.752529 0.613281C1.22128 0.125 1.98253 0.125 2.45128 0.613281L9.65128 8.11328L9.64753 8.11719Z" fill="#333333"/>
      </svg>
    </div>
  </div>
</template>

<script>
import {Category, Colors, Forms} from "@/store";

export default {
  name: 'SliderSquare',
  computed: {
    Category() {
      return Category
    },
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

    this.$store.dispatch('updateLogoStructure', { id: this.id, form: this.currentForm, color: this.colorClass });
  },
  methods: {
    selectSquare() {
      this.selectedSquare = true
      this.$store.dispatch('updateSelectedSquare', { id: this.id });
    },
    previousImage() {
      this.currentForm = (this.currentForm - 1 + 3) % 3;
      this.$store.dispatch('updateLogoStructure', { id: this.id, form: this.currentForm, color: this.colorClass });
      this.$emit('update-last-clicked');
    },
    nextImage() {
      this.currentForm = (this.currentForm + 1) % 3;
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

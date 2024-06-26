<template>
  <div class="slider-square" @click="nextImage" :id="id">
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
      currentColor: this.colorClass
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
    }
  }
};
</script>

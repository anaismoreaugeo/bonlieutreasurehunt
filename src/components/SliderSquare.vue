<template>
  <div class="slider-square" @click="nextImage">
    <svg v-if="currentIndex === 0" :class="colorClass" viewBox="0 0 200 200">
      <polygon points="-156.84 131.24 -156.84 356.66 66.49 356.66 66.49 244 183.78 244 183.78 15.61 -40.17 15.61 -40.17 128.79 68.99 128.79 66.49 244 -41.86 244 -40.17 128.79 -156.84 131.24"/>
    </svg>
    <svg v-if="currentIndex === 1" :class="colorClass" viewBox="0 0 200 200">
      <circle cx="-1.23" cy="201.84" r="193.18"/>
    </svg>
    <svg v-if="currentIndex === 2" :class="colorClass" viewBox="0 0 200 200">
      <polyline points="0 200 184.77 15.23 184.77 200"/>
    </svg>
    <svg v-if="currentIndex === 3" :class="colorClass" viewBox="0 0 200 200">
      <circle cx="99.91" cy="100.51" r="27.06"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SliderSquare',
  props: {
    colorClass: {
      type: String,
      default: 'cls-1'
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % 4;
      this.$emit('update-last-clicked');
    }
  }
};
</script>

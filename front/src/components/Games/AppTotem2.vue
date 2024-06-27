<template>
  <BaseTotem 
    title="Jeu Totem 2" 
    description="Tracez le dessin sans repasser par les mêmes segments." 
    :points="points"
    :segments="segments"
    viewBox="0 0 348 194"
    :auto-draw-segments="false"
    :show-indices="false"
    @close="closeModal"
  >
    <svg viewBox="0 0 348 194" class="base-svg">
      <path class="opacity-15" style="fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 71.454315 51.555735 L 24.911997 51.555735 L 1.810693 27.522995 L 94.810401 27.522995 Z M 71.454315 51.555735 " transform="matrix(3.587629,0,0,3.592593,0,0)"/>
      <path class="opacity-15" style="fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 24.79985 26.478093 L 48.310547 2.444265 L 71.822333 26.478093 " transform="matrix(3.587629,0,0,3.592593,0,0)"/>
      <circle cx="42.563802" cy="21.252497" r="2" fill="black" transform="matrix(3.587629,0,0,3.592593,0,0)"/>
      <circle cx="55.10255" cy="21.252497" r="2" fill="black" transform="matrix(3.587629,0,0,3.592593,0,0)"/>
    </svg>
  </BaseTotem>
</template>

<script>
import BaseTotem from './BaseTotem.vue';

export default {
  name: 'AppTotem2',
  components: {
    BaseTotem
  },
  data() {
    return {
      points: [
        { x: 256, y: 185 },
        { x: 89, y: 185 },
        { x: 11, y: 100 },
        { x: 90, y: 99 },
        { x: 256, y: 99 },
        { x: 334, y: 99 },
        { x: 175, y: 11 }
      ],
      segments: [
        { start: 0, end: 1 },
        { start: 1, end: 2 },
        { start: 2, end: 3 },
        { start: 3, end: 4 },
        { start: 4, end: 5 },
        { start: 5, end: 0 },
        { start: 3, end: 6 },
        { start: 4, end: 6 },
      ]
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.base-svg {
  width: 100%;
  height: auto;
}
</style>

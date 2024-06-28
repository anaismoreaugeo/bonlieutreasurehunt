<template>
  <BaseTotem 
    title="Jeu Totem 1" 
    description="Tracez le dessin sans repasser par les mêmes segments." 
    :points="points"
    :segments="segments"
    viewBox="0 0 364.06 515.53"
    :auto-draw-segments="false"
    :show-indices="false"
    totem-id="totem1"
    @close="closeModal"
  >
  <svg viewBox="0 0 349 514" class="base-svg">
    <path class="opacity-15" style="stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 268.117188 257 L 345.621094 179.5 C 347.09375 178.027344 347.917969 176.039062 347.917969 173.957031 C 347.917969 171.875 347.09375 169.875 345.621094 168.410156 L 179.507812 2.296875 C 176.449219 -0.765625 171.46875 -0.765625 168.410156 2.296875 L 2.296875 168.402344 C 0.824219 169.875 0 171.863281 0 173.945312 C 0 176.027344 0.824219 178.027344 2.296875 179.488281 L 79.796875 256.988281 L 2.296875 334.496094 C -0.761719 337.558594 -0.761719 342.523438 2.296875 345.597656 L 168.410156 511.703125 C 169.882812 513.175781 171.871094 514 173.953125 514 C 176.035156 514 178.035156 513.175781 179.5 511.703125 L 345.609375 345.597656 C 348.667969 342.535156 348.667969 337.566406 345.609375 334.496094 L 268.109375 256.988281 Z M 18.941406 173.945312 L 173.953125 18.9375 L 328.964844 173.945312 L 257.007812 245.890625 L 179.5 168.371094 C 176.550781 165.421875 171.347656 165.421875 168.398438 168.371094 L 90.886719 245.890625 Z M 245.917969 256.988281 L 173.953125 328.941406 L 101.996094 256.988281 L 173.953125 185.023438 Z M 173.953125 495.058594 L 18.941406 340.050781 L 90.898438 268.097656 L 168.410156 345.605469 C 169.945312 347.140625 171.945312 347.90625 173.953125 347.90625 C 175.964844 347.90625 177.972656 347.140625 179.5 345.605469 L 257.007812 268.097656 L 328.964844 340.050781 Z"/>
    <circle cx="102.832031" cy="170.90625" r="25.984375" fill="black"/>
    <circle cx="245.09375" cy="170.90625" r="25.984375" fill="black"/>    
  </svg>

  </BaseTotem>
</template>

<script>
import BaseTotem from './BaseTotem.vue';

export default {
  name: 'AppTotem1',
  components: {
    BaseTotem
  },
  data() {
    return {
      points: [
        { x: 17, y: 340.63 },
        { x: 182, y: 505 },
        { x: 345, y: 342 },
        { x: 265, y: 257 },
        { x: 345.61, y: 175 },
        { x: 182, y: 10 },
        { x: 18, y: 174 },
        { x: 98, y: 257.5 },
        { x: 182, y: 177 },
        { x: 182, y: 339.06 }
      ],
      segments: [
        { start: 0, end: 1 },
        { start: 1, end: 2 },
        { start: 2, end: 3 },
        { start: 3, end: 4 },
        { start: 4, end: 5 },
        { start: 5, end: 6 },
        { start: 6, end: 7 },
        { start: 7, end: 8 },
        { start: 8, end: 3 },
        { start: 3, end: 9 },
        { start: 9, end: 7 },
        { start: 0, end: 7 }
      ]
    };
  },
  methods: {
    closeModal() {
      console.log("ca passe par appTotem1")
      this.$emit('close');
    }
  }
};
</script>

<style scoped>

.cls-1 {
  fill: none;
  stroke: #1d1d1b;
  stroke-miterlimit: 10;
  stroke-width: 18;
}

.cls-2 {
  fill: red;
}

.eyes{
  fill: #1d1d1b;
}
</style>

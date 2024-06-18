<template>
  <BaseTotem 
    title="Jeu Totem 1" 
    description="Tracez le dessin sans repasser par les mêmes segments." 
    totem="totem1"
    :points="points"
    :segments="segments"
    viewBox="0 0 364.06 515.53"
  >
    <svg ref="svg" viewBox="0 0 364.06 515.53" class="base-svg">
      <polygon class="cls-1" points="25.03 340.63 184.42 500.03 342.34 342.11 262.68 262.44 345.61 179.51 184.12 18.01 25.76 176.36 105.8 256.4 182.98 179.22 262.68 262.44 186.06 339.06 105.8 256.4 25.03 340.63"/>
      <!-- Adding circles at intersection points -->
      <circle cx="25.03" cy="340.63" r="5" class="cls-2"/>
      <circle cx="184.42" cy="500.03" r="5" class="cls-2"/>
      <circle cx="342.34" cy="342.11" r="5" class="cls-2"/>
      <circle cx="262.68" cy="262.44" r="5" class="cls-2"/>
      <circle cx="345.61" cy="179.51" r="5" class="cls-2"/>
      <circle cx="184.12" cy="18.01" r="5" class="cls-2"/>
      <circle cx="25.76" cy="176.36" r="5" class="cls-2"/>
      <circle cx="105.8" cy="256.4" r="5" class="cls-2"/>
      <circle cx="182.98" cy="179.22" r="5" class="cls-2"/>
      <circle cx="186.06" cy="339.06" r="5" class="cls-2"/>
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
        { x: 25.03, y: 340.63 },
        { x: 184.42, y: 500.03 },
        { x: 342.34, y: 342.11 },
        { x: 262.68, y: 262.44 },
        { x: 345.61, y: 179.51 },
        { x: 184.12, y: 18.01 },
        { x: 25.76, y: 176.36 },
        { x: 105.8, y: 256.4 },
        { x: 182.98, y: 179.22 },
        { x: 186.06, y: 339.06 }
      ],
      segments: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 },
        { from: 8, to: 3 },
        { from: 3, to: 9 },
        { from: 9, to: 0 },
        { from: 0, to: 7 }
      ]
    };
  }
};
</script>

<style scoped>
svg {
  border: 1px solid black;
}

.cls-1 {
  fill: none;
  stroke: #1d1d1b;
  stroke-miterlimit: 10;
  stroke-width: 12;
}

.cls-2 {
  fill: red;
}
</style>

<template>
  <BaseTotem 
    title="Jeu Totem 3" 
    description="Tracez le dessin sans repasser par les mêmes segments." 
    :points="points"
    :segments="segments"
    viewBox="0 0 347 130"
    :auto-draw-segments="false"
    :show-indices="false"
    @close="closeModal"
  >
  <svg viewBox="0 0 347 130" class="base-svg">
    <path class="opacity-15" style="stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 344.601562 60.882812 L 287.765625 3.890625 C 286.695312 2.816406 285.238281 2.214844 283.722656 2.214844 L 166.570312 2.214844 C 163.417969 2.214844 160.859375 4.777344 160.859375 7.941406 L 160.859375 55.316406 L 105.296875 3.734375 C 104.238281 2.753906 102.855469 2.207031 101.414062 2.207031 L 8.804688 2.207031 C 6.496094 2.207031 4.414062 3.605469 3.527344 5.746094 C 2.640625 7.886719 3.128906 10.351562 4.765625 11.992188 L 57.691406 65.046875 L 4.878906 118.011719 C 3.246094 119.652344 2.757812 122.113281 3.644531 124.253906 C 4.527344 126.398438 6.613281 127.792969 8.921875 127.792969 L 101.414062 127.792969 C 102.851562 127.792969 104.238281 127.246094 105.296875 126.265625 L 160.859375 74.765625 L 160.859375 122.054688 C 160.859375 125.21875 163.417969 127.78125 166.570312 127.78125 L 283.605469 127.78125 C 285.117188 127.78125 286.574219 127.179688 287.644531 126.101562 L 344.601562 68.980469 C 346.835938 66.738281 346.835938 63.109375 344.601562 60.875 Z M 99.179688 116.328125 L 22.71875 116.328125 L 69.820312 69.097656 C 70.890625 68.023438 71.492188 66.5625 71.492188 65.042969 C 71.492188 63.523438 70.890625 62.066406 69.820312 60.992188 L 22.609375 13.671875 L 99.175781 13.671875 L 154.511719 65.042969 Z M 281.242188 116.324219 L 172.289062 116.324219 L 172.289062 13.675781 L 281.359375 13.675781 L 332.484375 64.933594 Z"/>
    <circle cx="262.039062" cy="64.996094" r="17.789062" fill="black"/>
  </svg>
  
  </BaseTotem>
</template>

<script>
import BaseTotem from './BaseTotem.vue';

export default {
  name: 'AppTotem3',
  components: {
    BaseTotem
  },
  data() {
    return {

      points: [
        { x: 13, y: 10 },
        { x: 104, y: 10 },
        { x: 104, y: 120 },
        { x: 13, y: 120 },
        { x: 165, y: 64 },
        { x: 65, y: 64 },
        { x: 165, y: 10 },
        { x: 285, y: 10 },
        { x: 165, y: 120 },
        { x: 285, y: 120 },
        { x: 337, y: 64 },
      ],
      segments: [
        { start: 0, end: 1 },
        { start: 1, end: 4 },
        { start: 4, end: 2 },
        { start: 2, end: 3 },
        { start: 3, end: 5 },
        { start: 5, end: 0 },
        { start: 4, end: 6 },
        { start: 6, end: 7 },
        { start: 7, end: 10 },
        { start: 10, end: 9 },
        { start: 9, end: 8 },
        { start: 8, end: 4 }
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

.point {
  fill: red;
}

.segment {
  stroke: black;
  stroke-width: 18;
  stroke-linecap: round;
}
</style>

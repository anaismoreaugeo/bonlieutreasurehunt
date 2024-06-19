<template>
  <div class="treasure-result">
    <div class="content">
      <div class="center-square">
        <SliderSquare class="inner-square top-left" />
        <SliderSquare class="inner-square top-right" />
        <SliderSquare class="inner-square bottom-left" />
        <SliderSquare class="inner-square bottom-right" />
      </div>
    </div>
    <div class="bottom-dots">
      <div class="dot red"></div>
      <div class="dot blue"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
    </div>
  </div>
</template>

<script>
import SliderSquare from './TreasureSlider/SliderSquare.vue';

export default {
  name: 'TreasureResult',
  components: {
    SliderSquare
  }
};
</script>

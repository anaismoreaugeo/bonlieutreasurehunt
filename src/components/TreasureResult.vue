<template>
  <div class="treasure-result">
    <div class="content">
      <div class="center-square">
        <button class="download-btn" @click="downloadImage">
          <i class="fas fa-download"></i>
        </button>
        <SliderSquare class="inner-square top-left" :colorClass="colors[0]" @update-last-clicked="updateLastClicked(0)" :id="0"/>
        <SliderSquare class="inner-square top-right" :colorClass="colors[1]" @update-last-clicked="updateLastClicked(1)" :id="1" />
        <SliderSquare class="inner-square bottom-left" :colorClass="colors[2]" @update-last-clicked="updateLastClicked(2)" :id="2" />
        <SliderSquare class="inner-square bottom-right" :colorClass="colors[3]" @update-last-clicked="updateLastClicked(3)" :id="3" />
      </div>
    </div>
    <div class="bottom-dots">
      <button class="dot red" @click="changeColor('red-stroke')"></button>
      <button class="dot blue" @click="changeColor('blue-stroke')"></button>
      <button class="dot yellow" @click="changeColor('yellow-stroke')"></button>
      <button class="dot green" @click="changeColor('green-stroke')"></button>
    </div>
  </div>
</template>

<script>
import SliderSquare from './SliderSquare.vue';
import html2canvas from 'html2canvas';

export default {
  name: 'TreasureResult',
  components: {
    SliderSquare
  },
  data() {
    return {
      colors: ['cls-1', 'cls-1', 'cls-1', 'cls-1'],
      lastClickedIndex: null
    };
  },
  methods: {
    updateLastClicked(index) {
      this.lastClickedIndex = index;
    },
    changeColor(colorClass) {
      if (this.lastClickedIndex !== null) {
        const updatedColors = [...this.colors];
        updatedColors[this.lastClickedIndex] = colorClass;
        this.colors = updatedColors;
        this.lastClickedIndex = null; // Reset last clicked index
      }
    },

    async downloadImage() {
      const link = document.createElement('a');
      link.download = 'treasure-result.png';
      link.href = await this.createImage();
      link.click();
    },

    async createImage(){
      const element = this.$el.querySelector('.center-square');
      const canvas = await html2canvas(element);
      return canvas.toDataURL('image/png');
    }


  }
};
</script>

<template>
  <div>
    <h2>MINI-JEU !</h2>
    <p>TRACEZ LE DESSIN SANS REPASSER PAR LES MÊMES SEGMENTS</p>
    <!-- <small>{{ title }}{{ description }}</small> -->
    <div class="game-container" @mousedown="startDrawing" @mousemove="draw" @mouseup="endDrawing" @mouseleave="endDrawing" @touchstart="startDrawing" @touchmove="draw" @touchend="endDrawing">
      <slot></slot>
      <svg ref="traceSvg" :viewBox="viewBox" class="trace-svg">
        <path :d="pathData" stroke="red" stroke-width="20" fill="none"/>
      </svg>
    </div>
    <label>
      <input type="checkbox" v-model="isValidated" @change="validate">
      Cochez pour valider
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseTotem',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    totem: {
      type: String,
      required: true
    },
    viewBox: {
      type: String,
      default: "0 0 600 600"
    },
    points: {
      type: Array,
      required: true
    },
    segments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isValidated: false,
      path: [],
      drawing: false,
      pathData: '',
      usedSegments: new Set()
    };
  },
  methods: {
    validate() {
      if (this.isValidated) {
        this.$store.dispatch('activateTotem', this.totem);
        this.checkAllTotemsActive();
      }
    },
    checkAllTotemsActive() {
      const allTotemsActive = Object.values(this.$store.state.totems).every(status => status);
      if (allTotemsActive) {
        this.$router.push({ name: 'TreasureResult' });
      } else {
        this.$router.push({ name: 'HuntingResult' });
      }
    },
    startDrawing(event) {
      const { clientX, clientY } = event.type.includes('touch') ? event.touches[0] : event;
      const { x, y } = this.getSvgCoordinates(clientX, clientY);
      this.path = [{ x, y }];
      this.drawing = true;
    },
    draw(event) {
      if (!this.drawing) return;
      const { clientX, clientY } = event.type.includes('touch') ? event.touches[0] : event;
      const { x, y } = this.getSvgCoordinates(clientX, clientY);

      const lastPoint = this.path[this.path.length - 1];
      const segmentKey = `${lastPoint.x},${lastPoint.y}-${x},${y}`;

      if (!this.usedSegments.has(segmentKey)) {
        this.path.push({ x, y });
        this.usedSegments.add(segmentKey);
        this.usedSegments.add(`${x},${y}-${lastPoint.x},${lastPoint.y}`); 
        this.updatePathData();
      }
    },
    endDrawing() {
      this.drawing = false;
      if (this.checkSolution()) {
        alert('Correct!');
      } else {
        alert('Incorrect, try again.');
      }
      this.path = [];
      this.pathData = '';
      this.usedSegments.clear();
    },
    getSvgCoordinates(clientX, clientY) {
      const svg = this.$refs.traceSvg;
      const point = svg.createSVGPoint();
      point.x = clientX;
      point.y = clientY;
      const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
      return { x, y };
    },
    updatePathData() {
      this.pathData = this.path.map((point, index) => {
        return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`;
      }).join(' ');
    },
    checkSolution() {
      const requiredSegments = new Set(this.segments.map(({ from, to }) => `${from}-${to}`));
      const drawnSegments = new Set(this.usedSegments);
      for (let segment of requiredSegments) {
        if (!drawnSegments.has(segment) && !drawnSegments.has(segment.split('-').reverse().join('-'))) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style scoped>
.game-container {
  position: relative;
  width: 70%;
  height: auto;
  margin: 0 auto;
}

.base-svg, .trace-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.trace-svg {
  pointer-events: none; 
}
</style>

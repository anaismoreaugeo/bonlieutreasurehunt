<template>
  <div class="mini-game-instructions-container">
    <h1>MINI-JEU !</h1>
    <p>TRACEZ LE DESSIN SANS REPASSER PAR LES MEMES SEGMENTS</p>
  </div>
  <div class="svg-game">
    <svg :viewBox="viewBox"
         @mousedown="startDrawing($event, 'mouse')" 
         @mousemove="drawLine($event, 'mouse')" 
         @mouseup="endDrawing"
         @mouseleave="endDrawing"
         @touchstart="startDrawing($event, 'touch')" 
         @touchmove="drawLine($event, 'touch')" 
         @touchend="endDrawing"
         @touchcancel="endDrawing">
      <!-- Dessiner les points -->
      <circle v-for="(point, index) in points" :key="index" :cx="point.x" :cy="point.y" :r="5" class="point"/>
      
      <!-- Afficher les indices si showIndices est true -->
      <g v-if="showIndices">
        <text v-for="(point, index) in points" :key="'text-' + index" :x="point.x + 10" :y="point.y - 10" class="index-text">{{ index }}</text>
      </g>

      <!-- Dessiner les segments déjà tracés -->
      <line v-for="(segment, index) in activeSegments" :key="index" 
            :x1="points[segment.start].x" :y1="points[segment.start].y"
            :x2="points[segment.end].x" :y2="points[segment.end].y" class="segment"/>
      
      <!-- Dessiner le segment en cours -->
      <line v-if="drawing" :x1="points[startPoint].x" :y1="points[startPoint].y" :x2="currentPoint.x" :y2="currentPoint.y" class="segment"/>
    </svg>
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
    points: {
      type: Array,
      required: true
    },
    segments: {
      type: Array,
      required: true
    },
    viewBox: {
      type: String,
      default: '0 0 200 200'
    },
    autoDrawSegments: {
      type: Boolean,
      default: false
    },
    showIndices: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localSegments: [], // Initialisation sans segments
      startPoint: null,
      currentPoint: null,
      drawing: false
    };
  },
  computed: {
    activeSegments() {
      return this.autoDrawSegments ? this.segments : this.localSegments;
    }
  },
  methods: {
    startDrawing(event, inputType) {
      const point = this.getSVGPoint(event, inputType);
      const closestPointIndex = this.getClosestPointIndex(point);
      if (closestPointIndex !== null) {
        this.startPoint = closestPointIndex;
        this.currentPoint = this.points[closestPointIndex];
        this.drawing = true;
      }
    },
    drawLine(event, inputType) {
      if (this.drawing) {
        const point = this.getSVGPoint(event, inputType);
        const closestPointIndex = this.getClosestPointIndex(point);
        if (closestPointIndex !== null && closestPointIndex !== this.startPoint && !this.segmentExists(this.startPoint, closestPointIndex)) {
          const newSegment = { start: this.startPoint, end: closestPointIndex };
          if (this.verifySegment(newSegment)) {
            this.localSegments.push(newSegment);
            this.startPoint = closestPointIndex;
            this.checkCompletion(); // Appeler la méthode de vérification de complétion
          }
        }
        this.currentPoint = point;
      }
    },
    endDrawing() {
      this.drawing = false;
      this.startPoint = null;
      this.currentPoint = null;

      if (!this.checkCompletion()) {
        this.resetDrawing();
      }
    },
    resetDrawing() {
      this.localSegments = [];
    },
    getSVGPoint(event, inputType) {
      const svg = event.target.closest('svg');
      const pt = svg.createSVGPoint();
      
      if (inputType === 'mouse') {
        pt.x = event.clientX;
        pt.y = event.clientY;
      } else if (inputType === 'touch' && event.touches.length > 0) {
        pt.x = event.touches[0].clientX;
        pt.y = event.touches[0].clientY;
      }

      const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
      return { x: cursorPoint.x, y: cursorPoint.y };
    },
    getClosestPointIndex(point) {
      let minDistance = Infinity;
      let closestPointIndex = null;
      this.points.forEach((p, index) => {
        const distance = Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestPointIndex = index;
        }
      });
      return minDistance < 10 ? closestPointIndex : null;
    },
    segmentExists(startIndex, endIndex) {
      return this.localSegments.some(segment => 
        (segment.start === startIndex && segment.end === endIndex) || 
        (segment.start === endIndex && segment.end === startIndex));
    },
    verifySegment(newSegment) {
      // Méthode de vérification du segment par rapport au tableau segments
      return this.segments.some(segment => 
        (segment.start === newSegment.start && segment.end === newSegment.end) || 
        (segment.start === newSegment.end && segment.end === newSegment.start));
    },
    checkCompletion() {
      if (this.localSegments.length !== this.segments.length) {
        return false;
      }
      const sortedLocalSegments = this.localSegments.map(seg => [seg.start, seg.end].sort().join('-')).sort();
      const sortedSegments = this.segments.map(seg => [seg.start, seg.end].sort().join('-')).sort();
      
      const isComplete = sortedLocalSegments.every((seg, index) => seg === sortedSegments[index]);
      if (isComplete) {
        console.log('Bravo');
      }
      return isComplete;
    }
  }
};
</script>

<style>
.svg-game {
  width: 100%;
  height: 100%;
}
svg {
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
.point {
  fill: red;
}
.segment {
  stroke: black;
  stroke-width: 2;
}
.index-text {
  fill: black;
  font-size: 12px;
  font-family: Arial, sans-serif;
}
</style>

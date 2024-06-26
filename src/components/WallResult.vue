<template>
  <div class="wall-result">
    <div class="instruction">
      <h2 class="bold">CHOISISSEZ VOTRE PLACE</h2>
      <p>CLIQUEZ SUR UNE CASE</p>
    </div>
    <div class="result-container">
      <div class="grid">
        <div 
          v-for="index in 24" 
          :key="index" 
          class="grid-cell" 
          @click="selectCell(index)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WallResult',
  methods: {
    selectCell(index) {
      console.log('Cell selected:', index);
    }
  }
};
</script>

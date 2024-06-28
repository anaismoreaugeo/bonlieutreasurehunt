<template>
  <div>
    <h2>TOTEM DÉBLOQUÉ !</h2>
    <div class="flex-center" v-html="svg"></div>
    <p>Ce totem vous permet d'avoir des nouvelles formes pour créer votre propre totem :</p>
    <div class="unlocked-shapes">
      <div v-for="(shape, index) in unlockedShapes" :key="index" class="shape-item" v-html="shape"></div>
    </div>
    <p>Trouvez tous les totems pour débloquer toutes les formes</p>
    <button @click="close" class="ui-btn-black">Continuer</button>
  </div>
</template>

<script>
export default {
  props: {
    svg: {
      type: String,
      required: true
    },
    svgName: {
      type: String,
      required: false
    },
    unlockedShapes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "HuntingResult" });
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.unlocked-shapes {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.shape {
  max-width: 33vw;
  max-height: 33vh;
}

.flex-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shape-item {
  margin: 0 10px;
}
</style>

<template>
  <main>
    <div class="hunting-result">
      <div class="instruction">
        <p>Cherchez les totems puis allez dans la page Home pour les scanner</p>
      </div>
      <div class="result-container">
        <div class="result-box left" :class="{ active: isActive('totem1') }">
          <div class="square-container">
            <div class="square">
              <button>Totem 1</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
        <div class="result-box right" :class="{ active: isActive('totem2') }">
          <div class="square-container">
            <div class="square">
              <button>Totem 2</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
        <div class="result-box left" :class="{ active: isActive('totem3') }">
          <div class="square-container">
            <div class="square">
              <button>Totem 3</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
        <div class="result-box right" :class="{ active: isActive('totem4') }">
          <div class="square-container">
            <div class="square">
              <button>Totem 4</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HuntingResult',
  computed: {
    isActive() {
      return (totem) => this.$store.getters.isActive(totem);
    },
  }
};
</script>

<style scoped>
.result-box.active .square {
  background-color: green;
}
</style>

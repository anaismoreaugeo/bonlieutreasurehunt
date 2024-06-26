<template>
    <div class="hunting-result">
      <div class="instruction">
        <h2 class="bold">CARNET DE TOTEMS </h2>
        <p>TROUVEZ TOUS LES TOTEMS POUR AJOUTER VOTRE SYMBOLE SUR LE MUR DE BONLIEU</p>
      </div>
      <div class="result-container">
        <div class="result-box left" :class="{ active: isActive('totem1') }">
          <div class="square-container">
            <img class="rec" src="@/assets/rec-canard.png">
            <div class="square">
              <button><img src="@/assets/CANARD.png"></button>
            </div>
          </div>
          <div class="content">
            <p>LE CANARD</p>
          </div>
        </div>
        <div class="result-box right" :class="{ active: isActive('totem2') }">
          <div class="square-container">
            <img class="rec poisson" src="@/assets/rec-poisson.png">
            <div class="square">
              <button> <img src="@/assets/POISSON.png"></button>
            </div>
          </div>
          <div class="content">
            <p>LE POISSON</p>
          </div>
        </div>
        <div class="result-box left" :class="{ active: isActive('totem3') }">
          <div class="square-container">
            <img class="rec poulpe" src="@/assets/rec-poulpe.png">
            <div class="square">
              <button>
                <img src="@/assets/POULPE.png">
              </button>
            </div>
          </div>
          <div class="content">
           <p>LE POULPE</p>
          </div>
        </div>
        <div class="result-box right" :class="{ active: isActive('totem4') }">
          <div class="square-container">
            <img class="rec bateau" src="@/assets/rec-bateau.png">
            <div class="square">
              <button>
                <img src="@/assets/BATEAU.png">
              </button>
            </div>
          </div>
          <div class="content">
            <p>LE BATEAU</p>
          </div>
        </div>
      </div>
    </div>
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


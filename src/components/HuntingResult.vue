<template>
  <main>
    <div class="hunting-result">
      <div class="instruction">
        <p>Cherchez les totems puis allez dans la page Home pour les scanner</p>
      </div>
      <div class="result-container">
        <div class="result-box left">
          <div class="square-container">
            <div class="square">
              <button>Totem 1</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
        <div class="result-box right">
          <div class="square-container">
            <div class="square">
              <button>Totem 2</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
        <div class="result-box left">
          <div class="square-container">
            <div class="square">
              <button>Totem 3</button>
            </div>
          </div>
          <div class="content">
            <!-- Espace pour le contenu -->
          </div>
        </div>
        <div class="result-box right">
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
};
</script>
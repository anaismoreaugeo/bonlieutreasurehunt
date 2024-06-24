<template>
  <div class="home">
    <h1>Totem</h1>
    <div class="code-input">
      <label for="code">Entrez le code :</label>
      <input v-model="code" type="text" id="code" name="code" placeholder="Votre code ici">
      <button @click="checkCode">Entrer</button>
    </div>
    <div class="scanner-container">
      <div class="scanner-placeholder">
        <img id="scanner-icon" class="scanner-icon" src="@/assets/qr-code.png" alt="Scanner" width="100" height="100" @click="toggleScanner" v-if="!isScannerActive">
        <qrcode-stream v-if="isScannerActive" @decode="onDecode" @init="onInit" @click="toggleScanner"></qrcode-stream>
      </div>
    </div>
  </div>
  <AppModal v-if="isModalOpen" @close="isModalOpen = false">
    <template #header>
      <div class="modal-header">{{ modalHeader }}</div>
    </template>
    <template #body>
      <component :is="currentComponent"></component>
    </template>
  </AppModal>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import AppModal from '../components/AppModal.vue';
import AppTotem1 from '../components/Games/AppTotem1.vue';
import AppTotem2 from '../components/Games/AppTotem2.vue';
import AppTotem3 from '../components/Games/AppTotem3.vue';
import AppTotem4 from '../components/Games/AppTotem4.vue';

export default {
  name: 'AppHome',
  components: {
    AppModal,
    AppTotem1,
    AppTotem2,
    AppTotem3,
    AppTotem4,
    QrcodeStream
  },
  data() {
    return {
      code: '',
      isModalOpen: false,
      modalHeader: '',
      currentComponent: null,
      decodedResult: '',
      isScannerActive: false
    };
  },
  methods: {
    checkCode() {
      const totem = this.getTotemByCode(this.code);
      if (totem) {
        this.currentComponent = this.getComponent(totem);
        this.isModalOpen = true;
      } else {
        alert("Code incorrect, veuillez réessayer.");
      }
    },
    toggleScanner() {
      this.isScannerActive = !this.isScannerActive;
    },
    onDecode(result) {
      this.code = result;
      this.checkCode();
      this.isScannerActive = false;  // Désactiver le scanner après avoir décodé
    },
    onInit(promise) {
      promise.then(() => {
        console.log('Successfully initialized!');
      }).catch(error => {
        if (error.name === 'NotAllowedError') {
          console.error('Permission denied.');
        } else if (error.name === 'NotFoundError') {
          console.error('No camera found.');
        } else {
          console.error(error);
        }
      });
    },
    getTotemByCode(code) {
      switch (code) {
        case 'code1':
          return 'totem1';
        case 'code2':
          return 'totem2';
        case 'code3':
          return 'totem3';
        case 'code4':
          return 'totem4';
        default:
          return null;
      }
    },
    getComponent(totem) {
      switch (totem) {
        case 'totem1':
          return 'AppTotem1';
        case 'totem2':
          return 'AppTotem2';
        case 'totem3':
          return 'AppTotem3';
        case 'totem4':
          return 'AppTotem4';
        default:
          return null;
      }
    },
  },
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 60px;
}
.code-input {
  margin-bottom: 20px;
}
</style>

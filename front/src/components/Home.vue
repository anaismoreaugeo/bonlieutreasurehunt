<template>
  <div class="home">
    <div class="instruction">
        <h2 class="bold" style="font-size: 22px">
          LA CHASSE AUX <br>
          TOTEMS EST OUVERTE !
        </h2>
        <p>TROUVEZ ET SCANNEZ UN TOTEM</p>
    </div>
    <div class="scanner-container">
      <div class="scanner-placeholder">
        <img id="scanner-icon" class="scanner-icon" src="@/assets/qr-code.png" alt="Scanner" width="100" height="100" @click="toggleScanner" v-if="!isScannerActive">
        <qrcode-stream @decode="onDecode" @detect="onDetect" v-if="isScannerActive"></qrcode-stream>
      </div>
    </div>
    <div class="line-container">
      <div class="line"></div>
      <div>OU</div>
      <div class="line"></div>
    </div>
    <div class="code-input">
      <p>ENTREZ LE CODE</p>
      <input v-model="code" type="text" id="code" name="code" placeholder="X X X X">
      <button class="ui-btn-black" @click="checkCode">ENTRER</button>
    </div>
  </div>
  <AppModal v-if="isModalOpen" @close="isModalOpen = false">
    <template #header>
      <div class="modal-header">{{ modalHeader }}</div>
    </template>
    <template #body>
      <component :is="currentComponent" @close="popCongratModal"></component>
    </template>
  </AppModal>
  <!-- Modale de félicitations -->
  <Modal v-if="showCongratsModal" @close="showCongratsModal = false">
    <h1>Bravo !</h1>
  </Modal>
  <!-- Instruction Modale -->
  <Modal v-if="showInstructionModal" @close="showInstructionModal = false">
    <InstructionsModal @close="showInstructionModal = false"/>
  </Modal>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import { mapGetters } from 'vuex';
import AppModal from '../components/AppModal.vue';
import AppTotem1 from '../components/Games/AppTotem1.vue';
import AppTotem2 from '../components/Games/AppTotem2.vue';
import AppTotem3 from '../components/Games/AppTotem3.vue';
import AppTotem4 from '../components/Games/AppTotem4.vue';
import InstructionsModal from './InstructionsModal.vue';
import Modal from './UnlockTotem.vue';

export default {
  name: 'AppHome',
  components: {
    AppModal,
    AppTotem1,
    AppTotem2,
    AppTotem3,
    AppTotem4,
    QrcodeStream,
    Modal,
    InstructionsModal
  },
  data() {
    return {
      code: '',
      isModalOpen: false,
      modalHeader: '',
      currentComponent: null,
      isScannerActive: false,
      showCongratsModal: false,
      showInstructionModal: false // État de la modale d'instruction
    };
  },
  computed: {
    ...mapGetters(['isActive'])
  },
  mounted() {
    // Vérifie si un paramètre totemCode est présent dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const totemCode = urlParams.get('totemCode');

    if (totemCode) {
      this.code = totemCode;
      this.checkCode();
    }

    // Vérifie si aucun totem n'est activé
    if (!this.isActive('totem1') && !this.isActive('totem2') && !this.isActive('totem3') && !this.isActive('totem4')) {
      this.showInstructionModal = true;
    }
  },
  async created() {
    if (this.$route.query.path) {
      await this.$router.push({path: this.$route.query.path});
    }
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
    onDecode(decodedString) {
      console.log('QR code decoded:', decodedString);
      this.code = decodedString;
      this.checkCode();
    },
    onInit(promise) {
      promise.then(() => {
        console.log('Camera initialized');
      }).catch(error => {
        console.error('Camera initialization failed:', error);
        if (error.name === 'NotAllowedError') {
          alert('Accès à la caméra refusé!');
        } else if (error.name === 'NotFoundError') {
          alert('Caméra non trouvée!');
        } else {
          alert('Erreur lors de l\'initialisation de la caméra: ' + error.message);
        }
      });
    },
    onDetect(result) {
      console.log('QR code detected:', result);
      const url = new URL(result[0].rawValue);
      const params = new URLSearchParams(url.search);
      const totemCode = params.get('totemCode');

      if (totemCode) {
        this.code = totemCode;
        this.isScannerActive = false;
        this.checkCode();
      } else {
        console.error('Paramètre totemCode non trouvé dans l\'URL');
      }
    },
    popCongratModal() {
      this.showCongratsModal = true;
      this.isModalOpen = false;
    }
  }
};
</script>

<style>
.qrcode-stream {
  width: 100%;
  height: auto;
}
</style>

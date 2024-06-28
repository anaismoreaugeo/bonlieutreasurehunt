<template>
  <div class="home">
    <div class="instruction">
        <h2 class="bold">LA CHASSE AUX TOTEMS EST OUVERTE ! </h2>
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
  <AppModal v-if="showCongratsModal" @close="showCongratsModal = false">
    <template #body>
      <UnlockTotem 
      @close="showCongratsModal = false"
      :svg="getSvg(code)"
      :svgName="getSvgName(code)"
      :unlockedShapes="getUnlockedShapes(code)"
      />
    </template>
  </AppModal>
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
import UnlockTotem, { default as Modal } from './UnlockTotem.vue';

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
    InstructionsModal,
    UnlockTotem
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
    getSvg(totem){
      switch (totem) {
        case 'code1':
          return `<svg class='max-33-vw max-33-vh' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="349px" height="515px" viewBox="0 0 349 514" version="1.1">
                  <g id="surface1">
                  <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 268.117188 257 L 345.621094 179.5 C 347.09375 178.027344 347.917969 176.039062 347.917969 173.957031 C 347.917969 171.875 347.09375 169.875 345.621094 168.410156 L 179.507812 2.296875 C 176.449219 -0.765625 171.46875 -0.765625 168.410156 2.296875 L 2.296875 168.402344 C 0.824219 169.875 0 171.863281 0 173.945312 C 0 176.027344 0.824219 178.027344 2.296875 179.488281 L 79.796875 256.988281 L 2.296875 334.496094 C -0.761719 337.558594 -0.761719 342.523438 2.296875 345.597656 L 168.410156 511.703125 C 169.882812 513.175781 171.871094 514 173.953125 514 C 176.035156 514 178.035156 513.175781 179.5 511.703125 L 345.609375 345.597656 C 348.667969 342.535156 348.667969 337.566406 345.609375 334.496094 L 268.109375 256.988281 Z M 18.941406 173.945312 L 173.953125 18.9375 L 328.964844 173.945312 L 257.007812 245.890625 L 179.5 168.371094 C 176.550781 165.421875 171.347656 165.421875 168.398438 168.371094 L 90.886719 245.890625 Z M 245.917969 256.988281 L 173.953125 328.941406 L 101.996094 256.988281 L 173.953125 185.023438 Z M 173.953125 495.058594 L 18.941406 340.050781 L 90.898438 268.097656 L 168.410156 345.605469 C 169.945312 347.140625 171.945312 347.90625 173.953125 347.90625 C 175.964844 347.90625 177.972656 347.140625 179.5 345.605469 L 257.007812 268.097656 L 328.964844 340.050781 Z M 125.816406 170.90625 C 125.816406 158.210938 115.53125 147.914062 102.832031 147.914062 C 90.136719 147.914062 79.828125 158.21875 79.828125 170.90625 C 79.828125 183.589844 90.136719 193.898438 102.832031 193.898438 C 115.53125 193.898438 125.816406 183.601562 125.816406 170.90625 Z M 245.09375 193.898438 C 257.792969 193.898438 268.089844 183.601562 268.089844 170.90625 C 268.089844 158.210938 257.792969 147.914062 245.09375 147.914062 C 232.398438 147.914062 222.09375 158.21875 222.09375 170.90625 C 222.09375 183.589844 232.398438 193.898438 245.09375 193.898438 Z M 245.09375 193.898438 "/>
                  </g>
                  </svg>`;
        case 'code2':
          return `<svg class='max-33-vw max-33-vh' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="349px" height="194px" viewBox="0 0 348 194" version="1.1">
                  <g id="surface1">
                  <path style="fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 71.454315 51.555735 L 24.911997 51.555735 L 1.810693 27.522995 L 94.810401 27.522995 Z M 71.454315 51.555735 " transform="matrix(3.587629,0,0,3.592593,0,0)"/>
                  <path style="fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 24.79985 26.478093 L 48.310547 2.444265 L 71.822333 26.478093 " transform="matrix(3.587629,0,0,3.592593,0,0)"/>
                  <path style="fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:10;" d="M 42.563802 21.252497 C 43.717942 21.252497 44.653231 20.317413 44.653231 19.162693 C 44.653231 18.009061 43.717942 17.07289 42.563802 17.07289 C 41.409662 17.07289 40.473285 18.009061 40.473285 19.162693 C 40.473285 20.317413 41.409662 21.252497 42.563802 21.252497 Z M 42.563802 21.252497 " transform="matrix(3.587629,0,0,3.592593,0,0)"/>
                  <path style="fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:10;" d="M 55.10255 21.252497 C 56.25669 21.252497 57.193068 20.317413 57.193068 19.162693 C 57.193068 18.009061 56.25669 17.07289 55.10255 17.07289 C 53.948411 17.07289 53.013122 18.009061 53.013122 19.162693 C 53.013122 20.317413 53.948411 21.252497 55.10255 21.252497 Z M 55.10255 21.252497 " transform="matrix(3.587629,0,0,3.592593,0,0)"/>
                  </g>
                  </svg>`;
        case 'code3':
          return  `<svg class='max-33-vw max-33-vh' viewBox="0 0 347 130">
                    <path style="stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 344.601562 60.882812 L 287.765625 3.890625 C 286.695312 2.816406 285.238281 2.214844 283.722656 2.214844 L 166.570312 2.214844 C 163.417969 2.214844 160.859375 4.777344 160.859375 7.941406 L 160.859375 55.316406 L 105.296875 3.734375 C 104.238281 2.753906 102.855469 2.207031 101.414062 2.207031 L 8.804688 2.207031 C 6.496094 2.207031 4.414062 3.605469 3.527344 5.746094 C 2.640625 7.886719 3.128906 10.351562 4.765625 11.992188 L 57.691406 65.046875 L 4.878906 118.011719 C 3.246094 119.652344 2.757812 122.113281 3.644531 124.253906 C 4.527344 126.398438 6.613281 127.792969 8.921875 127.792969 L 101.414062 127.792969 C 102.851562 127.792969 104.238281 127.246094 105.296875 126.265625 L 160.859375 74.765625 L 160.859375 122.054688 C 160.859375 125.21875 163.417969 127.78125 166.570312 127.78125 L 283.605469 127.78125 C 285.117188 127.78125 286.574219 127.179688 287.644531 126.101562 L 344.601562 68.980469 C 346.835938 66.738281 346.835938 63.109375 344.601562 60.875 Z M 99.179688 116.328125 L 22.71875 116.328125 L 69.820312 69.097656 C 70.890625 68.023438 71.492188 66.5625 71.492188 65.042969 C 71.492188 63.523438 70.890625 62.066406 69.820312 60.992188 L 22.609375 13.671875 L 99.175781 13.671875 L 154.511719 65.042969 Z M 281.242188 116.324219 L 172.289062 116.324219 L 172.289062 13.675781 L 281.359375 13.675781 L 332.484375 64.933594 Z"/>
                    <circle cx="262.039062" cy="64.996094" r="17.789062" fill="black"/>
                  </svg>`;
        case 'code4':
          return  `<svg class='max-33-vw max-33-vh' viewBox="0 0 351 513">
                    <path style="stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 347.183594 168.691406 L 183.78125 5.746094 C 180.28125 2.253906 174.613281 2.253906 171.117188 5.746094 L 7.699219 168.691406 C 6.023438 170.363281 5.082031 172.640625 5.082031 175 L 5.082031 500.945312 C 5.082031 504.558594 7.261719 507.808594 10.613281 509.1875 C 11.722656 509.644531 12.886719 509.867188 14.039062 509.867188 C 16.363281 509.867188 18.65625 508.957031 20.375 507.253906 L 177.453125 350.617188 L 334.53125 507.253906 C 337.097656 509.8125 340.941406 510.574219 344.292969 509.1875 C 347.636719 507.808594 349.8125 504.546875 349.8125 500.945312 L 349.8125 175 C 349.8125 172.628906 348.871094 170.363281 347.195312 168.691406 Z M 331.902344 479.394531 L 183.78125 331.691406 C 180.28125 328.199219 174.613281 328.199219 171.117188 331.691406 L 22.984375 479.394531 L 22.984375 178.707031 L 177.453125 24.683594 L 331.910156 178.699219 L 331.910156 479.382812 Z M 260.050781 238.460938 C 274.539062 238.460938 286.269531 226.75 286.269531 212.300781 C 286.269531 197.855469 274.539062 186.144531 260.050781 186.144531 C 245.5625 186.144531 233.800781 197.855469 233.800781 212.300781 C 233.800781 226.75 245.5625 238.460938 260.050781 238.460938 Z M 94.875 186.144531 C 80.378906 186.144531 68.625 197.855469 68.625 212.300781 C 68.625 226.75 80.378906 238.460938 94.875 238.460938 C 109.375 238.460938 121.097656 226.75 121.097656 212.300781 C 121.097656 197.855469 109.351562 186.144531 94.875 186.144531 Z"/>
                    <circle cx="260.050781" cy="212.300781" r="26.160156" fill="black"/>
                    <circle cx="94.875" cy="212.300781" r="26.160156" fill="black"/>
                  </svg>`;
        default:
          return null;
      }
    },
    getSvgName(totem) {
      switch (totem) {
        case 'code1':
          return 'Le canard';
        case 'code2':
          return "L'extraterrestre";
        case 'code3':
          return 'Le poisson';
        case 'code4':
          return 'Le poulpe';
        default:
          return null;
      }
    },
    getUnlockedShapes(code){
      switch (code) {
        case 'code1':
          return [
            `<svg width="80" class='cls-1' height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40.9142 75.5858L75.5858 40.9142C76.3668 40.1332 76.3668 38.8668 75.5858 38.0858L40.9142 3.41421C40.1332 2.63316 38.8668 2.63316 38.0858 3.41421L3.41422 38.0858C2.63317 38.8668 2.63317 40.1332 3.41422 40.9142L38.0858 75.5858C38.8668 76.3668 40.1332 76.3668 40.9142 75.5858Z" stroke-width="5" stroke-linejoin="round"/></svg>`,
            `<svg width="80" class='cls-1' height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="74" height="74" rx="3" stroke-width="5"/><circle cx="56" cy="23.4314" r="4"/><circle cx="24" cy="57.4314" r="4"/></svg>`
          ];
        case 'code2':
          return [
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M74.7974 39H5.0128C3.20567 39 2.32524 36.7933 3.63605 35.5493L37.645 3.27394C38.4026 2.55494 39.5859 2.54001 40.3614 3.23965L76.1371 35.515C77.4972 36.742 76.6292 39 74.7974 39Z" stroke-width="5" stroke-linejoin="round"/></svg>`,
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="23" cy="21.875" r="4"/><path d="M73.5718 6.29162L6.66181 72.9748C5.4009 74.2314 3.25 73.3383 3.25 71.5581L3.24999 4.87501C3.25 3.77043 4.14542 2.875 5.24999 2.875L72.16 2.875C73.9434 2.875 74.835 5.03267 73.5718 6.29162Z" stroke-width="5" stroke-linejoin="round"/></svg>`,
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M33.9854 44L5 44C3.89543 44 3 43.1046 3 42L3 5.3C3 4.19544 3.89544 3.3 5 3.3L72.0446 3.30001C73.844 3.30001 74.7282 5.49068 73.4329 6.7397L35.3737 43.4397C35.0009 43.7991 34.5032 44 33.9854 44Z" stroke-width="5" stroke-linejoin="round"/></svg>`,
          ];
        case 'code3':
          return [
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M77.1733 40.2416L51.98 76.1487C51.6056 76.6823 50.9946 77 50.3428 77L5.00557 77C3.35645 77 2.41597 75.1164 3.4069 73.7982L28.5918 40.296C29.1379 39.5696 29.1256 38.5664 28.5619 37.8537L3.56261 6.24056C2.52563 4.92926 3.45959 3 5.13136 3L50.3731 3C51.008 3 51.6052 3.30147 51.9823 3.81232L77.1452 37.9052C77.6558 38.597 77.6671 39.5377 77.1733 40.2416Z" stroke-width="5" stroke-linejoin="round"/></svg>`,
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M45.5567 77L5 77C3.89543 77 3 76.1046 3 75L3 5C3 3.89543 3.89543 3 5 3L45.5567 3C46.154 3 46.7201 3.26696 47.1 3.72786L75.9513 38.7279C76.5603 39.4666 76.5603 40.5334 75.9513 41.2722L47.1 76.2721C46.7201 76.733 46.154 77 45.5567 77Z" stroke-width="5" stroke-linejoin="round"/><circle cx="33" cy="40" r="4"/></svg>`,
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M41.349 41.4098L6.41865 76.5599C5.16054 77.8259 3.00001 76.9349 3 75.1501L3 4.84991C3 3.06508 5.16053 2.17412 6.41864 3.44014L41.349 38.5902C42.1242 39.3703 42.1242 40.6298 41.349 41.4098Z" stroke-width="5" stroke-linejoin="round"/></svg>`
          ];
        case 'code4':
          return [
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40.5247 3.48387L76.4249 39.9346C76.7934 40.3088 77 40.8129 77 41.338V75.032C77 76.8331 74.8058 77.7164 73.5579 76.4177L40.5424 42.0578C39.7416 41.2244 38.4031 41.2413 37.6236 42.0947L6.47669 76.1938C5.24537 77.5418 3 76.6707 3 74.8449V41.3087C3 40.801 3.19306 40.3123 3.54002 39.9417L37.6398 3.52037C38.4165 2.69084 39.7274 2.67426 40.5247 3.48387Z" stroke-width="5" stroke-linejoin="round"/></svg>`,
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M77 37.7787L77 5C77 3.89543 76.1046 3 75 3L5 3C3.89543 3 3 3.89543 3 5L3 73.7247C3 75.2209 4.58266 76.1873 5.91361 75.5038L75.9136 39.5579C76.5806 39.2154 77 38.5285 77 37.7787Z" stroke-width="5" stroke-linejoin="round"/><circle cx="8" cy="8" r="4" transform="matrix(-1 -2.18557e-08 -2.18557e-08 1 48 17)"/></svg>`,
            `<svg class='cls-1' width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M3.91422 6.28922L74.7108 77.0858C75.9707 78.3457 78.125 77.4534 78.125 75.6716L78.125 4.875C78.125 3.77043 77.2296 2.875 76.125 2.875L5.32843 2.875C3.54662 2.875 2.65429 5.02929 3.91422 6.28922Z" stroke-width="5" stroke-linejoin="round"/></svg>`
          ];
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

.shape {
  max-width: 33vw;
  max-height: 33vh;
}
</style>

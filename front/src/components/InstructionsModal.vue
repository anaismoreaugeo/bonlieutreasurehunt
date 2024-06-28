<template>
    <div>
        <h2 style="text-transform: uppercase; font-size: 22px">
          BIENVENUE à vous <br>
          chasseur de totem !</h2>
        <p style="text-transform: uppercase; font-size: 16px">
          Votre mission si vous <br>
          l’acceptez : retrouver tout <br>
          les totems et collecter des <br>
          formes pour reconstituer le <br>
          mur digital de bonlieu !
        </p>
        <img src="../assets/wall_instructions.png" alt="" srcset="">
        <button @click="closeModal" class="ui-btn-black">Continuer</button>
    </div>
</template>

<script>
export default {
    name: 'InstructionsModal',
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>
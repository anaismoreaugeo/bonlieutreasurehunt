<template>
    <div>
        <h2>BIENVENUE à vous chasseur de totem !</h2>
        <p>Votre mission si vous l’acceptez : retrouver tout les totems et collecter des formes pour reconstituer le mur digital de bonlieu !</p>
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
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <label>
      <input type="checkbox" v-model="isValidated" @change="validate">
      Cochez pour valider
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseTotem',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    totem: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isValidated: false
    };
  },
  methods: {
    validate() {
      if (this.isValidated) {
        this.$store.dispatch('activateTotem', this.totem);
        this.$router.push({ name: 'HuntingResult' });
      }
    }
  }
};
</script>

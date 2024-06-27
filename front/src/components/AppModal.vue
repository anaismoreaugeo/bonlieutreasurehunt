<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content" @close="close">
      <div class="modal-header" @close="close">
        <slot name="header" @close="close"></slot>
      </div>
      <div class="modal-body">
        <slot name="body" @close="close"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  methods: {
    close() {
      console.log("ca passe par là")
      this.$emit('close');
    }
  }
};
</script>
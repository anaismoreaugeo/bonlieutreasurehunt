<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppModal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 1rem;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
  }
  
  .modal-header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .modal-body {
    font-size: 1rem;
  }
  </style>
  
<template>
  <button
    class="l-footer_btn-top c-btn"
    @click="handleClick"
  >
    <i class="l-footer_btn-top-icon c-btn_icon material-icons">arrow_drop_up</i>
    <span class="l-footer_btn-top-text c-btn_text">BACK TO TOP</span>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import jump from 'jump.js'

  export default class ButtonTop extends Vue {
    handleClick(): void {
      jump('#js-container', {
        duration: 500,
        offset: 0
      });
    }
  }
</script>

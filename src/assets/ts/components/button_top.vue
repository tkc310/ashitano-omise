<style lang="scss">
  .fade {
    &-enter-active,
    &-leave-active {
      transition: opacity .5s;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>

<template>
  <transition name="fade">
    <button
      v-if="isShow"
      class="l-footer_btn-top c-btn"
      @click="handleClick"
    >
      <i class="l-footer_btn-top-icon c-btn_icon material-icons">arrow_drop_up</i>
      <span class="l-footer_btn-top-text c-btn_text">BACK TO TOP</span>
    </button>
  </transition>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator";
  import jump from 'jump.js';
  import { debounce } from 'throttle-debounce';

  @Component
  export default class ButtonTop extends Vue {
    isShow: boolean = false;

    mounted(): void {
      const _this = this;
      if (_this.isPC()) {
        _this.isShow = true;
      } else {
        window.addEventListener('scroll', debounce(500, _this.toggleOpen), true);
      }
    }

    destroyed(): void {
      const _this = this;
      !_this.isPC() &&
        window.removeEventListener('scroll', _this.toggleOpen, true);
    }

    // 641px以上の場合
    isPC() {
      return (window.innerWidth > 640);
    }

    toggleOpen(): void {
      this.isShow = (window.pageYOffset >= 100);
    }

    handleClick(): void {
      jump('#js-container', {
        duration: 500,
        offset: 0
      });
    }
  }
</script>

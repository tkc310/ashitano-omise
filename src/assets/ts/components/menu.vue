<style lang="scss" scoped>
  .is-touch {
    opacity: .8;
  }
</style>

<template>
  <div class="l-header_menu-wrap">
    <button
      class="l-header_menu-btn c-btn"
      :class="isTouch ? 'is-touch' : ''"
      @click="toggleOpen"
      @touchstart="toggleTouch(true)"
      @touchend="toggleTouch(false)"
    >
      <i
        v-if="!isShow"
        class="l-header_btn-menu-icon c-btn_icon material-icons">
        more_vert
      </i>
      <i
        v-if="isShow"
        class="l-header_btn-menu-icon c-btn_icon material-icons">
        close
      </i>
    </button>

    <aside
      class="l-header_menu c-menu"
      :class="isShow ? 'is-show' : ''"
    >
      <nav class="c-menu_nav">
        <ul class="c-menu_list">
          <li class="c-menu_item">
            <a
              href="/about"
              class="c-menu_link"
              data-touch
            >{{global.site_name}}とは</a>
          </li>
          <li class="c-menu_item">
            <a
              href="/request"
              class="c-menu_link"
              data-touch
            >掲載依頼</a>
          </li>
          <li class="c-menu_item">
            <a
              href="/privacy-policy"
              class="c-menu_link"
              data-touch
            >プライバシーポリシー</a>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  const config = require('@root/page_config.json');

  @Component
  export default class Menu extends Vue {
    isShow: boolean = false;
    isTouch: boolean = false;
    global: any = config.global;

    toggleOpen():void {
      this.isShow = !this.isShow;
    }

    toggleTouch(isTouch: boolean):void {
      this.isTouch = isTouch;
    }
  }
</script>

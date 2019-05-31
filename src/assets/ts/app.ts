import Vue from 'vue';
import ButtonTop from '@ts/components/button_top';

const buttonTopNode = document.getElementById('vue-btn-top');
if (buttonTopNode) {
  new Vue({
    render: h => h(ButtonTop)
  }).$mount(buttonTopNode);
}

import Vue from 'vue';
import Menu from '@ts/components/menu';
import ButtonTop from '@ts/components/button_top';
import DeviceInitializer from '@ts/common/device_initializer';

const buttonTopNode = document.getElementById('vue-btn-top');
if (buttonTopNode) {
  new Vue({
    render: h => h(ButtonTop)
  }).$mount(buttonTopNode);
}

const menuNode = document.getElementById('vue-menu');
if (menuNode) {
  new Vue({
    render: h => h(Menu)
  }).$mount(menuNode);
}

window.onload = () => {
  // deviceによって、専用のcssクラスを付与
  const deviceInitializer = new DeviceInitializer();
  deviceInitializer.execute();
};

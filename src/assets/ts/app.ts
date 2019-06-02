import Vue from 'vue';
import ButtonTop from '@ts/components/button_top';
import DeviceInitializer from '@ts/common/device_initializer';

const buttonTopNode = document.getElementById('vue-btn-top');
if (buttonTopNode) {
  new Vue({
    render: h => h(ButtonTop)
  }).$mount(buttonTopNode);
}

window.onload = () => {
  // deviceによって、専用のcssクラスを付与
  const deviceInitializer = new DeviceInitializer();
  deviceInitializer.execute();
};

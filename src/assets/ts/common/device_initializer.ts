import { debounce } from 'throttle-debounce';
import { isPC } from '@ts/utility/browser';

export default class DeviceInitializer {
  containerNode :HTMLElement | null;
  touchNodes :NodeListOf<HTMLElement>;

  constructor() {
    this.containerNode = document.getElementById('js-container');
    this.touchNodes = document.querySelectorAll('[data-touch]');
  }

  public execute(): void {
    const _this = this;
    _this.initTouchClass();
    _this.initDeviceClass();
    window.addEventListener('resize', debounce(1000, () => {
      _this.initDeviceClass();
    }));
  }

  // pc以外はtouch deviceとする
  private initDeviceClass(): void {
    if (this.containerNode) {
      if (isPC()) {
        this.containerNode.classList.remove('touch-device');
        this.containerNode.classList.add('pc-device');
      }
      else {
        this.containerNode.classList.remove('pc-device');
        this.containerNode.classList.add('touch-device');
      }
    }
  }

  private initTouchClass(): void {
    const _this = this;
    this.touchNodes.forEach(node => {
      node.addEventListener('touchstart', _this.addTouchClass.bind(_this, node), true);
      node.addEventListener('touchend', _this.removeTouchClass.bind(_this, node), true);
    });
  }

  private addTouchClass(node: HTMLElement): boolean {
    node && node.classList.add('is-touch');
    // event kill
    return false;
  }

  private removeTouchClass(node: HTMLElement): boolean {
    node && node.classList.remove('is-touch');
    // event kill
    return false;
  }
}

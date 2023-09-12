import { useScreenSizeStore } from '@/stores/screenInch';
import { computed } from 'vue';

export default () => {
  const screenSizeStore = useScreenSizeStore();

  const increment = screenSizeStore.increment;

  const screenInch = computed({
    get() {
      return screenSizeStore.screenInch;
    },
    set(val) {
      screenSizeStore.screenInch = val;
    }
  });

  /**
   * 將 dom 轉換為真實物件大小
   * 物件必須有 data-width 與 data-height
   */
  const setToReal = (dom: HTMLElement) => {
    const { width, height } = dom.dataset;
    const canBeChange = width && height;
    if (canBeChange) {
      dom.style.width = mmToPx(screenInch.value, parseInt(width)) + 'px';
      dom.style.height = mmToPx(screenInch.value, parseInt(height)) + 'px';
      screenSizeStore.saveData();
    } else {
      throw new Error('DOM must have data-width and data-height');
    }
    // NT100.style.width = mmToPx(screenInch, 145) + 'px';
    // NT100.style.height = mmToPx(screenInch, 70) + 'px';
    // card.style.width = mmToPx(screenInch, 85.6) + 'px';
    // card.style.height = mmToPx(screenInch, 53.7) + 'px';
    // a4.style.width = mmToPx(screenInch, 210) + 'px';
    // a4.style.height = mmToPx(screenInch, 297) + 'px';
  };

  return { increment, screenInch, setToReal };
};

function mmToPx(screenInch: number, mm: number) {
  // apple will be 2, but gets error
  const dpr = 1 || window.devicePixelRatio;
  const inch = 25.4; //1inch = 25.4 mm
  // gw2780 = 27
  // not always 96, 27 is screen size in inch
  const ppi = getPPI(window.screen.width, window.screen.height, screenInch);
  return ((mm / inch) * ppi) / dpr;
}

function getPPI(hRes: number, vRes: number, diagSize: number) {
  const diagRes = Math.sqrt(Math.pow(hRes, 2) + Math.pow(vRes, 2));
  return Math.round(diagRes / diagSize);
}

// function pxToMm(screenInch, px) {
//   // apple will be 2, but gets error
//   var dpr = 1 || window.devicePixelRatio;
//   var inch = 25.4; //1inch = 25.4 mm
//   // gw2780 = 27
//   // not always 96, 27 is screen size in inch
//   var ppi = getPPI(window.screen.width, window.screen.height, screenInch);
//   return (px * inch * dpr) / ppi;
// }

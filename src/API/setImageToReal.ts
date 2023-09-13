import { useScreenSizeStore } from '@/stores/screenInch';
import { computed } from 'vue';
import { mmToPx } from '@/lib/mmToPx';

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

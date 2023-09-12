import { onMounted, ref } from 'vue';
import { defineStore } from 'pinia';

/** system can not get the real size of monitor, so user need to enter the real monitor size */
export const useScreenSizeStore = defineStore('screenInch', () => {
  const screenInch = ref(24);

  const saveData = () => {
    const v = screenInch.value;
    if (v) localStorage.setItem('screenInch', v.toString());
  };

  /** 上次造訪的資料 */
  const lastScreenInch = ref<undefined | number>();

  function increment(n: number) {
    const result = (screenInch.value * 10 + n * 10) / 10;
    screenInch.value = result;
  }

  function update(n: number) {
    screenInch.value = n;
  }

  onMounted(() => {
    const local = localStorage.getItem('screenInch');

    if (local) {
      screenInch.value = parseFloat(local);
      lastScreenInch.value = screenInch.value;
    }
  });

  return { screenInch, increment, update, saveData, lastScreenInch };
});

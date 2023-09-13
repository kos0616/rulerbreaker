<template>
  <div class="container mx-auto overflow-x-scroll">
    <article class="py-10">
      <div class="mb-20 mt-10 max-w-lg">
        <strong>測量兩點間的距離</strong>
        <h2 class="text-white">點對點測量</h2>
        <p class="mb-10">
          現在，您已經完成了螢幕校正，讓我們開始使用點對點測量功能吧！這個功能能夠輕鬆計算任意兩點的實際距離，並向您提供即時提示。
        </p>
        <h3 class="text-white">使用方法</h3>
        <ol>
          <li>點擊下方實例圖任一處，然後點擊另一處</li>
          <li>立即獲得兩點之間的距離</li>
          <li>開始測量您所需的物體，無需尺標！</li>
        </ol>
      </div>

      <figure
        v-if="IS_TEST"
        ref="REF_TEETH"
        class="relative mx-auto mb-20 block text-center"
        data-width="210"
        data-height="137"
      >
        <button
          @click="handleReset"
          type="button"
          class="absolute -top-2 left-0 -translate-y-full rounded border px-3 py-1 transition-colors hover:bg-slate-200 hover:text-gray-500"
        >
          重設
        </button>
        <img
          src="https://graftondentalcare.com/wp-content/uploads/2018/01/The-Science-of-Modern-Dental-X-Rays-768x501.jpg.webp"
          class="mx-auto h-full max-h-none w-full max-w-none"
        />
      </figure>

      <figure
        ref="REF_A4"
        class="relative mx-auto block text-center"
        data-width="210"
        data-height="297"
      >
        <button
          @click="handleReset"
          type="button"
          class="absolute -top-2 left-0 -translate-y-full rounded border px-3 py-1 transition-colors hover:bg-slate-200 hover:text-gray-500"
        >
          重設
        </button>
        <img
          src="https://i.imgur.com/wpB6I3l.jpeg"
          class="mx-auto h-full max-h-none w-full max-w-none"
        />
        <figcaption>210mm x 297mm</figcaption>
      </figure>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import useRealImage from '@/API/setImageToReal';
import { useScreenSizeStore } from '@/stores/screenInch';
import mitt from '@/API/mitt';
import drawCanvas from '@/API/drawCanvas';

const IS_TEST = true;

const screenSizeStore = useScreenSizeStore();

const { init } = drawCanvas();

const handleReset = () => {
  init(REF_A4.value as HTMLElement);
  init(REF_TEETH.value as HTMLElement);
};

/** 檢測是否為第一次造訪 */
const isOld = computed(() => !!screenSizeStore.lastScreenInch);

const { setToReal } = useRealImage();

const REF_A4 = ref<HTMLElement | null>(null);
const REF_TEETH = ref<HTMLElement | null>(null);

const handleCorrection = () => {
  if (REF_A4.value) {
    setToReal(REF_A4.value);
    init(REF_A4.value as HTMLElement);
  }
  if (REF_TEETH.value) {
    setToReal(REF_TEETH.value);
    init(REF_TEETH.value as HTMLElement);
  }
};

mitt.on('correction', handleCorrection);

onMounted(() => {
  if (isOld.value) handleCorrection();
});
</script>

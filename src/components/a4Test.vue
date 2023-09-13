<template>
  <div class="container mx-auto">
    <article class="py-10">
      <div class="my-10 max-w-lg">
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
      <figure class="text-center">
        <img
          ref="REF_A4"
          src="https://i.imgur.com/wpB6I3l.jpeg"
          data-width="210"
          data-height="297"
          class="mx-auto max-h-none max-w-none"
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

const screenSizeStore = useScreenSizeStore();

/** 檢測是否為第一次造訪 */
const isOld = computed(() => !!screenSizeStore.lastScreenInch);

const { setToReal } = useRealImage();

const REF_A4 = ref<HTMLElement | null>(null);

const handleCorrection = () => {
  if (REF_A4.value) {
    setToReal(REF_A4.value);
  }
};

onMounted(() => {
  if (isOld.value) handleCorrection();
});
</script>
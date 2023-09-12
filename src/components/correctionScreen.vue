<template>
  <div class="container mx-auto">
    <article class="py-5">
      <div class="my-10 max-w-lg">
        <strong>定義畫面的比例</strong>
        <h2 class="text-white">螢幕校正</h2>
        <p>
          在使用點對點測量和自由測量功能之前，我們需要確保您的螢幕能提供精確的測量。請提供您的螢幕尺寸，以便我們校正畫面中實物的比例。如果您不知道螢幕尺寸，沒問題，我們也提供逐步校正比例的選項。
        </p>
      </div>
      <form
        action="#"
        @submit.prevent="handleCorrection"
        class="col-span-2 mb-5 grid gap-5 lg:grid-cols-2"
      >
        <fieldset>
          <legend class="pb-3 text-lg text-white">輸入螢幕尺寸進行校正</legend>
          <div class="flex items-stretch">
            <label for="screenInch" class="flex items-center rounded-s border px-3 text-white">
              <strong> 螢幕尺寸 </strong>
            </label>
            <input
              id="screenInch"
              name="screenInch"
              v-model="screenInch"
              type="number"
              min="0"
              max="85"
              step="0.1"
              class="self-stretch border-y bg-transparent px-3"
              required
            />
            <button class="btn btn-primary rounded-s-none" type="submit">送出</button>
          </div>
        </fieldset>

        <fieldset>
          <legend class="pb-3 text-lg text-white">逐步校正螢幕</legend>
          <div class="flex items-stretch">
            <button
              @click="handleIncrement(-0.1)"
              class="btn rounded-r-none text-white"
              type="button"
            >
              - 減少
            </button>

            <input
              id="screenInch"
              name="screenInch"
              v-model="screenInch"
              type="number"
              min="0"
              max="85"
              step="0.1"
              class="self-stretch border-y bg-transparent px-3 text-center"
              required
            />
            <button
              @click="handleIncrement(0.1)"
              class="btn rounded-l-none text-white"
              type="button"
            >
              + 增加
            </button>
          </div>
        </fieldset>
      </form>

      <div class="grid gap-4">
        <figure>
          <img
            ref="REF_CARD"
            src="https://www.ctbcbank.com/content/dam/twrbo/images/creditcard/card/C_LINEPay_JEH_8713.jpg"
            data-width="85.6"
            data-height="53.7"
            class="max-h-none max-w-none"
            style="width: 307.874px; height: 191.969px"
          />
          <figcaption>85.6mm x 53.7mm</figcaption>
        </figure>

        <figure>
          <img
            ref="REF_NT100"
            src="https://o.quizlet.com/gaNyPK1HFDBmTa41tszA6w.jpg"
            data-width="145"
            data-height="70"
            class="max-h-none max-w-none"
            style="width: 525.197px; height: 253.543px"
          />
          <figcaption>145mm x 70mm</figcaption>
        </figure>
      </div>
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

const { increment, screenInch, setToReal } = useRealImage();

const REF_CARD = ref<HTMLElement | null>(null);
const REF_NT100 = ref<HTMLElement | null>(null);

const handleIncrement = (n: number) => {
  increment(n);
  handleCorrection();
};

const handleCorrection = () => {
  if (REF_CARD.value && REF_NT100.value) {
    setToReal(REF_CARD.value);
    setToReal(REF_NT100.value);
  }
};

onMounted(() => {
  if (isOld.value) handleCorrection();
});
</script>

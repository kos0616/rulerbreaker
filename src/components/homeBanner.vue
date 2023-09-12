<template>
  <div class="parallax flex p-5 md:block">
    <article
      class="mx-auto inline-block max-w-md self-center justify-self-center rounded border border-gray-300/20 bg-zinc-800/60 p-10 backdrop-brightness-50 backdrop-grayscale md:absolute md:right-10 md:top-1/3"
    >
      <strong class="text-sm"> 放下尺標，拿起螢幕 </strong>
      <h2 class="text-white">歡迎來到Ruler Breaker</h2>
      <p class="mb-5">
        這裡，我們讓你輕鬆擺脫尺標的束縛，將螢幕轉變成你的新測量工具。無論你是工程師、設計師、或只是隨身需要一把尺的人，我們都在這裡，為你提供最簡單、最方便的解決方案。
      </p>

      <a
        href="#correction"
        title="Start expoloring"
        class="peer mb-1 inline-block rounded bg-primary px-3 py-2 font-bold text-zinc-600 transition-colors hover:bg-[color:var(--color-primary-light-1)] hover:text-stone-700"
      >
        開始
      </a>
      <span class="p-3 text-sm peer-hover:text-white">先來校正螢幕吧</span>
    </article>
  </div>
</template>

<style scoped lang="postcss">
.parallax {
  height: min(calc(100vh - 40px), 1200px);
  background-image: url(../assets/image/dot.svg), url(../assets/image/banner2.webp);
  background-repeat: repeat, no-repeat;
  @apply bg-[size:auto,cover];
  /** fixing small device bg-fixed not working */
  @apply relative bg-center md:bg-fixed;
}
</style>

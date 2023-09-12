<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const REF_INSTALL = ref<HTMLButtonElement | null>(null);

const isShow = ref(false);

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);

const handleInstall = () => {
  // hide our user interface that shows our A2HS button
  isShow.value = false;
  // Show the prompt
  (deferredPrompt.value as BeforeInstallPromptEvent).prompt();
  // Wait for the user to respond to the prompt
  (deferredPrompt.value as BeforeInstallPromptEvent).userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      // console.log('User accepted the A2HS prompt');
    } else {
      // console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt.value = null;
  });
};

// 添加到主畫面
const installPrompt = (e: BeforeInstallPromptEvent) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt.value = e;
  // Update UI to notify the user they can add to home screen
  isShow.value = true;
};

onMounted(() => {
  window.addEventListener('beforeinstallprompt', installPrompt);
});

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', installPrompt);
});
</script>

<template>
  <div v-if="isShow" class="relative py-2 text-center">
    <button
      @click="isShow = false"
      title="Close"
      type="button"
      class="absolute right-8 top-1/2 -translate-y-1/2 hover:text-primary"
    >
      X
    </button>
    <button
      @click="handleInstall"
      class="rounded border border-current px-3 text-white/50 hover:bg-primary hover:text-stone-700"
      ref="REF_INSTALL"
      type="button"
    >
      Add to Home Screen
    </button>
  </div>
</template>

import { onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useNetworkStatusStore } from '@/stores/networkStatus';

/** init network status watcher */
export default () => {
  const toast = useToast();
  const networkStatusStore = useNetworkStatusStore();

  /** 網路狀態監聽 */
  const networkWatcher = () => {
    const isConnected = window.navigator.onLine;

    if (isConnected) {
      toast.success('Welcome back, You are Reconnected!');
    } else {
      toast.error('Oh no, You are Disconnected!');
    }
    networkStatusStore.setConnected(isConnected);
    setCss(isConnected);
  };

  /** set css class based on connection status */
  const setCss = (isConnected: boolean) => {
    if (isConnected) {
      document.documentElement.classList.remove('offline');
    } else {
      document.documentElement.classList.add('offline');
    }
  };

  onMounted(() => {
    const isConnected = window.navigator.onLine;
    networkStatusStore.setConnected(isConnected);
    setCss(isConnected);

    window.addEventListener('online', networkWatcher);
    window.addEventListener('offline', networkWatcher);
  });

  onUnmounted(() => {
    window.removeEventListener('online', networkWatcher);
    window.removeEventListener('offline', networkWatcher);
  });
};

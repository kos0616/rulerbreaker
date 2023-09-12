import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface State {
  isConnected: boolean;
  lastConnectionDate: Date | undefined;
}

const isConnected = window.navigator.onLine;

export const useNetworkStatusStore = defineStore('networkStatus', {
  state: (): State => ({
    isConnected,
    lastConnectionDate: undefined
  }),
  actions: {
    setConnected(connected: boolean) {
      this.isConnected = connected;
      if (!connected) this.lastConnectionDate = new Date();
    }
  },
  getters: {
    connectionStatus(): 'connected' | 'disconnected' | 'reconnected' {
      if (!this.isConnected) {
        return 'disconnected';
      } else if (
        this.lastConnectionDate !== undefined &&
        new Date().getTime() - this.lastConnectionDate.getTime() < 10000
      ) {
        return 'reconnected';
      }
      return 'connected';
    },
    formattedLastConnection(): string {
      if (!this.lastConnectionDate) return '';
      const now = dayjs();
      const lastConnection = dayjs(this.lastConnectionDate);
      const differenceInDays = now.diff(lastConnection, 'day');

      if (differenceInDays < 1) {
        return lastConnection.from(now); // 顯示 fromNow
      } else {
        return lastConnection.format('YYYY-MM-DD'); // 顯示日期
      }
    }
  }
});

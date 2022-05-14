import { contextBridge, ipcRenderer } from 'electron';

export const electronApi = {
  getTimers(): Promise<Timer[]> {
    return ipcRenderer.invoke('getTimers');
  },
  setTimers(timers: Timer[]) {
    ipcRenderer.send('setTimers', timers);
  }
};

contextBridge.exposeInMainWorld('api', electronApi);

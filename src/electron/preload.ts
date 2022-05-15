import { contextBridge, ipcRenderer, OpenDialogReturnValue } from 'electron';
import path from 'path';

export const electronApi = {
  getTimers(): Promise<Timer[]> {
    return ipcRenderer.invoke('getTimers');
  },
  setTimers(timers: Timer[]) {
    ipcRenderer.send('setTimers', timers);
  },

  async selectSongs(): Promise<Song[]> {
    const paths: OpenDialogReturnValue = await ipcRenderer.invoke('selectSongs');

    if (paths.canceled) throw new Error('No songs selected');

    return paths.filePaths.map(p => ({
      title: path.basename(p, path.extname(p)),
      path: path.join('file://', path.normalize(p))
    }));
  }
};

contextBridge.exposeInMainWorld('api', electronApi);

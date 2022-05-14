import { ipcMain } from 'electron';
import Store, { Schema } from 'electron-store';

const schema: Schema<ElectronStore> = {
  timers: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        playtime: { type: 'number' },
        default: { type: 'boolean' }
      }
    },
    default: [
      { name: '30 seconds', playtime: 30000, default: true },
      { name: 'Indefinite', playtime: 0, default: false }
    ]
  }
};

const store = new Store<ElectronStore>({ schema });

export const storeIpc = () => {
  ipcMain.handle('getTimers', () => store.get('timers'));
  ipcMain.on('setTimers', (e, timers: Timer[]) => store.set('timers', timers));
};

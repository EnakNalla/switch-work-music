import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { join } from 'path';
import { storeIpc } from './electronStore';

let window: BrowserWindow;

storeIpc();

const createWindow = () => {
  window = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, 'preload.js')
    }
  });

  if (process.env.IS_DEV) {
    window.loadURL('http://localhost:3000');
  } else {
    window.removeMenu();
    window.loadFile(join(__dirname, 'index.html'));
  }

  window.webContents.once('did-finish-load', () => window.maximize());
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (!window) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('selectSongs', () => {
  return dialog.showOpenDialog(window, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'mp3,ogg,wav',
        extensions: ['mp3', 'ogg', 'wav']
      }
    ]
  });
});

ipcMain.on('setFullscreen', (e, bool: boolean) => window.setFullScreen(bool));

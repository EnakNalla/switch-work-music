import { app, BrowserWindow } from 'electron';
import { join } from 'path';

let window: BrowserWindow;

const createWindow = () => {
  window = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: false
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

import { app, BrowserWindow, dialog  } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = 'debug';
log.info('🚀 App iniciado, logger funcionando!');

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
app.on('ready', () => {
  createWindow();
  // inicia verificação de updates
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('checking-for-update', () => {
  log.info('🔍 verificando updates...');
});

autoUpdater.on('update-available', (info) => {
  log.info(`📦 update disponível: ${info.version}`);
  dialog.showMessageBox({
    type: 'info',
    title: 'Update disponível',
    message: 'Uma nova versão foi encontrada, será baixada em segundo plano.',
  });
});

autoUpdater.on('update-not-available', () => {
  log.info('✅ nenhum update disponível.');

  dialog.showMessageBox({
    type: 'info',
    title: 'Update indisponível',
    message: 'Uma nova versão não foi encontrada.',
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'question',
      buttons: ['Reiniciar agora', 'Depois'],
      defaultId: 0,
      message: 'Update baixado. Deseja reiniciar agora para aplicar?',
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

autoUpdater.on('error', (err) => {
  log.error('❌ erro no autoUpdater:', err);
});

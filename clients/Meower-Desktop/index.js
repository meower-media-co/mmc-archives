const { app, BrowserWindow } = require('electron');

check();

function check() {
  if (require('electron-squirrel-startup')) {
    return app.quit();
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: `./app/Images/Meower.png`,
  });

  win.removeMenu();

  win.loadFile('app/index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

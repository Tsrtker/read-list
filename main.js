// require('update-electron-app')()  //自动更新
const { app, BrowserWindow ,ipcMain,Tray} = require('electron/main')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 917,
    height: 492,
    frame: false, //关闭菜单栏
    resizable: false, //禁止调整大小
    transparent: true, //透明body
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, 'favicon.ico') //图标
  })

  win.loadFile('index.html')
}


app.whenReady().then(() => {
  
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  // const tray = new Tray('favicon.ico')//托盘图标
//TODO：为什么放这里
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
/* モジュールの読み込み */
const { app, BrowserWindow } = require("electron")
const path = require("path")

/* BrowserWindowの新しいインスタンス作成 */
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') /* レンダープロセスにアタッチするため, pathを通す, __dirnameは実行中のスクリプトのパス(src), joinで結合 */
    }
  })

  win.loadFile('src/index.html'); /* index.htmlをロード */
};

/* appのreadyイベントの発火でのみブラウザウィンドウは作られる */
app.whenReady().then(() => {
  createWindow()

  /* Macの場合, ウィンドウを閉じてもアプリが動いているので, (Dockとかから)activateされたら立ち上げる? */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/* 全てのwindowが閉じられた時, アプリを終了(Win & Linux) */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
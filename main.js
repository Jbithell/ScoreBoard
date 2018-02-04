const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const windowManager = require('electron-window-manager');

app.on('window-all-closed', function () {
  app.quit()
})
app.on('ready', function () {
    windowManager.init();
    windowManager.open('loading', 'Opening ScoreBoard', '/loadingBootScreen.html', false, {width: 900, height: 800, frame: false}, false);
})
app.on('activate', function () {
    //TODO do something more clever than this when a mac user re-opens the app
    app.quit();
})
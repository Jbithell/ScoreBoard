const SerialPort = require('serialport')
window.$ = window.jQuery = require('jquery');
const bootstrap = require('bootstrap');

var remote = require('electron').remote;
var windowManager = remote.require('electron-window-manager');
var comPort = windowManager.sharedData.fetch('comPort');
const {Menu, MenuItem} = remote;

var adminMenu = Menu.buildFromTemplate([
    {
        label: 'File',
        submenu: [
            {
                label: 'Main window Resize',
                click (item, focusedWindow) {
                    if (focusedWindow) {
                        windowManager.get('main').object.setFullScreen(false);
                    }
                }
            },
            {
                label: 'Main window Fullscreen',
                click (item, focusedWindow) {
                    if (focusedWindow) {
                        windowManager.get('main').object.setFullScreen(true);
                    }
                }
            },
            {type: 'separator'},
            {role: 'close'}
        ]
    },
    {
        label: 'About',
        submenu: [
            {
                label: 'Github',
                //accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click (item, focusedWindow) {
                    if (focusedWindow) {
                        //require('electron').shell.openExternal('https://github.com/Jbithell/ScoreBoard')
                    }
                }
            }
        ]
    }
]);
windowManager.get('admin').object.setMenu(adminMenu);

//TODO remove this in prod
windowManager.get('admin').toggleDevTools( );
windowManager.get('main').toggleDevTools( );


windowManager.bridge.emit('newDataSet',
    {   //The data format for sending to the other window ("the screen view")
        'keyData': {
            'hostName': 'TEST',
            'matchName': 'test2'
        }
    }
);

if (comPort) {
    portConnection = new SerialPort(comPort, {
        baudRate: 115200
    });
    portConnection.on('data', function (data) {
        var output = "";
        $.each(data, function( index, value ) {
            output += String.fromCharCode(value);
        });
        console.log(output);
    });
}





$("#noController").click(function(){
    windowManager.get('main').object.setFullScreen(false);
});
$("#closeApp").click(function(){
    window.close();
});
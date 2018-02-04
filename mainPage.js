const SerialPort = require('serialport')
window.$ = window.jQuery = require('jquery');
const bootstrap = require('bootstrap');
console.log("Not broken")
var remote = require('electron').remote;
var windowManager = remote.require('electron-window-manager');
var messageHandler = windowManager.bridge.on('newDataSet', function(event){
    var data = event;
    console.log(data);
    console.log(data['keyData']);
    $.each(data, function( index, value ) {
        $.each(data['keyData'], function( index, value ) {
            $("#" + index).html(value);
        });
    });
});
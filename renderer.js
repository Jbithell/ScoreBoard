const remote = require('electron').remote;
const SerialPort = require('serialport')
window.$ = window.jQuery = require('jquery');

var windowManager = remote.require('electron-window-manager');

var portConnection;
var portsOpen = 0;
var createWindows = function (comPort) {
    windowManager.sharedData.set('comPort', comPort); //Where to find external controller module
    var newWindowMain = windowManager.open('main', 'Scores', '/main.html', false, {width: 200, height: 200, maximizable: false, resizable: false, minimizable: false}, false);
    newWindowMain.toFullScreen('main');
    windowManager.get('main').object.setMenu(null);
    windowManager.open('admin', 'ScoreBoard Admin', '/admin.html', false, {width: 500, height: 500, resizable: true, maximizable: true}, false);
    windowManager.close('loading');
};
SerialPort.list((err, ports) => {
  if (ports.length === 0) {
    $('#error').html('No ports discovered');
  } else {
      $.each(ports, function( index, value ) {
          //Find an arduino uno
          value["portobject"] = new SerialPort(value["comName"], {
              baudRate: 115200
          });
          value["initialdatasent"] = "";
          value["portobject"].on('data', function (data) {
              $.each(data, function( valuesloopindex, valuesloopvalue ) {
                  value["initialdatasent"] += String.fromCharCode(valuesloopvalue);
                  if (value["initialdatasent"] == "CUEBAUTODETECTONLINE") {
                        console.log(value["initialdatasent"]);
                      $.each(ports, function( newloopindex, newloopvalue ) {
                          //Find an arduino uno
                          newloopvalue["portobject"].close(function(data) {
                              if (newloopvalue["comName"] == value["comName"]) {
                                  comPort = value["comName"]; //If we've closed the port we're looking for open it up again with a nice new connection
                                  //Below duplicated much lower down
                                  createWindows(comPort);
                              }
                          });
                      });
                  }
              });
          });
      });
  }
});

$("#noController").click(function(){
    createWindows(false);
});
$("#closeApp").click(function(){
    window.close();
});
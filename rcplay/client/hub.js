var HID = require('node-hid');
var EventEmitter = require( 'events' );
vare gp = require('./gamepad.js')

class HUB extends EventEmitter {
  constructor() {
    super()
    this.gamepads = {};
    this.deviceCount = 0;
  }

  search() {
    let controllers = HID.devices().filter((device) => device.manufacturer.includes("Logitech") || device.product.includes("310"));
    controllers.forEach(function(x) {
      this.gamepads[x.path] = {
        gamepad : new gp(x.path),
        id : x.serialNumber
      }
    }, this)
    return controllers
  }

  listen() {
    let _this = this;
    Object.keys(_this.gamepads).forEach((x) => {
      _this.gamepads[x].gamepad.gamepad.on('data', (x) => {
        _this.emit('update', _this.gamepads[x], x)
      })
    })
  }

}

module.exports = HUB

//cheat sheet
// emissions "device connected" (devices), "different device warning", "update" (data, id), "controller error" (err), "stopped"

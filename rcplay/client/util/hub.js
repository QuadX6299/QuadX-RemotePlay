var HID = require('node-hid');
var usbDetect = require('usb-detection');
var EventEmitter = require( 'events' );

exports.HUB = class {
  constructor(callback) {
    this.devices = {};
    this.portBinding = {};
    this.callback = callback;
    this.deviceNum = 0;
  }

  init() {
    usbDetect.startMonitoring();
    usbDetect.on('add', (device) => {
      //check if device is a controller
      if (this.callback(device)) {
        this.portBinding[device.serialNumber] = this.deviceNum;
        this.devices[this.deviceNum] = {
          meta : device,
          hid : new HID.HID(device.vendorId, device.productId)
        };
        this.listen(this.deviceNum);
        this.deviceNum++;
        this.emit('device connected', this.devices);
      } else {
        this.emit('different device warning');
      }
    });
    usbDetect.on('remove', (device) => {
      if (this.deviceNum > 0) {
        this.devices[this.portBinding[device.serialNumber]].hid.close();
        delete this.devices[this.portBinding[device.serialNumber]];
        this.deviceNum--;
        this.emit('device removed', this.devices);
      }
    })
  }

  listen(id) {
    var dev = this.devices[id].hid;
    dev.on('data', (data) => {
      this.emit('update', data, id);
    })
    dev.on('error', (err) => {
      this.emit('controller error', err);
    })
  }

  stop() {
    Object.keys(this.devices).forEach((key) => {
      this.devices[key].hid.close();
    })
    usbDetect.stopMonitoring();
    this.emit('stopped')
  }

  close() {
    return true;
  }
}


//cheat sheet
// emissions "device connected" (devices), "different device warning", "update" (data, id), "controller error" (err), "stopped"

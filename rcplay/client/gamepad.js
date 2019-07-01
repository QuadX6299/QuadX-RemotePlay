var HID = require('node-hid');

export class Gamepad {
  constructor(path) {
    this.gamepad = new HID.HID(path)
  }
}

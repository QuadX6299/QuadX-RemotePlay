let gamepad = require('gamepad');
class ControllerHub {
  constructor() {
    this.num = 0;
  }

  init(callback) {
    gamepad.init();
    setInterval(gamepad.processEvents, 16);
    setInterval(gamepad.detectDevices, 500);
    gamepad.on("move", (id) => callback(id));
    gamepad.on("down", (id) => callback(id));
    gamepad.on("up", (id) => callback(id));
    gamepad.on("attach", () => {num++});
    gamepad.on("remove", () => {num--});
  }
}

let c = new ControllerHub();
c.init((id) => console.log(gamepad.deviceAtIndex(id)));

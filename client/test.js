let gamepad = require('gamepad');
gamepad.init();
setInterval(gamepad.processEvents, 16);

function printStatus(id) {
  console.log(gamepad.deviceAtIndex(id));
}

gamepad.on("move", (id) => printStatus(id));
gamepad.on("up", (id) => printStatus(id));
gamepad.on("down", (id) => printStatus(id));

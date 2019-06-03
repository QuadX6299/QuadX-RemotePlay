var HID = require('node-hid');
var usbDetect = require('usb-detection');
usbDetect.startMonitoring();

usbDetect.on('add', (device) => {
    var newDevice = new HID.HID(device.vendorId, device.productId);
    newDevice.on("data", (data) => console.log(data[2]));
    console.log(newDevice);
    console.log(device);
});

usbDetect.on('remove', (device) => {
  usbDetect.stopMonitoring();
})

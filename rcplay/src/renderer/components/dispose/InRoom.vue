<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="device in devices">
        <ControllerData v-bind:gamepadObj="device" v-bind:id="deviceCount"></ControllerData>
      </li>
    </ul>
    <a href="#" class="btn btn-outline-dark align-self-center" @click="filter">Search</a>
  </div>
</template>

<script>
  var HID = require('node-hid');

  export default {
    data : () => {
      return {
        curRoom : '--Loading--',
        gamepads : {},
        deviceCount : 0,
        devices: null
      }
    },
    props : {
      active : String
    },
    components : {
      'ControllerData' : () => import('./Controller/ControllerData.vue')
    },
    //Call to server for get room to get info
    methods : {
      filter : function() {
        this.devices = HID.devices()//.filter((device) => device.manufacturer.includes("Logitech") || device.product.includes("310"));
      }
    }
  }
</script>

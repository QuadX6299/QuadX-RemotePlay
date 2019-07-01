<template>
  <div class=" fill">
    <transition name="modal">
      <Modal v-if="showModal" @close="showModal=false"></Modal>
    </transition>
    <div class="left d-flex flex-column">
      <div class="devices">
        <div class="header">
          Devices
        </div>
        <router-link :to="{ name: 'room-menu', params: {} }">temp</router-link>
        <ul>
          <li v-for="device in devices">{{device.product}}
            <button type="button" name="button" class="btn btn-custom" v-bind:class="[active[device.path] ? (active[device.path].on ? 'active' : '') : '']" @click="toggle(device)">{{active[device.path] ? (active[device.path].on ? 'active' : 'disabled') : 'init'}}</button>
          </li>
        </ul>
      </div>
      <div class="terminal">

      </div>
    </div>

    <div class="right d-flex flex-row">
      <div class="chat">
        {{devices}}
        {{active}}
      </div>
      <div class="users">
        <ul>
          <li v-for="user in users">{{user}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  var HID = require('node-hid');
  export default {
    data : function () {
      return {
        anim: true,
        clicked: false,
        devices: [],
        devicesConnected: 0,
        active: {},
        users: [],
        showModal: false
      }
    },
    components: {
      'Modal' : () => import('./Modal.vue')
    },
    sockets : {
      user_update : function (x) {
        this.users = x;
      }
    },
    mounted() {
      this.showModal = true;
      this.filter();
    },
    methods: {
      next : function() {
        if (this.clicked) {
          this.$router.replace({name:'room-menu', params : {searching: this.searching}})
        }
      },
      filter : function() {
        this.devices = HID.devices().filter((device) => device.manufacturer.includes("Logitech") || device.product.includes("310"));
      },
      toggle : function(device) {
        if (this.active[device.path] && this.active[device.path].on) {
          this.active[device.path].dev.close();
          this.active[device.path].on = false;
        } else {
          let _this = this;
          this.$set(this.active, device.path, {dev: new HID.HID(device.path),on: true, id: this.devicesConnected})
          this.active[device.path].dev.on('data', (x) => {_this.$socket.emit('update broadcast', x, _this.active[device.path].id)})
        }
      }
    }
  }
</script>

<style scoped src="./css/main.css"></style>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap');
  /*CSS*/
  /* shadow code
      box-shadow: 0 14px 28px rgba(0,0,0,0.25),
        0 10px 10px rgba(0,0,0,0.22);
        */



</style>

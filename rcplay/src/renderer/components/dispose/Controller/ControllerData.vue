<template>
  <div class="">
    <button type="button" v-bind:class="[active ? activeClass : staticClass]" @click="activate">{{name}}</button>
  </div>
</template>

<script>
  var HID = require('node-hid')

  export default {
    data : () => {
      return {
        id : 0,
        name : "",
        device: null,
        active: false,
        activeClass : 'btn btn-success',
        staticClass : 'btn btn-dark'
      }
    },
    props : {
      gamepadObj : Object
    },
    created() {
      this.name = this.gamepadObj.product
    },
    destroyed() {

    },
    methods : {
      calibrate : function () {

      },
      activate : function () {
        if (!this.active) {
          let _this = this;
          this.active = !this.active;
          this.device = new HID.HID(_this.gamepadObj.path);
          this.device.on('data', function (x) {
            _this.$socket.emit('update', x);
          })
        } else {
          this.device.pause();
          this.device.close();
          this.$socket.emit('removed controller', this.gamepadObj);
          this.active = !this.active;
        }
      }

    }
  }
</script>

<style lang="css" scoped>
</style>

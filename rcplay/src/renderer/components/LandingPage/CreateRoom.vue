<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control" v-model="name" placeholder="Room Name" aria-label="Room Name" aria-describedby="basic-addon1">
    <div class="input-group-append">
      <button class="input-group-text" @click="function () {emit('join', name); createRoom(name)}" id="basic-addon1">Create</button>
    </div>
  </div>
</template>

<script>
  export default {
    data : () => {
      return {
        name : ''
      }
    },
    methods : {
      emit : function (key, data) {
        this.$emit(key, data)
      },
      createRoom : function (name) {
        this.$socket.emit('create room', name, {args : false})
      }
    }
  }
</script>

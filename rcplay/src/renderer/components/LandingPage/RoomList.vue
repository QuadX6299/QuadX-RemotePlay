<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="room in rooms">
        {{room.name}}
      </li>
    </ul>
    <button type="button" class="btn btn-outline-success" @click="function () {emit('join', name); joinRoom(name)}">Join</button>
  </div>

</template>

<script>
  export default {
    data : () => {
      return {
        name : 'testing',
        rooms : [
          {
            name : "1"
          },
          {
            name : "2"
          }
        ]
      }
    },
    sockets : {
      list_update : function (data) {
        this.rooms.push(...data)
      }
    },
    methods: {
      fetch() {
        this.$socket.emit('getUpdate')
      },
      joinRoom(name) {
        this.$socket.emit('join room', name)
      },
      emit : function (key, data) {
        this.$emit(key, data)
      }
    }
  }
</script>

<style scoped>

</style>

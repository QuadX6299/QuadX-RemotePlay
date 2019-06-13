<template>
  <div class="row h-100">
    <div class="my-auto">
      <div class="card">
        <h5 class="card-header align-self-center">RC Play v1.0.0</h5>
        <div class="card-body">
          <component v-bind:is="curComponent" v-on:create="currentStage='CreateRoom'" v-on:search="currentStage='RoomList'" v-on:join="goToRoom" v-bind:active="curRoom"></component>
          <a href="#" class="btn btn-outline-dark align-self-center" @click="currentStage='Welcome'">back</a>
          <p>{{curRoom}} || {{currentStage}}</p>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  //import CreateRoom from './RoomCreator.vue'


  export default {
    data : function () {
      return {
        curRoom : '',
        currentStage : 'Welcome',
        templates : ['Welcome', 'RoomList', 'CreateRoom', "InRoom"],
      }
    },
    components: {
      'RoomList' : () => import('./RoomList.vue'),
      'Welcome' : () => import('./Welcome.vue'),
      'CreateRoom' : () => import('./CreateRoom.vue'),
      'InRoom' : () => import('./InRoom.vue')
    },
    computed : {
      curComponent: function () {
        return this.currentStage
      }
    },
    sockets : {
    },
    methods: {
      goToRoom : function (x) {
        this.curRoom = x
        this.currentStage = "InRoom"
      }
    }
  }
</script>

<style scoped>
  .fill {
    align-items: center;
    height: 100vh;
  }
</style>

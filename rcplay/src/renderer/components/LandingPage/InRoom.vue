<template>
  <div>
    <h1>{{active}}</h1>
  </div>
</template>

<script>
  export default {
    data : () => {
      return {
        curRoom : '--Loading--'
      }
    },
    props : {
      active : String
    },
    //Call to server for get room to get info
    methods : {
      //Connect to USB and start sending information
    }
  }
</script>

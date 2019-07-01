<template>
  <div id="app" class="overflow-none">
    <div class="topbar"></div>

    <!-- Circle Animation Element -->
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'rcplay'
  }
</script>

<style scoped="">
  .circle {
    position: absolute;
    display: none;
  }

  .topbar {
    width: 100vw;
    height: 32px;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-app-region: drag;
  }
  /*Animations*/

</style>

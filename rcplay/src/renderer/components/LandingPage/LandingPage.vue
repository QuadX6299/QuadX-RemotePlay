<template>
  <div class="fill">
    <transition name="expand" :duration="800">
      <div class="circle" v-show="anim" v-on:animationend="next"></div>
    </transition>
    <div class="col-sm-4 float-left fill left-main">
      <div class="header d-flex flex-row">
        <p>RcPlay 1.0.1</p>
        <p>En</p>
      </div>
      <div class="main">
        <p class="bang">QUADX 6299</p>
        <button class="btn btn-light" @click="anim=true; searching=false; clicked=true"><span class="custom-link">Search</span></button>
        <button class="btn btn-light" @click="anim=true; clicked=true"><span class="custom-link">Create</span></button>
      </div>
      <div class="footer d-flex">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light">Help</button>
          <button type="button" class="btn btn-light">Info</button>
          <button type="button" class="btn btn-light">About</button>
        </div>
      </div>
    </div>
    <div class="col-sm-8 float-right right-back fill">
    </div>

  </div>

</template>

<script>
  export default {
    data : function () {
      return {
        anim: true,
        searching : true,
        clicked: false
      }
    },
    components: {

    },
    computed : {
      curComponent: function () {
        return this.currentStage
      }
    },
    mounted() {
      this.anim = !this.anim;
    },
    methods: {
      next : function() {
        if (this.clicked) {
          this.$router.replace({name:'room-menu', params : {searching: this.searching}})
        }
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:900&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap');
  /*CSS*/
  .left-main {
    padding-left: 3vw;
    align-content: center;
    align-items: center;
  }
  .header {
    margin : 6vh 0 8vh 0;
  }
  .header p {
    margin-right: 5vw;
    font-family: 'Ubuntu Mono', sans-serif!important;
  }
  .main {
    margin: 0vh 0vw 10vh 0vw;
    height: 60vh;
  }
  .main button {
    display: block;
  }
  .custom-link {
    display: inline-block;
    font-family: 'Ubuntu Mono', sans-serif!important;
    text-decoration: underline;
    margin-right: 10vw;
  }
  .right-back {
    background: url('../../assets/background.svg');
    background-size: auto 100%;
  }
  .bang {
    font-family: 'Montserrat', sans-serif;
    margin: 0vh 0vw 7vh 0vw;
    font-size: 1.8em;
    font-weight: 700;
    letter-spacing: 0px;
  }
  .fill {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .underline {
    border-bottom: 2px solid currentColor;
    display: inline-block;
    line-height: 0.85;
    text-shadow:
      2px 2px white,
      2px -2px white,
      -2px 2px white,
      -2px -2px white;
  }
  .circle {
    position: absolute;
    top: 15vh;
    right: -5vh;
    background-color: #FFC9B3;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    z-index: 999;
  }
  div {
    margin: 0;
    padding: 0;
  }
  /*Animations*/
  .expand-enter-active {
    animation: expand-circle .75s;
  }
  .expand-leave-active {
    animation: expand-circle .75s reverse;
  }
  @keyframes expand-circle {
    0% {
      position: absolute;
      transform: scale(1);
      background-color: #FFC9B3;
      display: inline-block;
    }
    100% {
      position: absolute;
      transform: scale(85);
      background-color: #000a7b;
    }
  }
</style>

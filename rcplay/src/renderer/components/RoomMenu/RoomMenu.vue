<template>
  <div class="fill d-flex justify-content-center align-items-center">
    <transition name="expand" :duration="800">
      <div class="circle" v-show="anim" v-on:animationend="next"></div>
    </transition>
    <div class="center">
      <div class="container" v-bind:class="[searching ? search : '']">
        <!-- create form -->
        <div class="form-container create-room-container">
          <form @submit="checkCreate">
            <h1>Create Room</h1>
            <span v-if="createErrors.length>0" style="color: red">*Please {{createErrors.join(", ")}}*</span>
            <input type="text" placeholder="Room Name" v-model="create.name"/>
            <input type="number" placeholder="Max People" v-model="create.max"/>
            <input type="password" placeholder="Password" v-model="create.password"/>
            <a href="#" @click="anim = !anim; clicked=true;">Home</a>
            <button>Sign Up</button>
          </form>
        </div>
        <!-- Join form -->
        <div class="form-container search-room-container">
          <form @submit="checkJoin">
            <h1>Search Rooms</h1>
            <span>or create one</span>
            <span v-if="joinErrors.length>0" style="color: red">*Please {{joinErrors.join(", ")}}*</span>
            <input type="text" placeholder="Name" v-model="join.name" list="rooms"/>
            <datalist id="rooms">
              <option v-for="room in rooms" :value="room"/>
            </datalist>
            <input type="password" placeholder="Password" v-model="join.password"/>
            <a href="#" @click="anim = !anim; clicked=true;">Home</a>
            <button>Search Rooms</button>
          </form>
        </div>
        <!-- switch tabs -->
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Searching for a Room?</h1>
              <p>Click here to find existing rooms</p>
              <button class="ghost" @click="toggle">Search Rooms</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Need a Room?</h1>
              <p>Create a room and start streaming</p>
              <button class="ghost" @click="toggle">Create Room</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data : () => {
      return {
        rooms: [],
        joinErrors: [],
        createErrors: [],
        join: {
          name : "",
          password : ""
        },
        create: {
          name : "",
          max : 2,
          password : ""
        },
        searching: false,
        anim: false,
        clicked: false,
        search: 'right-panel-active',
        nextParam: 'landing-page'
      }
    },
    sockets : {
      list_update : function(x) {
        this.rooms = x;
        this.$emit('updated');
      }
    },
    components : {
    },
    mounted() {
      this.searching = this.$route.params.searching
      this.$socket.emit('get updated rooms')
      this.anim = !this.anim
    },
    methods: {
      checkJoin : function (e) {
        this.joinErrors = [];
        if (this.rooms.includes(this.join.name)) {
          let _this = this;
          this.$http.post('http://localhost:4000/validate', {
            name: _this.join.name,
            password: _this.join.password
          }).then((res) => {
            if (res.data) {
              this.anim = !this.anim
              this.clicked = true
              this.nextParam = 'control-room'
              this.joinRoom()
            } else {
              _this.joinErrors.push('enter the correct password')
            }
          }).catch((err) => {
            console.log(err);
          })
        } else {
          this.joinErrors.push('enter an existing room')
        }
        e.preventDefault();
      },
      checkCreate : function (e) {
        this.createErrors = [];
        if (this.create.password.length < 4 || this.create.password.includes(" ")) {
          this.createErrors.push("choose a password with length >= 4 and no spaces")
        } else {
          if (!this.rooms.includes(this.create.name)) {
            this.anim = !this.anim
            this.clicked = true
            this.nextParam = 'control-room'
            this.createRoom()
          } else {
            this.createErrors.push("choose an original room name")
          }
        }
        e.preventDefault();
      },
      fetch : function () {
        this.$socket.emit('get updated rooms')
      },
      next : function () {
        if (this.clicked) {
          this.$router.replace({name:this.nextParam})
        }
      },
      toggle : function () {
        this.searching = !this.searching;
      },
      joinRoom : function () {
        this.$socket.emit('join room', this.join)
      },
      createRoom : function () {
        this.$socket.emit('create room', this.create)
      }
    }
  }
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
  .circle {
    position: absolute;
    bottom: -5vh;
    left: -5vw;
    background-color: #FFC9B3;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    z-index: 999;
  }
  .fill {
    height: 100vh;
  }
  * {
  	box-sizing: border-box;
  }

  body {
  	background: #f6f5f7;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	flex-direction: column;
  	font-family: 'Montserrat', sans-serif;
  	height: 100vh;
  	margin: -20px 0 50px;
  }

  h1 {
  	font-weight: bold;
  	margin: 0;
  }

  h2 {
  	text-align: center;
  }

  p {
  	font-size: 14px;
  	font-weight: 100;
  	line-height: 20px;
  	letter-spacing: 0.5px;
  	margin: 20px 0 30px;
  }

  span {
  	font-size: 12px;
  }

  a {
  	color: #333;
  	font-size: 14px;
  	text-decoration: none;
  	margin: 15px 0;
  }

  button {
  	border-radius: 20px;
  	border: 1px solid #000a7b;
  	background-color: #000a7b;
  	color: #FFFFFF;
  	font-size: 12px;
  	font-weight: bold;
  	padding: 12px 45px;
  	letter-spacing: 1px;
  	text-transform: uppercase;
  	transition: transform 80ms ease-in;
  }

  button:active {
  	transform: scale(0.95);
  }

  button:focus {
  	outline: none;
  }

  button.ghost {
  	background-color: transparent;
  	border-color: #FFFFFF;
  }

  form {
  	background-color: #FFFFFF;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	flex-direction: column;
  	padding: 0 50px;
  	height: 100%;
  	text-align: center;
  }

  input {
  	background-color: #eee;
  	border: none;
  	padding: 12px 15px;
  	margin: 8px 0;
  	width: 100%;
  }

  input:focus {
    outline-color: #000a7b;
  }

  .container {
  	background-color: #fff;
  	border-radius: 10px;
    	box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  			0 10px 10px rgba(0,0,0,0.22);
  	position: relative;
  	overflow: hidden;
  	width: 768px;
  	max-width: 100%;
  	min-height: 480px;
  }

  .form-container {
  	position: absolute;
  	top: 0;
  	height: 100%;
  	transition: all 0.6s ease-in-out;
  }

  .search-room-container {
  	left: 0;
  	width: 50%;
  	z-index: 2;
  }

  .container.right-panel-active .search-room-container {
  	transform: translateX(100%);
  }

  .create-room-container {
  	left: 0;
  	width: 50%;
  	opacity: 0;
  	z-index: 1;
  }

  .container.right-panel-active .create-room-container {
  	transform: translateX(100%);
  	opacity: 1;
  	z-index: 5;
  	animation: show 0.6s;
  }

  @keyframes show {
  	0%, 49.99% {
  		opacity: 0;
  		z-index: 1;
  	}

  	50%, 100% {
  		opacity: 1;
  		z-index: 5;
  	}
  }

  .overlay-container {
  	position: absolute;
  	top: 0;
  	left: 50%;
  	width: 50%;
  	height: 100%;
  	overflow: hidden;
  	transition: transform 0.6s ease-in-out;
  	z-index: 100;
  }

  .container.right-panel-active .overlay-container{
  	transform: translateX(-100%);
  }

  .overlay {
    background: rgb(255,201,179);
    background: linear-gradient(31deg, rgba(255,201,179,1) 0%, rgba(0,10,123,1) 100%);
  	background-repeat: no-repeat;
  	background-size: cover;
  	background-position: 0 0;
  	color: #FFFFFF;
  	position: relative;
  	left: -100%;
  	height: 100%;
  	width: 200%;
    	transform: translateX(0);
  	transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    	transform: translateX(50%);
  }

  .overlay-panel {
  	position: absolute;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	flex-direction: column;
  	padding: 0 40px;
  	text-align: center;
  	top: 0;
  	height: 100%;
  	width: 50%;
  	transform: translateX(0);
  	transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
  	transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
  	transform: translateX(0);
  }

  .overlay-right {
  	right: 0;
  	transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
  	transform: translateX(20%);
  }

  .social-container {
  	margin: 20px 0;
  }

  .social-container a {
  	border: 1px solid #DDDDDD;
  	border-radius: 50%;
  	display: inline-flex;
  	justify-content: center;
  	align-items: center;
  	margin: 0 5px;
  	height: 40px;
  	width: 40px;
  }

  footer {
      background-color: #222;
      color: #fff;
      font-size: 14px;
      bottom: 0;
      position: fixed;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 999;
  }

  footer p {
      margin: 10px 0;
  }

  footer i {
      color: red;
  }

  footer a {
      color: #3c97bf;
      text-decoration: none;
  }
  .shadow
  {
    position: relative;
  }
  .shadow:before, .shadow:after
  {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 25px;
    left: 10px;
    width: 50%;
    top: 80%;      display: none;
    max-width:300px;
    background: #777;
    -webkit-box-shadow: 0 35px 20px #777;
    -moz-box-shadow: 0 35px 20px #777;
    box-shadow: 0 35px 20px #777;
    -webkit-transform: rotate(-8deg);
    -moz-transform: rotate(-8deg);
    -o-transform: rotate(-8deg);
    -ms-transform: rotate(-8deg);
    transform: rotate(-8deg);
  }
  .shadow:after
  {
    -webkit-transform: rotate(8deg);
    -moz-transform: rotate(8deg);
    -o-transform: rotate(8deg);
    -ms-transform: rotate(8deg);
    transform: rotate(8deg);
    right: 10px;
    left: auto;
  }
  ::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0,0,0,0);
    -webkit-border-radius: 100px;
  }
  ::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
  ::-webkit-scrollbar-thumb:vertical {
    background: rgba(0,0,0,0.5);
    -webkit-border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:vertical:active {
    background: rgba(0,0,0,0.61);
    -webkit-border-radius: 100px;
  }
  /*Animations*/
  .expand-enter-active {
    animation: expand-circle .75s reverse;
  }
  .expand-leave-active {
    animation: expand-circle .75s;
  }
  @keyframes expand-circle {
    0% {
      position: absolute;
      transform: scale(1);
      background-color: #FFC9B3;
    }
    100% {
      position: absolute;
      transform: scale(85);
      background-color: #000a7b;
    }
  }

</style>

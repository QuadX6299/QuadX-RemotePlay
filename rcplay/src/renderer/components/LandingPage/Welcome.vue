<template>
  <div class="d-flex flex-column">
      <a href="#" class="btn btn-primary" @click="emit('create')">Create Room</a>
      <a href="#" class="btn btn-primary" @click="emit('search')">Search Room</a>
  </div>
</template>

<script>
  export default {
    data : () => {
      return {

      }
    },
    methods : {
      emit : function (key) {
        this.$emit(key)
      }
    }
  }
</script>

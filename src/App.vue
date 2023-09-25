<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  export default {
    name: "App",
    components: {
      NavBar,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .btn-primary {
    background-color: #e56258 !important;
    border-color: #e56258 !important;
  }

  .btn-primary:focus,
  .btn-primary:active,
  .btn-primary.active {
    background-color: #e56258 !important;
    border-color: #e56258 !important;
    box-shadow: none !important; /* This removes the blue glow */
  }

  .btn-primary:hover {
    background-color: #fab0a7 !important;
    border-color: #fab0a7 !important;
  }

  .btn-outline-primary {
    background-color: none !important;
    border-color: #e56258 !important;
    color: #e56258;
  }

  .btn-outline-primary:focus,
  .btn-outline-primary:active,
  .btn-outline-primary:hover {
    background-color: #fab0a7;
    border-color: #fab0a7 !important;
    box-shadow: none !important; /* This removes the blue glow */
    color: white;
  }
</style>

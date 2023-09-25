<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="mr-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">Hello, world! This is a toast message.</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        toastCount: 0,
      };
    },
    methods: {
      makeToast(append = false) {
        this.toastCount++;
        this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
          title: "BootstrapVue Toast",
          autoHideDelay: 5000,
          appendToast: append,
        });
      },
    },
  };
</script>

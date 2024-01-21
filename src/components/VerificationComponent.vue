<script setup>
  import { ref, defineEmits, defineProps, watchEffect } from "vue";

  const code = ref("");
  const emit = defineEmits(["verify", "resendCode"]);
  const props = defineProps({ didSendCode: Boolean });

  watchEffect(() => {
    console.log("Sending Code.", props.didSendCode);
  });

  const verify = async () => {
    emit("verify", {
      code: code.value,
    });
  };
  const resendCode = async () => {
    emit("resend");
  };
</script>

<template>
  <div class="verify-container">
    <div class="row justify-content-center title">
      <div class="col-md-3 col-10 my-2">
        <h1>Verify</h1>
        <p>We sent a verification code to your email {{ props.didSendCode }}</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="input col-md-3 col-10 d-flex">
        <input class="col-12" v-model="code" type="text" />
      </div>
    </div>

    <div class="row justify-content-center"></div>
    <div class="row justify-content-center section">
      <div class="col-md-3 col-10 px-0">
        <div class="input col align-self-center">
          <button type="button" class="btn btn-primary" @click="verify()">
            Verify
          </button>
          <p v-if="props.didSendCode === false">
            Didn't recieve a code? <a href="#" @click="resendCode">Try again</a>
          </p>

          <p v-if="props.didSendCode === true">
            Sent! Please check your email. Didn't get it?
            <a href="#" @click="resendCode">Give it another shot</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section {
    padding-top: 20px;
  }
  .label-style {
    margin: 0;
  }
  .input {
    display: flex;
    flex-direction: column;
  }

  input {
    border-radius: 4px;
    border-color: #e6e6e6;
    border-width: 2px;
    border-style: solid;
  }
  ::placeholder {
    color: #a9adc1;
    opacity: 1; /* Important for Firefox */
  }

  a {
    color: #e56258;
  }

  /* Internet Explorer, Edge */
  :-ms-input-placeholder {
    color: #a9adc1;
  }

  /* Microsoft Edge */
  ::-ms-input-placeholder {
    color: #a9adc1;
  }
  .verify-container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
  }
</style>

<template>
  <div class="sign-up-form">
    <div class="row justify-content-center title">
      <div class="col-md-3 col-10 my-4">
        <h1>Sign In</h1>
        <p>Hey! Welcome Back!</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-3 col-10">
        <div class="input col align-self-center section">
          <label class="label-style">Email</label>
          <input
            v-model="email"
            type="text"
            id="email"
            placeholder="garth@email.com"
          />
        </div>
      </div>
    </div>
    <div class="row justify-content-center section">
      <div class="col-md-3 col-10">
        <div class="input col align-self-center">
          <label class="label-style">Password</label>
          <input
            v-model="password"
            type="text"
            id="password"
            placeholder="SuperSecretPassword"
          />
        </div>
      </div>
    </div>
    <div class="row justify-content-center section">
      <div class="col-md-3 col-10">
        <div class="input col align-self-center">
          <button type="button" class="btn btn-primary" @click="signIn()">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Auth } from "aws-amplify";
  import { useRouter } from "vue-router";
  import { ref } from "vue";

  export default {
    setup() {
      const email = ref("");
      const password = ref("");
      const router = useRouter();
      async function signIn() {
        try {
          console.log(email);
          await Auth.signIn({
            username: email.value,
            password: password.value,
          });
          router.push({ path: "/" });
          console.log("User signed in.");
        } catch (error) {
          console.log(JSON.stringify(error));
          if (error === "The user is not authenticated") {
            router.push({ path: "/verify" });
          }
        }
      }
      return {
        signIn,
        email,
        password,
      };
    },
    name: "SignInPage",
    props: {
      method: String,
    },
    methods: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section {
    padding-top: 20px;
  }
  .label-style {
    margin: 0;
  }
  .input {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  button {
    padding: 10px;
  }
  input {
    border-radius: 4px;
    border-color: #e6e6e6;
    border-width: 2px;
    border-style: solid;
    padding: 8px 15px;
  }
  ::placeholder {
    color: #a9adc1;
    opacity: 1; /* Important for Firefox */
  }

  /* Internet Explorer, Edge */
  :-ms-input-placeholder {
    color: #a9adc1;
  }

  /* Microsoft Edge */
  ::-ms-input-placeholder {
    color: #a9adc1;
  }
  .sign-up-form {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
  }
</style>

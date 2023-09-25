<template>
  <div class="sign-up-form">
    <RegisterComponent
      v-if="!isSignedIn"
      @register="handleRegister"
      @resendCode="resendCode"
    />
    <VerificationComponent
      v-else-if="isSignedIn"
      @verify="handleVerification"
      :did-send-code="didSendCode"
      @resend="resendCode"
    />
  </div>
</template>

<script>
  import { Auth } from "aws-amplify";
  import { useRouter } from "vue-router";
  import RegisterComponent from "../components/RegisterComponent.vue";
  import VerificationComponent from "../components/VerificationComponent.vue";
  import { ref, onMounted } from "vue";
  export default {
    setup() {
      const router = useRouter();
      const emailForVerification = ref("");

      const isSignedIn = ref(false);
      const isVerified = ref(false);
      let didSendCode = ref(false);

      onMounted(async () => {
        try {
          console.log("mount");
          console.log(didSendCode.value);
          const user = await Auth.currentAuthenticatedUser();
          if (user) {
            router.push("/");
            // Add logic to check if user is verified
            // isVerified.value = ...
          }
        } catch (error) {
          if (error === "The user is not authenticated") {
            router.push("/register");
          }
        }
      });

      function handleRouting(route) {
        router.push(`${route}`);
      }

      async function resendCode() {
        try {
          console.log(emailForVerification);
          await Auth.resendSignUp(emailForVerification.value);
          didSendCode = true;
          console.log("Successfully sent code");
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }

      return {
        isSignedIn,
        isVerified,
        emailForVerification,
        handleRouting,
        didSendCode,
        resendCode,
      };
    },
    components: {
      RegisterComponent, // <-- Register the component here
      VerificationComponent,
    },
    name: "RegisterPage",
    props: {
      method: String,
    },
    methods: {
      async handleRegister({ email, password }) {
        try {
          await Auth.signUp(
            {
              username: email,
              password: password,
            },
            { autoSignIn: { enabled: true } }
          );
          console.log("User signed up.");
          this.emailForVerification = email;
          this.isSignedIn = true;
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      },
      async handleVerification({ code }) {
        try {
          console.log(this.emailForVerification);
          await Auth.confirmSignUp(this.emailForVerification, code);
          this.handleRouting("/");
        } catch (error) {
          alert(error);
        }
      },
    },
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

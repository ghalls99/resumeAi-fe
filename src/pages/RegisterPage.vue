<template>
  <div class="sign-up-form">
    <div class="row justify-content-center title">
      <div class="col-md-3 col-10 my-4">
        <h1>Sign Up</h1>
        <p>Hey! Let's Get Started!</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-3 col-10">
        <div class="input col align-self-center section">
          <label class="label-style">Email</label>
          <input v-model="email" type="text" id="email" placeholder="garth@email.com" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center section">
      <div class="col-md-3 col-10">
        <div class="input col align-self-center">
          <label class="label-style">Password</label>
          <input v-model="password" type="text" id="password" placeholder="SuperSecretPassword" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center section">
      <div class="col-md-3 col-10">
        <div class="input col align-self-center">
          <button type="button" class="btn btn-primary" @click="handleRegister()">
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("")

    const isSignedIn = ref(false);
    const isVerified = ref(false);

    onMounted(async () => {
      try {
        console.log("mount");
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          router.push("/");
          // Add logic to check if user is verified
          // isVerified.value = ...
        }
      } catch (error) {
        console.log('no current user')
      }
    });

    function handleRouting(route) {
      router.push(`${route}`);
    }

    async function handleRegister() {
      try {
        await Auth.signUp(
          {
            username: email.value, // use .value to access the ref value
            password: password.value,
          },
          { autoSignIn: { enabled: true } }
        );
        console.log("User signed up.");
        router.push({ path: "/verify", query: { email: email.value } });
      } catch (error) {
        console.log(JSON.stringify(error));
        if(error.code === 'UsernameExistsException') {
          router.push({ path: "/verify", query: { email: email.value} });
        }
      }
    }


    return {
      isSignedIn,
      isVerified,
      email,
      password,
      handleRouting,
      handleRegister
    };
  },
  name: "RegisterPage",
  props: {
    method: String,
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
  opacity: 1;
  /* Important for Firefox */
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

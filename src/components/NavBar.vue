<script setup>
  import { Auth } from "aws-amplify";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  let isSignedIn = ref(false);

  onMounted(async () => {
    try {
      await Auth.currentAuthenticatedUser();
      console.log("validating sign in");
      isSignedIn.value = true;
      console.log(isSignedIn.value);
    } catch (error) {
      isSignedIn.value = false;
    }
  });

  const signIn = () => {
    router.push("/signin");
  };

  const signOut = async () => {
    console.log("here");
    await Auth.signOut();
    isSignedIn = false;
    router.go("/");
  };
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light justify-content-lg-around">
      <a class="navbar-brand" href="/">ResumeAI</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-target="#navbarText"
        data-bs-toggle="collapse"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home <span class="sr-only"></span></a>
          </li>
          <li v-if="isSignedIn" class="nav-item">
            <a class="nav-link" href="/resume-builder">Account</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/submit-job-description"
              >Generate Resume<span class="sr-only"></span
            ></a>
          </li>
        </ul>
        <button
          v-if="isSignedIn"
          class="btn btn-outline-primary my-2 my-sm-0"
          type="button"
          @click="signOut"
        >
          Sign Out
        </button>
        <button
          v-if="!isSignedIn"
          class="btn btn-primary my-2 my-sm-0"
          type="button"
          @click="signIn"
        >
          Sign In
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .btn-primary {
    background-color: #e56258;
    border-color: #e56258;
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

  .btn-primary:hover {
    background-color: #faa7b3 !important;
    border-color: #fab0a7 !important;
  }
</style>

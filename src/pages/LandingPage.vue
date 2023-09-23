<template>
  <div style="background-color: #fef9f3">
    <div class="container">
      <div class="middle">
        <div class="row m-2 mt-5">
          <div
            class="landing-text col-lg-6 col-md-12 d-flex justify-content-center align-self-center"
          >
            <div class="landing-text-div">
              <h1>
                Make Your Resume
                <span style="color: #e56258; font-weight: 700">Great.</span>
              </h1>
              <p class="pr-5 mt-2">
                Customize Your Resume for Each Job Application -Absolutely Free.
              </p>
              <button
                type="button"
                class="btn btn-primary"
                @click="navigateToResumeBuilder"
              >
                Build Your Resume
              </button>
              <p class="pr-5 mt-2">
                Check out our
                <a href="https://www.google.com/">extension</a>
                to make it easier to process jobs you're looking at.
              </p>
            </div>
          </div>
          <div
            class="image-section col-lg-6 col-md-12 d-flex justify-content-center align-self-center"
          >
            <div class="image-asset">
              <img src="../assets/Test.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Auth } from "aws-amplify";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter();

      const navigateToResumeBuilder = async () => {
        try {
          console.log("here");
          const user = await Auth.currentAuthenticatedUser({
            bypassCache: true,
          });
          console.log(JSON.stringify(user));

          if (!user) {
            router.push("/signin");
          }
          // Navigate to resume builder or home page here if user exists
          router.push("/resume-builder");
        } catch (error) {
          router.push("/signin");
        }
      };

      return {
        navigateToResumeBuilder,
      };
    },
    name: "LandingPage",
    props: {
      method: String,
    },
    methods: {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (min-width: 1200px) {
    .container {
      max-width: 1657px;
      min-width: 1200px;
    }
  }
  @media (min-width: 992px) {
    .container {
      max-width: 1627px;
    }
  }
  h1 {
    font-size: 72px;
  }
  a {
    color: #e56258;
  }
  .btn-primary {
    border: none;
    background-color: #e56258;
    padding: 12px;
  }

  img {
    width: 900px;
  }

  @media (max-width: 576px) {
    .landing-text-div {
      padding: 0;
    }
    .middle {
      min-height: none;
    }
    h1 {
      font-size: 48px;
    }

    img {
      width: 376px;
    }
  }

  .middle {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
  }
</style>

<template>
  <div style="background-color: #fef9f3">
    <div class="container">
      <div class="middle">
        <div class="row m-2 mt-5">
          <div
            class="landing-text col-lg-6 col-md-12 d-flex justify-content-center align-self-center"
          >
            <div class="landing-text-div">
              <h1>Make Your Resume</h1>
              <h1>
                <span
                  style="color: #e56258; font-weight: 700"
                  v-html="greatText"
                ></span>
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
  import { ref, onMounted } from "vue";
  export default {
    setup() {
      const router = useRouter();
      let greatText = ref("");
      const words = [
        "Great.",
        "Awesome.",
        "Fantastic.",
        "Amazing.",
        "Brilliant.",
        "Excellent.",
        "Stand Out.",
      ]; // Words to rotate through
      let currentWordIndex = 0;

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

      onMounted(() => {
        let isDeleting = false;
        let i = -1;
        let speed = 200;

        const typeWriter = () => {
          const currentWord = words[currentWordIndex];
          if (isDeleting) {
            greatText.value = currentWord.substring(0, i);
            i--;
            speed = 100;
          } else {
            greatText.value = currentWord.substring(0, i + 1);
            i++;
            speed = 200;
          }

          if (i === currentWord.length) {
            isDeleting = true;
            speed = 2000; // Wait for a second at the end
          } else if (i === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length; // Move to the next word
            speed = 1500; // Wait for a bit before starting the next word
            greatText.value = "&nbsp;"; // Use a non-breaking space to maintain layout
          }

          setTimeout(typeWriter, speed);
        };

        typeWriter();
      });

      return {
        navigateToResumeBuilder,
        greatText,
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

  @media (min-width: 1200px) {
    img {
      width: 900px;
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
    width: 650px;
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

<template>
    <div class="verify-container">
        <div class="row justify-content-center title">
            <div class="col-md-3 col-10 my-2">
                <h1>Verify</h1>
                <p>We sent a verification code to your email {{ resentCode }}</p>
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
                    <p v-if="didSendCode === false">
                        Didn't recieve a code? <a href="#" @click="resendCode()">Try again</a>
                    </p>
                    <p v-if="didSendCode === true">
                        Sent! Please check your email. Didn't get it?
                        <a href="#" @click="resendCode()">Give it another shot</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { Auth } from "aws-amplify";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted} from "vue";

export default {
    setup() {
        const code = ref("")
        const router = useRouter();
        const route = useRoute()
        onMounted(async () => {
     
        });
        const email = route.query.email
        const didSendCode = ref(false)


        const verify = async () => {
            try {
                console.log(code);
                await Auth.confirmSignUp(email, code.value);
                router.push('/')
            } catch (error) {
                alert(error);
            }
        };
        const resendCode = async () => {
            try {
                console.log('i am here')
                didSendCode.value = false
                await Auth.resendSignUp(email);
                didSendCode.value = true;
                console.log("Successfully sent code");
            } catch (error) {
                console.log('erroring')
                console.log(JSON.stringify(error));
            }

        };
        return {
            verify,
            resendCode,
            didSendCode,
            code
        };
    },
    name: "VerificationPage",
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
    opacity: 1;
    /* Important for Firefox */
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

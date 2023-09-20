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
					<input
						v-model="email"
						type="text"
						id="email"
						placeholder="garth@email.com" />
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
						placeholder="SuperSecretPassword" />
				</div>
			</div>
		</div>
		<div class="row justify-content-center section">
			<div class="col-md-3 col-10">
				<div class="input col align-self-center">
					<button type="button" class="btn btn-primary" @click="register()">
						Create Account
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {Auth} from 'aws-amplify';
	import {router} from 'vue-router';

	export default {
		name: 'SignInPage',
		data() {
			return {
				email: '',
				password: '',
			};
		},
		props: {
			method: String,
		},
		methods: {
			async register() {
				const user = Auth.currentAuthenticatedUser();

				if (user) {
					router;
				}
				try {
					await Auth.signIn({
						username: this.email,
						password: this.password,
					});
					console.log('User signed in.');
				} catch (error) {
					alert(error.message);
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

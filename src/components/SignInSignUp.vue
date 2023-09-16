<template>
	<div class="row justify-content-center title">
		<div class="col-md-5 col-10 my-4">
			<h1 v-if="method === 'signup'">Sign Up</h1>
			<h1 v-else>Sign In</h1>
			<p v-if="method === 'signup'">Hey! Let's Get Started!</p>
			<p v-else>Hey, Welcome Back.</p>
		</div>
	</div>
	<div class="row justify-content-center">
		<div class="col-md-5 col-10">
			<div class="input col align-self-center section">
				<label class="label-style">Email</label>
				<input type="text" id="email" placeholder="garth@email.com" />
			</div>
		</div>
	</div>
	<div class="row justify-content-center section">
		<div class="col-md-5 col-10">
			<div class="input col align-self-center">
				<label class="label-style">Password</label>
				<input type="text" id="password" placeholder="SuperSecretPassword" />
			</div>
		</div>
	</div>
	<div class="row justify-content-center section">
		<div class="col-md-5 col-10">
			<div class="input col align-self-center">
				<button type="button" class="btn btn-primary">Create Account</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SignInSignUp',
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
</style>

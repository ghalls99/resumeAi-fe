<template>
	<div class="container sign-up-form">
		<SignInSignUp method="signup" />
	</div>
</template>

<script>
	import SignInSignUp from './components/SignInSignUp.vue';

	export default {
		name: 'App',
		components: {
			SignInSignUp,
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.sign-up-form {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		justify-content: center;
	}
</style>

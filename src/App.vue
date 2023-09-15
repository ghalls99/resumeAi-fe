<template>
	<CreateAccount msg="Welcome to Your Vue.js App" />
</template>

<script>
	import CreateAccount from './components/CreateAccount.vue';

	export default {
		name: 'App',
		components: {
			CreateAccount,
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

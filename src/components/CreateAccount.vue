<template>
	<div class="container align-items-center">
		<div class="input-section">
			<div class="row justify-content-center">
				<div class="col-md-5">
					<div class="input col align-self-center">
						<label>Email</label>
						<input type="text" id="email" placeholder="password" />
					</div>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-5">
					<div class="input col align-self-center">
						<label>Password</label>
						<input type="text" id="password" placeholder="password" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CreateAccount',
		props: {
			msg: String,
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.input {
		display: flex;
		flex-direction: column;
	}
	input {
		border-radius: 4px;
		padding: 5px;
	}
</style>

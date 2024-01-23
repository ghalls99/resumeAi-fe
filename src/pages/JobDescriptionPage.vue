<template>
	<div class="section">
		<h1>Job Description</h1>
		<textarea
			v-model="jobDescription"
			class="large-textarea"
			rows="10"
			placeholder="Paste in the full job description. The more information you provide about the company, the better your resume will be."></textarea>
		<button
			type="button"
			class="btn btn-primary px-5 py-3 my-4"
			@click="submit()">
			Generate Resume
		</button>
	</div>
</template>

<script>
	import {ref} from 'vue';
	import axios from 'axios';
	import {Auth} from 'aws-amplify';
	export default {
		setup() {
			const jobDescription = ref('');

			const submit = async () => {
				const user = await Auth.currentAuthenticatedUser();
                // TO DO: Figure out why the hell the response is not returning. Getting 500. Suspect it has something to do with the lambda request response as it was set up to be an event process on the BE.
                // Taking a look tomorrow.
				const params = {
					method: 'post',
					url: 'https://zoo69sfavg.execute-api.us-east-1.amazonaws.com/dev/process-job',
					headers: {
						'Content-Type': 'application/json',
					},
					data: {
						username: user.username,
						jobDescription: jobDescription.value,
					},
				};

                console.log(JSON.stringify(params))
				const res = await axios(params);
				console.log(JSON.stringify(res.data));
			};
			return {
				submit,
				jobDescription,
			};
		},

		name: 'JobDescriptionPage',
		props: {},
	};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* Horizontally center content */
		align-items: center;
		/* Vertically center content */
		height: 100vh;
		/* Make the container fill the full viewport height */
	}

	.text-section h1 {
		justify-content: flex-start !important;
	}

	.large-textarea {
		width: 100%;
		/* Increased width percentage */
		max-width: 800px;
		/* Adjusted max-width */
		border-radius: 4px;
		border-color: #e6e6e6;
		border-width: 2px;
		border-style: solid;
		padding: 8px 15px;
	}
</style>

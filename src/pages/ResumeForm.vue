<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h1>Contact Info</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="firstName" placeholder="First Name" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="lastName" placeholder="Last Name" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="email" placeholder="Email" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="phone" placeholder="Phone Number" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="role" placeholder="Profession/Role" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="address" placeholder="Address" />
			</div>
		</div>
		<div class="row my-5 bio-section">
			<div class="col-12">
				<h1>Bio</h1>
			</div>
			<div class="col mt-5">
				<textarea
					class="large-textarea"
					rows="10"
					placeholder="Tell us about yourself"></textarea>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<h1>Job History</h1>
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="company" placeholder="Company Name" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="companyLocation" placeholder="Location" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="jobRole" placeholder="Role" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="jobYearStarted" placeholder="Year Started" />
			</div>
			<!-- Add 'Currently here? checkbox or something' also make this a component -->
			<div class="col-12 mt-5">
				<textarea
					class="large-textarea"
					rows="10"
					placeholder="Provide your experiences about the job. Thorough details will provide better results for resume generation."></textarea>
			</div>
		</div>
		<div class="row mt-5">
			<div class="col-12">
				<h1>Education</h1>
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="schoolName" placeholder="School" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="schoolLocation" placeholder="Location" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="major" placeholder="Major" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="degree" placeholder="Degree" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input type="text" id="schoolYearStarted" placeholder="Year Started" />
			</div>
			<div class="col-6 d-flex flex-column mt-4">
				<input
					type="text"
					id="schoolYearCompleted"
					placeholder="Year Completed" />
			</div>
			<!-- Add 'Currently here? checkbox or something' also make this a component -->
			<div class="col-12 mt-5">
				<textarea
					class="large-textarea"
					rows="10"
					placeholder="Provide details about your experiences. Thorough details will provide better results for resume generation."></textarea>
			</div>
		</div>
		<div class="row mt-5 mb-5">
			<div class="col">
				<h1>Skills</h1>
				<input v-model="newSkill" id="skill" placeholder="Enter Skill" />
				<button
					type="button"
					class="btn btn-primary"
					@click="addSkill(newSKill)">
					Add Skill
				</button>
				<div class="row mr-5 gx-3">
					<div
						v-for="(skill, index) in skills"
						:key="index"
						:class="'col-' + skill.colSize"
						class="mt-2">
						<button type="button" class="btn btn-primary">
							{{ skill.placeholder }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newSkill: '',
				skills: [],
			};
		},
		name: 'ResumeForm',
		props: {
			method: String,
		},
		methods: {
			addSkill() {
				console.log('here');
				console.log(this.newSkill);
				if (!this.newSkill) {
					return;
				}

				let colsize = 6;
				if (this.newSkill.length < 10) {
					console.log('tiny');
					colsize = 3;
				}
				if (this.newSkill.length > 20) {
					console.log('huge');
					colsize = 12;
				}
				const newSkillInput = {
					colSize: colsize, // you can change this based on user input
					placeholder: this.newSkill.trim(), // same here
				};
				this.skills.push(newSkillInput);
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.large-textarea {
		width: 100%;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 15px;
	}
</style>

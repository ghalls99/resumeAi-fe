<template>
	<div class="container">
		<FormContainer
			:allowAdditionalSections="false"
			sectionName="Contact Info"
			:inputs="[
				{name: 'firstName', placeholder: 'First Name', inputType: 'input'},
				{name: 'lastName', placeholder: 'Last Name', inputType: 'input'},
				{name: 'email', placeholder: 'Email', inputType: 'input'},
				{
					name: 'phone',
					placeholder: 'Phone Number',
					inputType: 'input',
				},
				{
					name: 'role',
					placeholder: 'Profession/Role',
					inputType: 'input',
				},
				{
					name: 'address',
					placeholder: 'Address',
					inputType: 'input',
				},
			]"
			@update-section-data="updateSectionData" />
		<FormContainer
			:allowAdditionalSections="false"
			sectionName="Bio"
			:inputs="[
				{
					name: 'bio',
					placeholder: 'Tell us about yourself',
					inputType: 'textarea',
				},
			]"
			@update-section-data="updateSectionData" />
		<FormContainer
			:allowAdditionalSections="true"
			sectionName="Job History"
			:inputs="[
				{name: 'company', placeholder: 'Company Name', inputType: 'input'},
				{name: 'companyLocation', placeholder: 'Location', inputType: 'input'},
				{name: 'jobRole', placeholder: 'Role', inputType: 'input'},
				{
					name: 'jobYearStarted',
					placeholder: 'Year Started',
					inputType: 'input',
				},
				{
					name: 'jobYearEnded',
					placeholder: 'Year Ended',
					inputType: 'input',
				},
				{
					name: 'jobDetails',
					placeholder:
						'Provide your experiences about the job. Thorough details will provide better results for resume generation.',
					inputType: 'textarea',
				},
			]"
			@update-section-data="updateSectionData" />
		<FormContainer
			:allowAdditionalSections="true"
			sectionName="Education"
			:inputs="[
				{name: 'schoolName', placeholder: 'School', inputType: 'input'},
				{name: 'schoolLocation', placeholder: 'Location', inputType: 'input'},
				{name: 'major', placeholder: 'Major', inputType: 'input'},
				{name: 'degree', placeholder: 'Degree', inputType: 'input'},
				{
					name: 'schoolYearStarted',
					placeholder: 'Year Started',
					inputType: 'input',
				},
				{
					name: 'schoolYearCompleted',
					placeholder: 'Year Completed',
					inputType: 'input',
				},
				{
					name: 'schoolDetails',
					placeholder:
						'Provide details about your experiences. Thorough details will provide better results for resume generation.',
					inputType: 'textarea',
				},
			]"
			@update-section-data="updateSectionData" />
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
		<div class="row">
			<div class="col mb-5">
				<button
					type="button"
					class="btn btn-primary px-5 py-3"
					@click="submit()">
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import FormContainer from '../components/FormContainer.vue';

	export default {
		data() {
			return {
				newSkill: '',
				skills: [],
				resumeData: {},
			};
		},
		components: {
			FormContainer,
		},
		name: 'ResumeForm',
		props: {
			method: String,
		},
		methods: {
			toCamelCase(str) {
				return str
					.replace(/[^a-zA-Z0-9 ]/g, '') // Remove any non-alphanumeric or non-space characters
					.replace(/\s(.)/g, function ($1) {
						return $1.toUpperCase();
					}) // Convert the first letter after each space to uppercase
					.replace(/\s/g, '') // Remove spaces
					.replace(/^(.)/, function ($1) {
						return $1.toLowerCase();
					}); // Convert the first letter to lowercase
			},
			updateSectionData({id, section, data}) {
				const camelCaseSection = this.toCamelCase(section);

				if (!this.resumeData[camelCaseSection]) {
					this.resumeData[camelCaseSection] = [];
				}

				const existingIndex = this.resumeData[camelCaseSection].findIndex(
					(s) => s.id === id,
				);

				if (existingIndex > -1) {
					this.resumeData[camelCaseSection][existingIndex].data = data;
				} else {
					const newEntry = {
						id,
						data: data,
					};
					this.resumeData[camelCaseSection].push(newEntry);
				}
				console.log(JSON.stringify(this.resumeData));
			},

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
			submit() {
				console.log(JSON.stringify(this.resumeData));
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

	h1 {
		color: #e56258;
	}
	.btn-primary {
		border: none;
		background-color: #e56258;
		padding: 12px;
	}
</style>

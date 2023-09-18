<template>
	<div>
		<div class="row mt-5">
			<div class="col-6">
				<h1>{{ sectionName }}</h1>
			</div>
			<div
				class="col-6 d-flex justify-content-end"
				v-if="allowAdditionalSections">
				<button type="button" class="btn btn-primary" @click="addJob">
					Add
				</button>
			</div>
		</div>
		<div v-for="(item, index) in job" :key="item.id" class="row">
			<div class="col-12 d-flex justify-content-end pt-5" v-if="index !== 0">
				<button
					type="button"
					class="btn btn-danger"
					@click="deleteJob(item.id)">
					Delete
				</button>
			</div>
			<FormSection
				:id="item.id"
				:sectionName="sectionName"
				:inputs="inputs"
				@update-form-data="updateFormData" />
		</div>
	</div>
</template>

<script>
	import FormSection from './FormSection.vue';

	export default {
		data() {
			return {
				job: [{id: this.generateId()}],
				jobFormData: [],
			};
		},
		components: {
			FormSection,
		},
		name: 'FormContainer',
		props: {
			sectionName: String,
			inputs: Array,
			allowAdditionalSections: Boolean,
		},
		watch: {
			jobFormData: {
				handler(newValue) {
					this.$emit('update-section-data', {
						section: this.sectionName,
						data: newValue,
					});
				},
				deep: true,
			},
		},
		methods: {
			addJob() {
				this.job.push({id: this.generateId()});
			},
			deleteJob(id) {
				this.job = this.job.filter((item) => item.id !== id);
			},
			generateId() {
				return '_' + Math.random().toString(36).substr(2, 9);
			},
			updateFormData({id, data}) {
				let job = this.jobFormData.find((job) => job.id === id);
				if (job) {
					job.data = {...job.data, ...data};
				} else {
					this.jobFormData.push({id, data});
				}
			},
		},
	};
</script>

<style scoped>
	h1 {
		color: #585e6d;
	}
	.btn-primary {
		border: none;
		background-color: #e56258;
		padding: 12px;
	}
</style>

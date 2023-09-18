<template>
	<div
		v-for="input in inputs"
		:class="input.inputType === 'input' ? 'col-6' : 'col-12'"
		class="col-6 d-flex flex-column mt-4"
		:key="input">
		<input
			v-model="formData[input.name]"
			v-if="input.inputType === 'input'"
			type="text"
			:id="input.name"
			:placeholder="input.placeholder" />
		<textarea
			v-model="formData[input.name]"
			class="large-textarea"
			rows="10"
			:placeholder="input.placeholder"
			v-if="input.inputType === 'textarea'"></textarea>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
			};
		},
		name: 'ResumeForm',
		props: {
			sectionName: String,
			inputs: Array,
			id: String,
		},
		methods: {},
		watch: {
			formData: {
				handler(newValue) {
					this.$emit('update-form-data', {id: this.id, data: newValue});
				},
				deep: true,
			},
		},
	};
</script>

<style scoped>
	input {
		border-radius: 4px;
		border-color: #e6e6e6;
		border-width: 2px;
		border-style: solid;
		padding: 8px 15px;
	}
	.large-textarea {
		border-radius: 4px;
		border-color: #e6e6e6;
		border-width: 2px;
		border-style: solid;
		padding: 8px 15px;
	}
</style>

<template>
  <!--Iterate through each item in the array to spit out what input is desired-->
  <div
    v-for="input in inputs"
    :class="input.inputType === 'input' ? 'col-6' : 'col-12'"
    class="col-6 d-flex flex-column mt-4"
    :key="input"
  >
    <input
      v-model="formData[input.name]"
      v-if="input.inputType === 'input'"
      type="text"
      :id="input.name"
      :placeholder="input.placeholder"
    />
    <textarea
      v-model="formData[input.name]"
      class="large-textarea"
      rows="10"
      :placeholder="input.placeholder"
      v-if="input.inputType === 'textarea'"
    ></textarea>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {},
      };
    },
    name: "FormSection",
    props: {
      sectionName: String,
      inputs: Array,
      id: String,
      userValues: Object, // Add this
    },
    methods: {},
    watch: {
      formData: {
        handler(newValue) {
          this.$emit("update-form-data", { id: this.id, data: newValue });
        },
        deep: true,
      },
      userValues: {
        immediate: true,
        handler(newValue) {
          if (newValue) {
            this.formData = { ...newValue };
          }
        },
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

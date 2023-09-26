<template>
  <div>
    <h2>{{ userValues.company }}</h2>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {},
      };
    },
    name: "FormSectionPretty",
    props: {
      sectionName: String,
      inputs: Array,
      id: String,
      userValues: Object, // Add this
    },
    methods: {},
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

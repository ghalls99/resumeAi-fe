<template>
  <div>
    <div class="row mt-5">
      <div class="col-6">
        <h1>{{ sectionName }}</h1>
      </div>
      <!--Conditional button if wanting to give the user ability to add more than one section-->
      <div class="col-6 d-flex justify-content-end" v-if="allowAdditionalSections">
        <button class="btn btn-outline-primary" type="button" @click="addsection()">
          <img src="../assets/plusIcon.png" width="25" />
        </button>
      </div>
    </div>
    <!--loops through array of all the data coming in from the database-->
    <div v-for="(item, index) in section" :key="item.id" class="row">
      <div class="col-12 d-flex justify-content-end pt-5" v-if="index !== 0">
        <button type="button" class="btn btn-danger" @click="deletesection(item.id)" :ref="'sectionSection-' + item.id">
          Delete
        </button>
      </div>
      <FormSection :id="item.id" :sectionName="sectionName" :inputs="inputs" :userValues="findInitialData(index)"
        @update-form-data="updateFormData" />
    </div>
  </div>
</template>

<script>
import FormSection from "./FormSection.vue";

export default {
  data() {
    return {
      section: [{ id: this.generateId() }],
      sectionFormData: [],
    };
  },
  components: {
    FormSection,
  },
  name: "FormContainer",
  props: {
    sectionName: String,
    inputs: Array,
    allowAdditionalSections: Boolean,
    initialData: Array, // Add this
  },
  watch: {
    initialData: {
      immediate: true,
      handler(newValue) {
        if (newValue && Array.isArray(newValue)) {
          this.section = newValue[0].data.map(() => {
            return { id: this.generateId() };
          });
        }
      },
    },
    // sectionFormData: A watcher for changes in section form data.
    sectionFormData: {
      handler(newValue) {
        // Emit an event to update the section data whenever there's a change in section form data.
        this.$emit("update-section-data", {
          section: this.sectionName,
          data: newValue,
        });
      },
      deep: true,  // Watch for deep changes in the object.
    },
  },
  methods: {
    addsection() {
      const newId = this.generateId();
      this.section.push({ id: newId });

      // Use Vue's nextTick to wait until the DOM updates
      this.$nextTick(() => {
        const element = this.$refs["sectionSection-" + newId][0];
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    deletesection(id) {
      // Remove the section from the section array
      this.section = this.section.filter((item) => item.id !== id);

      // Remove the corresponding data from sectionFormData
      this.sectionFormData = this.sectionFormData.filter((item) => item.id !== id);

      // Emit the updated data
      this.$emit("update-section-data", {
        section: this.sectionName,
        data: this.sectionFormData,
      });
    },
    generateId() {
      return "_" + Math.random().toString(36).substr(2, 9);
    },
    updateFormData({ id, data }) {4
      // Look 
      let section = this.sectionFormData.find((section) => section.id === id);
      if (section) {
        section.data = { ...section.data, ...data };
      } else {
        this.sectionFormData.push({ id, data });
      }
    },
    findInitialData(index) {
      // Check if initialData prop exists and is an array

      if (this.initialData && Array.isArray(this.initialData)) {
        // Return the data at the given index if it exists
        return this.initialData[0]?.data[index]?.data
          ? this.initialData[0].data[index].data
          : null;
      }
      return null;
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

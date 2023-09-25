<template>
  <div>
    <div class="row mt-5">
      <div class="col-6">
        <h1>{{ sectionName }}</h1>
      </div>
      <div
        class="col-6 d-flex justify-content-end"
        v-if="allowAdditionalSections"
      >
        <button class="btn btn-outline-primary" type="button" @click="addJob()">
          <img src="../assets/plusIcon.png" width="25" />
        </button>
      </div>
    </div>
    <div v-for="(item, index) in job" :key="item.id" class="row">
      <div class="col-12 d-flex justify-content-end pt-5" v-if="index !== 0">
        <button
          type="button"
          class="btn btn-danger"
          @click="deleteJob(item.id)"
          :ref="'jobSection-' + item.id"
        >
          Delete
        </button>
      </div>
      <FormSection
        :id="item.id"
        :sectionName="sectionName"
        :inputs="inputs"
        :userValues="findInitialData(index)"
        @update-form-data="updateFormData"
      />
    </div>
  </div>
</template>

<script>
  import FormSection from "./FormSection.vue";

  export default {
    data() {
      return {
        job: [{ id: this.generateId() }],
        jobFormData: [],
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
          console.log("new value", JSON.stringify(newValue));
          if (newValue && Array.isArray(newValue)) {
            this.job = newValue[0].data.map(() => {
              return { id: this.generateId() };
            });
          }
        },
      },
      jobFormData: {
        handler(newValue) {
          this.$emit("update-section-data", {
            section: this.sectionName,
            data: newValue,
          });
        },
        deep: true,
      },
    },
    methods: {
      addJob() {
        const newId = this.generateId();
        this.job.push({ id: newId });

        // Use Vue's nextTick to wait until the DOM updates
        this.$nextTick(() => {
          const element = this.$refs["jobSection-" + newId][0];
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
      },
      deleteJob(id) {
        // Remove the job from the job array
        this.job = this.job.filter((item) => item.id !== id);

        // Remove the corresponding data from jobFormData
        this.jobFormData = this.jobFormData.filter((item) => item.id !== id);

        // Emit the updated data
        this.$emit("update-section-data", {
          section: this.sectionName,
          data: this.jobFormData,
        });
      },
      generateId() {
        return "_" + Math.random().toString(36).substr(2, 9);
      },
      updateFormData({ id, data }) {
        let job = this.jobFormData.find((job) => job.id === id);
        if (job) {
          job.data = { ...job.data, ...data };
        } else {
          this.jobFormData.push({ id, data });
        }
      },
      findInitialData(index) {
        // Check if initialData prop exists and is an array

        if (this.initialData && Array.isArray(this.initialData)) {
          console.log(
            "initial data",
            JSON.stringify(this.initialData[0]?.data.length)
          );
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

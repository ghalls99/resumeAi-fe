<!--Need to add ability to prefill user form data.-->
<!--Need to fix skills section-->
<template>
  <div class="container">
    <div class="my-5">
      <h1>Your resume</h1>
      <p>Set, adjust, and edit your resume here.</p>
    </div>
    <!--Dynamically handle desired input sections. Allows for future scalabilty of different sections-->
    <FormContainer :allowAdditionalSections="false" sectionName="Contact Info" :initialData="userData.contact_info"
      :inputs="[
        {
          name: 'firstName',
          placeholder: 'First Name',
          inputType: 'input',
        },
        { name: 'lastName', placeholder: 'Last Name', inputType: 'input' },
        { name: 'email', placeholder: 'Email', inputType: 'input' },
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
      ]" @update-section-data="updateSectionData" />
    <FormContainer :allowAdditionalSections="false" sectionName="Bio" :initialData="userData.bio" :inputs="[
      {
        name: 'bio',
        placeholder: 'Tell us about yourself',
        inputType: 'textarea',
      },
    ]" @update-section-data="updateSectionData" />
    <FormContainer :allowAdditionalSections="true" sectionName="Job History" :initialData="userData.job_history" :inputs="[
      { name: 'company', placeholder: 'Company Name', inputType: 'input' },
      {
        name: 'companyLocation',
        placeholder: 'Location',
        inputType: 'input',
      },
      { name: 'jobRole', placeholder: 'Role', inputType: 'input' },
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
    ]" @update-section-data="updateSectionData" />
    <FormContainer :allowAdditionalSections="true" sectionName="Education" :initialData="userData.education" :inputs="[
      { name: 'schoolName', placeholder: 'School', inputType: 'input' },
      { name: 'schoolLocation', placeholder: 'Location', inputType: 'input' },
      { name: 'major', placeholder: 'Major', inputType: 'input' },
      { name: 'degree', placeholder: 'Degree', inputType: 'input' },
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
    ]" @update-section-data="updateSectionData" />
    <div class="row mt-5 mb-5">
      <div class="col-md-6">
        <h1>Skills</h1>
        <input v-model="newSkill" id="skill" placeholder="Enter Skill" />
        <button type="button" class="btn btn-primary p-2" @click="addSkill(newSKill)">
          Add
        </button>
        <div class="row mr-3">
          <div v-for="(skill, index) in skills" :key="index" :class="'col-' + skill.colSize" class="mt-2">
            <button type="button" class="btn btn-secondary" @click="removeSkill(index)">
              <div class="d-flex align-items-center">
                {{ skill.placeholder }}
                <p class="pl-2 m-0">X</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col mb-5">
        <button type="button" class="btn btn-primary px-5 py-3" @click="submit()">
          Save All Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FormContainer from "../components/FormContainer.vue";
import axios from "axios";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      newSkill: "",
      skills: [],
      resumeData: {},
      userData: {},
    };
  },
  async mounted() {
    // Fetch user data when the component is mounted
    const user = await Auth.currentAuthenticatedUser();
    const { idToken } = user.getSignInUserSession();
    console.log(idToken);
    const res = await axios.get(
      `https://zoo69sfavg.execute-api.us-east-1.amazonaws.com/dev/get-resume/${user.username}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken.jwtToken,
        },
      }
    );

    if (res.data) {
      this.userData = res.data || {};

      if (res.data.skills) {
        this.skills.push(...res.data.skills);
      }

    }
  },
  components: {
    FormContainer,
  },
  name: "ResumeForm",
  props: {
    method: String,
  },
  methods: {
    // This whole thing sucks and was incredibly tedious to make.
    toCamelCase(str) {
      return str
        .replace(/[^a-zA-Z0-9 ]/g, "") // Remove any non-alphanumeric or non-space characters
        .replace(/\s(.)/g, function ($1) {
          return $1.toUpperCase();
        }) // Convert the first letter after each space to uppercase
        .replace(/\s/g, "") // Remove spaces
        .replace(/^(.)/, function ($1) {
          return $1.toLowerCase();
        }); // Convert the first letter to lowercase
    },
    // updateSectionData function: Updates the resume data with new section data.
    updateSectionData({ id, section, data }) {
      // Convert the section name to camelCase format.
      const camelCaseSection = this.toCamelCase(section);

      // If the camelCaseSection does not exist in resumeData, initialize it as an empty array.
      if (!this.resumeData[camelCaseSection]) {
        this.resumeData[camelCaseSection] = [];
      }

      // Find the index of the existing entry in the resumeData section by matching the id.
      // This accounts for repulling data and data deletion
      const existingIndex = this.resumeData[camelCaseSection].findIndex(
        (s) => s.id === id
      );

      // If an existing entry is found, update its data.
      // Prevents overwrite of different sections
      if (existingIndex > -1) {
        this.resumeData[camelCaseSection][existingIndex].data = data;
      } else {
        // If no existing entry is found, create a new entry and add it to the resumeData section.
        const newEntry = {
          id,
          data: data,
        };
        this.resumeData[camelCaseSection].push(newEntry);
      }

    },


    addSkill() {
      if (!this.newSkill) {
        return;
      }

      let colsize = 6;
      if (this.newSkill.length < 10) {
        colsize = 3;
      }
      if (this.newSkill.length > 20) {
        colsize = 12;
      }
      const newSkillInput = {
        colSize: colsize, // you can change this based on user input
        placeholder: this.newSkill.trim(),
      };
      this.skills.push(newSkillInput);
      this.newSkill = "";
    },
    removeSkill(index) {
      this.skills.splice(index, 1);
      console.log(this.skills);
    },
    async submit() {
      const user = await Auth.currentAuthenticatedUser();
      const res = await axios.post(
        "https://zoo69sfavg.execute-api.us-east-1.amazonaws.com/dev/upload-resume",
        { ...this.resumeData, username: user.username, skills: this.skills },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(JSON.stringify(res.data));
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

.btn-primary {
  border: none;
  background-color: #e56258;
  padding: 12px;
}
</style>

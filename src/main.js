import {createApp} from 'vue';
import App from './App.vue';
import router from './router.js';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

createApp(App).use(router).mount('#app');

import {createRouter, createWebHistory} from 'vue-router';
import SignInSignUp from './components/SignInSignUp.vue';
import LandingPage from './pages/LandingPage.vue';
import ResumeForm from './pages/ResumeForm.vue';

const routes = [
	{path: '/create-account', component: SignInSignUp, props: {method: 'signup'}},
	{path: '/signin', component: SignInSignUp, props: {method: 'signIn'}},
	{path: '/', component: LandingPage, props: {method: 'signIn'}},
	{
		path: '/resume-data-form',
		component: ResumeForm,
		props: {method: 'signIn'},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

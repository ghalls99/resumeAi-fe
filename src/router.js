import {createRouter, createWebHistory} from 'vue-router';
import RegisterPage from './pages/RegisterPage.vue';
import LandingPage from './pages/LandingPage.vue';
import ResumeForm from './pages/ResumeForm.vue';
import SignInPage from './pages/SignInPage.vue';
import VerificationPage from './pages/VerificationPage.vue';
import JobDescriptionPage from './pages/JobDescriptionPage.vue';

const routes = [
	{path: '/register', component: RegisterPage},
	{path: '/signin', component: SignInPage},
	{path: '/', component: LandingPage},
	{path: '/resume-builder', component: ResumeForm},
	{
		path: '/verify',
		component: VerificationPage,
		props: (route) => ({email: route.query.email}),
	},
	{path: '/submit-job-description', component: JobDescriptionPage},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

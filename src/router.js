import {createRouter, createWebHistory} from 'vue-router';
import RegisterPage from './pages/RegisterPage.vue';
import LandingPage from './pages/LandingPage.vue';
import ResumeForm from './pages/ResumeForm.vue';
import SignInPage from './pages/SignInPage.vue';

const routes = [
	{path: '/register', component: RegisterPage},
	{path: '/signin', component: SignInPage},
	{path: '/', component: LandingPage},
	{path: '/resume-data-form', component: ResumeForm},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

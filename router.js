import {createRouter, createWebHistory} from 'vue-router';
import SignInSignUp from './components/SignInSignUp.vue';
import AnotherPage from './components/AnotherPage.vue';

const routes = [
	{path: '/create-account', component: SignInSignUp, props: {method: 'signUp'}},
	{path: '/signin', component: SignInSignUp, props: {method: 'signIn'}},
	{path: '/another-page', component: AnotherPage},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

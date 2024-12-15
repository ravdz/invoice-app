import Vuelidate from "vuelidate";

import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vuelidate);
});

import Vuelidate from 'vuelidate'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vuelidate)
})

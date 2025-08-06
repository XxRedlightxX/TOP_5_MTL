/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import routeur from "./router"
import { createPinia } from 'pinia'

// Composables
import { createApp, markRaw } from 'vue'

const app = createApp(App)
const pinia = createPinia() 

registerPlugins(app)

pinia.use(({store}) =>{
    store.router = markRaw(routeur)

})
app.use(pinia)
app.use(routeur)
app.mount('#app')

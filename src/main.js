//import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/themes.css'
import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})
createApp(App).use(vuetify).mount('#app')
app.use(router)

app.mount('#app')

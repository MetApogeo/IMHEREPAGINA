import './assets/main.css'
import './assets/bootstrap.min.css'
import './assets/bootstrap.bundle.min.js'
import './assets/CSS/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'bootstrap';


const app = createApp(App)

app.use(router)

app.mount('#app')

app.use(store)

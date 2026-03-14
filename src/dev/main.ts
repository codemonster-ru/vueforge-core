import { createApp } from 'vue'
import './demo.css'
import App from './App.vue'
import { VueForge } from '@/index'

const app = createApp(App)

app.use(VueForge)

app.mount('#app')

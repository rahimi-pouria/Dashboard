import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { getCurrentUserStore } from './stores/index.ts'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
// @ts-ignore
import { BootstrapVue3 } from 'bootstrap-vue-3'

const messages = {
    en: { message: { hello: 'hello world' } },
    fa: { message: { hello: 'سلام دنیا' } }
}

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(getCurrentUserStore)
app.use(i18n)
app.use(BootstrapVue3)
app.mount('#app')


import type {App} from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia();

export function setupStore(app:App<Element>){
    app.use(store)
    store.use(piniaPluginPersistedstate)
}

export * from './modules/user'
export * from './modules/app'
export * from './modules/setting'

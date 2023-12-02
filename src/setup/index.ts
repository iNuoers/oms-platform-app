import type { App } from 'vue'
import '@/api/http.interceptor'
import setNutUi from '../nutui'

export function setup(app: App) {
    app.use(setNutUi)
}

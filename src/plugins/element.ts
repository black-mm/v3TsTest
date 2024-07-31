import ElementPlus from 'element-plus'
import type {App} from 'vue'

export function setElement(app:App<Element>){
    app.use(ElementPlus)
}
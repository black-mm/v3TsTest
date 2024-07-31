import type { App } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setElement } from "./element";
import { setElementIcon } from "./icons";
import {setPermission} from './permission'

export default{
    install(app:App<Element>){
        // 状态管理(store)
        setupStore(app)
        setupRouter(app)
        setElement(app)
        setElementIcon(app)
        setPermission()
    }
}
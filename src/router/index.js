import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/HomePage.vue"
import DishPosition from "../components/DishPosition.vue"

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            name:'home',
            component:HomePage,
        },
        {
            path:"/DishPosition",
            name:'dishPosition',
            component:DishPosition,
        }
    ]
})

export default router;
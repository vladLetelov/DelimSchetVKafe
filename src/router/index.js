import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/HomePage.vue"
import DishPosition from "../components/DishPosition.vue"
import ResultWindow from "../components/ResultWindow.vue";
import { usePersonStore } from "../stores/PersonStore";
import { usePositionStore } from "../stores/PositionStore";


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
            beforeEnter:(to, from, next)=>{
                const personStorage = usePersonStore();
                if(personStorage.peoples.length > 0){ //проверка является ли пользователь авторизованные, если да то его пропускает
                  next()
                }else{
                  next({name: 'home'})//иначе доступ его возвращают на эту-же страницу
                }
            },
        },
        {
            path:"/Result",
            name:'result',
            component:ResultWindow,
            beforeEnter:(to, from, next)=>{
                const positionStore = usePositionStore();
                if(positionStore.dishPosition.length > 0){ //проверка является ли пользователь авторизованные, если да то его пропускает
                  next()
                }else{
                  next({name: 'dishPosition'})//иначе доступ его возвращают на эту-же страницу
                }
            }
        },
    ]
})

export default router;
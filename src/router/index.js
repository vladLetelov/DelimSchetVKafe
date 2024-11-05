import { createRouter, createWebHashHistory } from "vue-router";
import StartPage from '../components/StartPage.vue';
import AddPerson from "../components/AddPerson.vue"
import DishPosition from "../components/DishPosition.vue"
import ResultWindow from "../components/ResultWindow.vue";
import { usePersonStore } from "../stores/PersonStore";
import { usePositionStore } from "../stores/PositionStore";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
      {
        path:"/",
        name:'start',
        component:StartPage,
      },
        {
            path:"/AddPerson",
            name:'addPerson',
            component:AddPerson,
        },
        {
            path:"/DishPosition",
            name:'dishPosition',
            component:DishPosition,
            beforeEnter:(to, from, next)=>{
                const personStorage = usePersonStore();
                if(personStorage.peoples.length === 1){
                  alert("Чтобы продолжить добавьте еще персону");

                }else if(personStorage.peoples.length > 1){
                  next()
                }else{
                  next({name:'start'});
                }
            },
        },
        {
            path:"/Result",
            name:'result',
            component:ResultWindow,
            beforeEnter:(to, from, next)=>{
                const positionStore = usePositionStore();
                if(positionStore.dishPosition.length === 1){ 
                  alert("Чтобы продолжить добавьте еще позицию");
                }else if(positionStore.dishPosition.length > 1){
                  next()
                }else{
                  next({name:'start'});
                }
            }
        },
    ]
})


export default router;
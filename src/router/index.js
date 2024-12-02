import { createRouter, createWebHashHistory } from "vue-router";
import StartPage from '../components/StartPage.vue';
import AddPerson from "../components/AddPerson.vue"
import DishPosition from "../components/DishPosition.vue"
import ResultWindow from "../components/ResultWindow.vue";
import NotFound from "../components/NotFound.vue";
import { usePersonStore } from "../stores/PersonStore";
import { usePositionStore } from "../stores/PositionStore";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[// Маршруты
      {
        path:"/", // Пути по которым пользователь может переходить по страницам
        name:'start', // Название путей
        component:StartPage, // Компонент который используется при переходе на существующий путь
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
          if(personStorage.peoples.length > 1){//Если персон больше 1, то происходит переход на следующую страницу
            next()
          }else{
            next({name:'start'});// Иначе пользователя возвращает на стартовую страницу
          }
        },
      },
      {
        path:"/Result",
        name:'result',
        component:ResultWindow,
        beforeEnter:(to, from, next)=>{
          const positionStore = usePositionStore();
          if(positionStore.dishPosition.length > 1){
            next()
          }else{
            next({name:'start'});
          }
        }
      },
      {
        path: '/:pathMatch(.*)*', 
        name: "NotFound",
        component: NotFound,
      },
    ]
})


export default router;
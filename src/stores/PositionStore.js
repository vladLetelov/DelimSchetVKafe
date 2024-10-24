import {defineStore} from 'pinia';
import { ref } from 'vue';


export const usePositionStore = defineStore('positionStore', {
    state: () => ({
        dishPosition:[],
        result: 0,
    }),
    actions: {
        addDishPosition(payerName, namePosition, price, persons){
            this.dishPosition.push(
                {
                    payerName,
                    namePosition,
                    price,
                    persons,
                }
            );
        }
    },
});
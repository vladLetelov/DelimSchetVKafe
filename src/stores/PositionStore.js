import {defineStore} from 'pinia';



export const usePositionStore = defineStore('positionStore', {
    state: () => ({
        dishPosition:[],
        result: 0,
        isResultBtnActive: false,
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
        },
        delDishPosition(index){
            this.dishPosition.splice(index,1);
        },
    },
});
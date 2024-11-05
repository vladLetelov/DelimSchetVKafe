import {defineStore} from 'pinia';



export const usePositionStore = defineStore('positionStore', {
    state: () => ({
        dishPosition:[],
        result: 0,
        isResultBtnActive: false,
        editingPosition: null,
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
        updateDishPosition(editingIndex, payerName, namePosition, price, persons){
            this.dishPosition[editingIndex].payerName = payerName;
            this.dishPosition[editingIndex].namePosition = namePosition;
            this.dishPosition[editingIndex].price = price;
            this.dishPosition[editingIndex].persons = persons;
        },
        updatePositionsAfterPersonRemoval(removedPerson) {
            this.dishPosition = this.dishPosition.filter(position => {

              position.persons = position.persons.filter(person => person !== removedPerson);

              return position.persons.length > 0;
            });
          },
    },
});
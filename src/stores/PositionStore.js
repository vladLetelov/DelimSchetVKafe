import {defineStore} from 'pinia';



export const usePositionStore = defineStore('positionStore', {
    state: () => ({
        dishPosition:[],//массив содержащий все позиции
        result: 0, //результат суммы всех позиций
        isResultBtnActive: false, // переменная отвечающая за условие создания кнопки
        editingPosition: null, // проверка находится ли пользователь в режиме редактирования
    }),
    actions: {
        addDishPosition(payerName, namePosition, price, persons){ // метод добавления новой позиции
            this.dishPosition.push(
                {
                    payerName,
                    namePosition,
                    price,
                    persons,
                }
            );
        },
        delDishPosition(index){ // удаление позиции по индексу
            this.dishPosition.splice(index,1);
        },
        updateDishPosition(editingIndex, payerName, namePosition, price, persons){ // обновление данных о позиции
            this.dishPosition[editingIndex].payerName = payerName;
            this.dishPosition[editingIndex].namePosition = namePosition;
            this.dishPosition[editingIndex].price = price;
            this.dishPosition[editingIndex].persons = persons;
        },
        updatePositionsAfterPersonRemoval(removedPerson) { // метод удаления позиции, если были удалены все персоны этой позиции
            this.dishPosition = this.dishPosition.filter(position => {

              position.persons = position.persons.filter(person => person !== removedPerson);

              return position.persons.length > 0;
            });
          },
    },
});
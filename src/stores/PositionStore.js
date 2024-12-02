import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';


export const usePositionStore = defineStore('positionStore', () => {
    // Определение состояния
    const dishPosition = ref([]); // массив всех позиций
    const result = ref(0); // результат суммы всех позиций
    const isResultBtnActive = ref(false); // переменная для отображения кнопки
    const editingPosition = ref(null); // проверка режима редактирования

    // Методы
    const AddDishPosition = (payerName, namePosition, price, persons) => {
        dishPosition.value.push({
            id: uuidv4(),
            payerName,
            namePosition,
            price,
            persons,
          });
    };

    const DelDishPosition = (id) => {
        dishPosition.value = dishPosition.value.filter((position) => position.id !== id);
      };

    const updateDishPosition = (id, updatedPosition) => {
        const index = dishPosition.value.findIndex((pos) => pos.id === id);
        if (index !== -1) {
          dishPosition.value[index] = {
            ...dishPosition.value[index],
            ...updatedPosition,
          };
        }
      }

    const updatePositionsAfterPersonRemoval = (removedPerson) => {
        dishPosition.value = dishPosition.value.filter((position) => {
            position.persons = position.persons.filter((person) => person !== removedPerson);
            return position.persons.length > 0;
        });
    };

    // Возвращаем состояние и методы
    return {
        dishPosition,
        result,
        isResultBtnActive,
        editingPosition,
        AddDishPosition,
        DelDishPosition,
        updateDishPosition,
        updatePositionsAfterPersonRemoval,
    };
});

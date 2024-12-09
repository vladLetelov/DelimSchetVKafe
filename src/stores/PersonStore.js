import { defineStore } from "pinia";
import { ref } from "vue";
import { usePositionStore } from "./PositionStore";
import { v4 as uuidv4 } from 'uuid';

export const usePersonStore = defineStore("personStore", () => {
  // Состояние
  const peoples = ref([]); // Массив персон
  const isaddPerson = ref(false); // Проверка, добавлена ли персона
  const debts = ref([]); // Массив долгов

  // Методы
  const addPerson = (name) => {
    peoples.value.push({ id: uuidv4(), name, balance: 0 });
  };

  const delitePerson = (id) => {
    // Находим индекс персоны с заданным id
    const personIndex = peoples.value.findIndex((person) => person.id === id);

    if (personIndex === -1) {
      console.warn(`Persona with id ${id} does not exist.`);
      return; // Если такой персоны нет, выходим из функции
    }

    // Получаем имя удаляемой персоны для обновления позиций
    const removedPerson = peoples.value[personIndex].name;

    // Удаляем персону из массива
    peoples.value.splice(personIndex, 1);

    // Обновляем позиции в связанном сторе
    const positionStore = usePositionStore();
    positionStore.updatePositionsAfterPersonRemoval(removedPerson);
  };

  const calculateDebt = () => {
    // Очищаем предыдущие данные долгов
    debts.value = [];

    const positionStore = usePositionStore();
    const dishPosition = positionStore.dishPosition;

    // Создаем объект для учета итоговых долгов между парами
    const rawDebts = {};

    // Рассчитываем долг для каждой позиции
    dishPosition.forEach(({ payerName, price, persons }) => {
      const costPerPerson = price / persons.length;

      persons.forEach((personName) => {
        if (personName !== payerName) {
          const key = `${payerName}-${personName}`;
          const reverseKey = `${personName}-${payerName}`;

          // Увеличиваем долг, если он уже существует, иначе создаем новую запись
          if (rawDebts[reverseKey]) {
            rawDebts[reverseKey] -= costPerPerson;
          } 
          else {
            rawDebts[key] = (rawDebts[key] || 0) + costPerPerson;
          }
        }
      });
    });

    // Сохраняем долги, фильтруя записи с ненулевым значением
    debts.value = Object.entries(rawDebts)
      .filter(([_key, amount]) => amount !== 0) // Фильтруем только актуальные долги
      .flatMap(([key, amount]) => {
        const [payer, debtor] = key.split("-");
        if (amount > 0) {
          return { from: debtor, to: payer, amount };
        } else if (amount < 0) {
          return { from: payer, to: debtor, amount: -amount };
        }
      });
  };

  // Возвращаем состояние и методы
  return {
    peoples,
    isaddPerson,
    debts,
    addPerson,
    delitePerson,
    calculateDebt,
  };
});

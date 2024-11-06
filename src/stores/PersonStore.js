import { defineStore } from 'pinia';
import { usePositionStore } from './PositionStore';

export const usePersonStore = defineStore('personStore', {
    state: () => ({
      peoples: [], // Объявление массива персон
      isAddPerson: false, // проверка добавленна ли персона
      debts: [], // Массив хранящий долги
    }),
    actions: {
      addPerson(name) {//метод добавления имени персоны и начального баланса
          this.peoples.push({ name, balance: 0 });
      },
      delitePerson(index) {//метод удаления персоны
        const removedPerson = this.peoples[index].name;
      this.peoples.splice(index, 1);

      // Обновление позиций при удалении персоны
      const positionStore = usePositionStore();
      positionStore.updatePositionsAfterPersonRemoval(removedPerson);
      },
      CalculateDebt() {
        // Очищаем предыдущие данные долгов
        this.debts = [];

        const positionStore = usePositionStore();
        const dishPosition = positionStore.dishPosition;

        // Создаем объект для учета итоговых долгов между парами
        const rawDebts = {};

        // Рассчитываем долг для каждой позиции
        dishPosition.forEach(({ payerName, price, persons }) => {
            const costPerPerson = price / persons.length;

            persons.forEach(personName => {
                if (personName !== payerName) {
                    const key = `${payerName}-${personName}`;
                    const reverseKey = `${personName}-${payerName}`;

                    // Увеличиваем долг, если он уже существует, иначе создаем новую запись
                    if (rawDebts[reverseKey]) {
                        rawDebts[reverseKey] -= costPerPerson;
                    } else {
                        rawDebts[key] = (rawDebts[key] || 0) + costPerPerson;
                    }
                }
            });
        });

        //сохранение долга если выполняется условие
        this.debts = Object.entries(rawDebts).flatMap(([key, amount]) => {
            const [payer, debtor] = key.split('-');
            if (amount > 0) {
                return { from: debtor, to: payer, amount };
            } else if (amount < 0) {
                return { from: payer, to: debtor, amount: -amount };
            }
            return [];
        });
    }
}
});

import { defineStore } from 'pinia';
import { usePositionStore } from './PositionStore';

export const usePersonStore = defineStore('personStore', {
    state: () => ({
      peoples: [],
      isAddPerson: false,
      debts: [],
    }),
    actions: {
      addPerson(name) {
          this.peoples.push({ name, balance: 0 });
      },
      delitePerson(index) {
        this.peoples.splice(index, 1);
      },
      updateBalances() {
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

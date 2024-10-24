import {defineStore} from 'pinia';

export const usePersonStore = defineStore('personStore', {
    state: () => ({
      peoples: [],
      isAddPerson: false,
    }),
    actions: {
      addPerson(name) {
          this.peoples.push({ name });
      },
      delitePerson(index) {
        this.peoples.splice(index, 1);
      },
    },
});
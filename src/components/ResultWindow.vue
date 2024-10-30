<template>
<v-container grid-list-xs>
    <v-card>
        <v-card-title primary-title class="text-center"> 
            Итоговые результаты
        </v-card-title>
        <v-container
         v-for="(debt, index) in debts" :key="index">
        {{ debt.from }} должен {{ debt.to }} <span>{{ debt.amount }} рублей</span>
        </v-container>
    </v-card>
</v-container>
</template>
    
<script >
import { ref } from 'vue';
import { usePersonStore } from '../stores/PersonStore.js';
import { storeToRefs } from 'pinia';
import { usePositionStore } from '../stores/PositionStore.js';

export default{

    name:'ResultWindow',
    setup(){
        const userStore = usePersonStore();
        const {peoples, debts} = storeToRefs(userStore);

        const positionStore = usePositionStore();
        const {dishPosition} = storeToRefs(positionStore);

          userStore.CalculateDebt(); // Вызываем обновление долгов
    
        const positionInfo = (info) => {
            return `${info.name}: ${info.balance}`
        };

        return{
            dishPosition,
            positionInfo,
            peoples,
            debts,
        }
    }
}
</script>
    
<style scoped>
.text-center{
    text-align: center;
}
span{
    text-decoration: underline;
}
</style>
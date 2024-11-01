<template>
<v-container grid-list-xs>
    <v-card>
        <v-card-title primary-title class="text-center"> 
            Итоговые результаты
            <v-bottom-sheet>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" text="?" color="blue" class="border-radius"></v-btn>
                </template>

                <v-card
                    width="50%"
                    class="block-center"
                >
                    <v-card-text>
                       <p>Производится расчет долгов между людьми, которые ели одно блюдо.</p>
                       <p>Исходя из того, кто за кого заплатил и сколько</p>
                    </v-card-text>
                </v-card>
            </v-bottom-sheet>
        </v-card-title>
        <v-container>
            <v-card 
                v-if="debts.length > 0">
                <v-card-text
                    v-for="(debt, index) in debts"
                    :key="index"
                >
                    {{ debt.from }} должен {{ debt.to }} <span>{{ debt.amount }} рублей</span>
                </v-card-text>
            </v-card>
            <v-card 
                v-else>
                <v-card-text>
                    Никто, никому, ничего не должен
                </v-card-text>
            </v-card>
        </v-container>
    </v-card>
</v-container>
</template>
    
<script >
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
.block-center{
    margin: auto;
    background-color:#C5C6C7;
    text-align: left;
}
.border-radius{
    border-radius:50%;
    margin: 0 0 0 10px;
}
span{
    text-decoration: underline;
}
.card_list{
    padding: 20px;
}
</style>
<template>
<v-container grid-list-xs>
    <v-card class="cardStyle">
        <v-card-title primary-title class="text-center"> 
            Итоговые результаты
            <v-bottom-sheet>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" text="?" color="blue" class="border-radius"></v-btn>
                </template>

                <v-card
                    width="50%"
                    class="block-center textStyle"
                >
                    <v-card-text>
                       <p>Производится расчет долгов между людьми, которые ели одно блюдо.</p>
                       <p>Исходя из того, кто за кого заплатил и сколько</p>
                    </v-card-text>
                </v-card>
            </v-bottom-sheet>
        </v-card-title>
        <v-container>
            <v-card class="cardStyle list"
                v-if="debts.length > 0">
                <v-card-text class="textStyle"
                    v-for="(debt, index) in debts"
                    :key="index"
                >
                    {{ debt.from }} должен {{ debt.to }} <span>{{ debt.amount.toFixed(2) }} рублей</span>
                </v-card-text>
            </v-card>
            <v-card class="cardStyle"
                v-else>
                <v-card-text>
                    Никто, никому, ничего не должен
                </v-card-text>
            </v-card>
            <v-btn class="btn"
            @click="this.$router.back()">Назад</v-btn>
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


        return{
            dishPosition,
            peoples,
            debts,
        }
    }
}
</script>
    
<style lang="scss" scoped>
@import "../styles/mixins.scss";

.text-center{
    text-align: center;
    @include textStyle;
}

span{
    text-decoration: underline;
    color:red;
}


.block-center{
    @include block-center;
}
</style>
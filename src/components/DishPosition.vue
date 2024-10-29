<template>
<v-container grid-list-xs>
    <v-card>
        <v-card-title primary-title>
            Добавление новой позиции
        </v-card-title>
        <v-container grid-list-xs>
            <v-btn class="btn"
            @click="isAddPosition = true">Добавить позицию</v-btn>
        </v-container>
        <v-container grid-list-xs
        v-if="isAddPosition">
        <v-select
                :items="peoples"
                item-value="name"
                item-title="name"
                label="Выберите платильщика"
                v-model="payerName">
                </v-select>
            <v-text-field
                name="name"
                label="Наименование позиции"
                v-model="namePosition"
            ></v-text-field>
            <v-text-field
                name="name"
                label="Стоимость"
                v-model="price"
                type = "number"
            ></v-text-field>
            <v-select
                :items="peoples"
                item-value="name"
                item-title="name"
                label="Выберите человека/людей"
                chips
                multiple
                v-model="persons">
            </v-select>
        </v-container>
        <v-container grid-list-xs>
            <v-btn class="btn"
            @click="this.$router.back()">Назад</v-btn>
            <v-btn color="success"
            @click="addDishPosition">Добавить</v-btn>
        </v-container>
        <v-container class="d-flex justify-between"
        v-for="(position, index) in dishPosition"
        :key="index">
            {{ index }}: {{ positionInfo(position)}}

            <v-btn color="red"
            @click="delDishPosition(index)">Удалить</v-btn>
        </v-container>
        <v-container grid-list-xs>
            <v-btn class="btn"
            v-if="isResultBtnActive"
            @click="this.$router.push({name:'result'})">К результатам</v-btn>
        </v-container>
        <v-container grid-list-xs>
            <v-card>
                <v-card-title primary-title class="text-center"
                >
                    Промежуточный итог: {{ result }}
                </v-card-title>
            </v-card>
        </v-container>
    </v-card>  
</v-container>
</template>
    
<script>
import { ref } from 'vue';
import { usePersonStore } from '../stores/PersonStore.js';
import { storeToRefs } from 'pinia';
import { usePositionStore } from '../stores/PositionStore.js';
import { onBeforeUnmount, onMounted } from 'vue';



export default{
    name:'AddDishPosition',
    setup(){
        onMounted(() => {
            window.addEventListener('beforeunload', handleBeforeUnload);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        });

        const handleBeforeUnload = (event) => {
            event.returnValue = "Изменения не сохранятся!";
        };

        const personStore = usePersonStore();
        const {peoples} = storeToRefs(personStore);
        const isAddPosition = ref(false);

        const positionStore = usePositionStore();
        const {dishPosition, result, isResultBtnActive} = storeToRefs(positionStore)
        const payerName = ref('');
        const namePosition = ref('');
        const price = ref('')
        const persons = ref([]);

        const addDishPosition =  ()=>{
            if(payerName.value.trim() !== '' && namePosition.value.trim() !== ''&& 
            price.value.trim() !== '' && persons.length !== 0){
                positionStore.addDishPosition(payerName.value, namePosition.value, price.value, persons.value);
                payerName.value = '';
                namePosition.value = '';
                price.value = '';
                persons.value = [];

                isResultBtnActive.value = true;
                resultCalculate();
            }else{
                alert('Заполнены не все поля!')
            }

        }

        const delDishPosition= (index)=>{
            positionStore.delDishPosition(index);
            if(dishPosition.value.length <= 0){
                isResultBtnActive.value = false;
            }
        }
        
        const positionInfo = (info) => {
            return `${info.payerName}, ${info.namePosition}, ${info.price}, (${info.persons.join(',')})`
        };

        const resultCalculate = () => {
            const allPrices = dishPosition.value.map(item => item.price);
            let sum = 0;
            allPrices.forEach(el =>{
                sum += Number(el)
            })
            positionStore.result = sum;
        }


        return{
            peoples,
            isAddPosition,
            payerName,
            namePosition,
            price,
            persons,
            dishPosition,
            addDishPosition,
            positionInfo,
            resultCalculate,
            result,
            isResultBtnActive,
            delDishPosition,
        }
    }
}
</script>
    
<style lang="scss" scoped>
.display-flex{
    display: flex;
}

.btn{
    background-color:orange;
    margin: auto;
}
.text-center{
    text-align: center;
}

.d-flex{
    display: flex;
}
.justify-between{
    justify-content: space-between;
}
</style>
<template>
<v-container grid-list-xs>
    <v-card class="cardStyle textStyle">
        <v-card-title primary-title
            v-if="!isEdited">
            Добавление новой позиции
            <v-bottom-sheet>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" text="?" color="blue" class="border-radius"></v-btn>
                </template>

                <v-card
                    width="50%"
                    class="block-center textStyle"
                >
                    <v-card-text>
                       <p> - В первом поле выбирается платильщик, человек, который оплачивал блюдо.</p>
                       <p>- Во втором поле указывается название блюда.</p>
                       <p>- В третьем поле указывается цена, за которую платильщик купил блюдо.</p>
                       <p>- В четвертом поле выбираются люди, которые употребляли блюдо и между которыми цена за блюдо делится.</p>
                    </v-card-text>
                </v-card>
            </v-bottom-sheet>
        </v-card-title>
        <v-card-title primary-title
            v-else>
            Редактирование позиции
        </v-card-title>
        <v-container grid-list-xs>
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
                multiple
                item-value="name"
                item-title="name"
                label="Выберите человека/людей"
                chips
                v-model="persons">
            </v-select>
        </v-container>
        <v-card-actions>
            <v-btn class="btn"
            @click="this.$router.back()">Назад</v-btn>
            <v-btn class="btn"
            @click="addDishPosition"
            v-if="!isEdited">Добавить</v-btn>
        </v-card-actions>
    </v-card>
</v-container>
<v-container grid-list-xs>
    <v-card class="cardStyle textStyle">
        <v-card-title primary-title>
            Информация о позициях
        </v-card-title>
        <v-card-text v-if="dishPosition.length <= 0">
            Список позиций пуст...
        </v-card-text>

        <v-container class="list"
            v-for="(position, index) in dishPosition"
            :key="index">
            Позиция {{ index+1 }}: {{ positionInfo(position)}}

            <v-container class="d-flex">
                <v-btn color="red"
                    @click="delDishPosition(index)"
                    :disabled="isEdited">Удалить</v-btn>
                <v-btn color="green"
                    @click="editDishPosition(index)"
                    v-if="!isEdited"
                    >Редактировать</v-btn>
                <v-btn color="green"
                    @click="saveDishPosition(index)"
                    v-else
                    :disabled="editingIndex !== index">Сохранить</v-btn>
            </v-container>
        </v-container>
        <v-card-actions grid-list-xs>
            <v-btn class="btn"
            v-if="isResultBtnActive"
            @click="this.$router.push({name:'result'})">К результатам</v-btn>
        </v-card-actions>
    </v-card>
</v-container>
<v-container grid-list-xs>
    <v-card class="textStyle">
        <v-card-title primary-title class="text-center">
            Промежуточный итог: {{ result }}
        </v-card-title>
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
            this.$router.back();
        };

        const personStore = usePersonStore();
        const {peoples} = storeToRefs(personStore);

        const positionStore = usePositionStore();
        const {dishPosition, result, isResultBtnActive, editingPosition} = storeToRefs(positionStore)
        const payerName = ref('');
        const namePosition = ref('');
        const price = ref('')
        const persons = ref([]);

        const isEdited = ref(false);
        const editingIndex = ref("");

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
            resultCalculate();
        }
        
        const editDishPosition = (index)=>{
            payerName.value = positionStore.dishPosition[index].payerName;
            namePosition.value = positionStore.dishPosition[index].namePosition;
            price.value = positionStore.dishPosition[index].price;
            persons.value = positionStore.dishPosition[index].persons;
            isEdited.value = true;
            editingIndex.value = index;
        }

        const saveDishPosition = (index) => {
            isEdited.value = false;
            positionStore.updateDishPosition(index, payerName.value, namePosition.value, price.value, persons.value);

            payerName.value = "";
            namePosition.value = "";
            price.value = "";
            persons.value = [];
            editingIndex.value = "";
            resultCalculate();
        }

        const positionInfo = (info) => {
            return `Платильцик: ${info.payerName}; Наименование: ${info.namePosition}; Цена: ${info.price}; Кто ел/пил: ${info.persons.join(',')}`
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
            editDishPosition,
            isEdited,
            saveDishPosition,
            editingIndex,
        }
    }
}
</script>
    
<style lang="scss" scoped>
@import "../styles/mixins.scss";

.block-center{
    @include block-center;
    text-align: left;
}


</style>
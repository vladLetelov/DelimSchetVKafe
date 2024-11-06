<template>
<v-container>
    <v-card class="cardStyle textStyle">
        <v-card-title
            v-if="!isEdited"><!--Условие если пользователь в режиме редактирования, меняется текст-->
            Добавление новой позиции
            <v-bottom-sheet><!-- действия при нажатии на кнопку вызова подсказки -->
                <template 
                    v-slot:activator="{ props }">
                    <v-btn 
                        v-bind="props" 
                        text="?"
                        color="blue" 
                        class="border-radius">
                    </v-btn>
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
        <v-card-title
            v-else>
            Редактирование позиции
        </v-card-title>
        <v-container><!--Заполнение полей для создания новой позиции-->
            <v-select
                :items="peoples"
                item-value="name"
                item-title="name"
                label="Выберите платильщика"
                v-model="payerName">
            </v-select> <!--Поле выбора платильщика-->
            <v-text-field
                name="name"
                label="Наименование позиции"
                v-model="namePosition"
            ></v-text-field> <!--Поле ввода название позиции-->
            <v-text-field
                name="name"
                label="Стоимость"
                v-model="price"
                type = "number"
            ></v-text-field><!--Поле ввода стоимости позиции-->
            <v-select
                :items="peoples"
                multiple
                item-value="name"
                item-title="name"
                label="Выберите человека/людей"
                chips
                v-model="persons"> <!--Поле выбора человек участвующих при расчете долгов-->
            </v-select>
        </v-container>
        <v-card-actions>
            <v-btn class="btn"
                @click="$router.back()">Назад</v-btn><!--Кнопка возврата на страницу добавления персон-->
            <v-btn class="btn"
                @click="addDishPosition"
                v-if="!isEdited">Добавить</v-btn><!--Кнопка добавления новой позиции с введенными данными-->
        </v-card-actions>
    </v-card>
</v-container>

<v-container><!--Контейнер содержащий информацию о позициях-->
    <v-card class="cardStyle textStyle">
        <v-card-title>
            Информация о позициях
        </v-card-title>
        <v-card-text 
            v-if="dishPosition.length <= 0"><!--Проверка, если массив позиций пуст, то появляется соответствующая надпись-->
            Список позиций пуст...
        </v-card-text>

        <v-card><!--Вывод позиции ввиде карточек содержащих введенную пользователем информацию-->
            <v-card-title class="list cardStyle textStyle"
                v-for="(position, index) in dishPosition"
                :key="index">
                Позиция {{ index+1 }}: {{ positionInfo(position)}}
                <v-container class="d-flex">
                    <v-btn 
                        color="red"
                        @click="delDishPosition(index)"
                        :disabled="isEdited">Удалить</v-btn><!--Кнопка для удаления карточки, в которой она находится-->
                    <v-btn 
                        color="green"
                        @click="editDishPosition(index)"
                        v-if="!isEdited"
                        >Редактировать</v-btn><!--Кнопка при нажатии на которую включается режим редактирования-->
                    <v-btn 
                        color="green"
                        @click="saveDishPosition(index)"
                        v-else
                        :disabled="editingIndex !== index">Сохранить</v-btn><!--Кнопка, с помощью которой происходит сохранение введеных изменений-->
                </v-container>
            </v-card-title>              
        </v-card>
        <v-card-actions>
            <v-btn class="btn"
                v-if="isResultBtnActive"
                @click="$router.push({name:'result'})">К результатам</v-btn>
        </v-card-actions>
    </v-card>
</v-container>

<v-container>
    <v-card class="textStyle cardStyle">
        <v-card-title class="text-center"><!--Подсчет и вывод общего чека-->
            Общий итог: {{ result }}
        </v-card-title>
    </v-card>
</v-container> 
</template>
    
<script>
import { ref,onBeforeUnmount, onMounted } from 'vue';
import { usePersonStore } from '../stores/PersonStore.js';
import { storeToRefs } from 'pinia';
import { usePositionStore } from '../stores/PositionStore.js';



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

        const personStore = usePersonStore();//объявление переменной для стора персон
        const {peoples} = storeToRefs(personStore);//Получение из стора персон массива людей

        const positionStore = usePositionStore();//объявление переменной для стора позиций
        // Получение из стора позиций массива с позициями, результата, булевого значения активна ли кнопка результатов
        const {dishPosition, result, isResultBtnActive} = storeToRefs(positionStore)

        //Объявление реактивных переменный в которые записываются введенные пользователем значения
        const payerName = ref('');
        const namePosition = ref('');
        const price = ref('')
        const persons = ref([]);

        const isEdited = ref(false);//проверка, находится ли пользователь в режиме редактирования
        const editingIndex = ref("");//Индекс редактируемой позиции

        const addDishPosition =  ()=>{//метод добавления новой позиции
            if(payerName.value.trim() !== '' && namePosition.value.trim() !== ''&& 
            price.value.trim() !== '' && persons.length !== 0){//проверка, что все поля заполнены
                if(price.value > 0 && price.value < 99999){//ограничение цены пози
                    positionStore.addDishPosition(payerName.value, namePosition.value, price.value, persons.value);
                    payerName.value = '';
                    namePosition.value = '';
                    price.value = '';
                    persons.value = [];

                    isResultBtnActive.value = true;
                    resultCalculate();//вызов метода для изменения результата общего чека
                }else{
                    alert("Цена указывается в диапазоне от 1 до 99999!")
                }
            }else{
                alert('Заполнены не все поля!')
            }

        }

        const delDishPosition= (index)=>{//Удаление выбранной позиции
            positionStore.delDishPosition(index);
            if(dishPosition.value.length <= 0){//если позиций нет, то кнопка перехода на страницу расчета долгов удаляется
                isResultBtnActive.value = false;
            }
            resultCalculate();//Перерасчет общей суммы за все позиции при их удалении
        }
        
        const editDishPosition = (index)=>{//Метод, который переводит форму в режим редактирования и заполняет поля данными нужной позиции
            payerName.value = positionStore.dishPosition[index].payerName;
            namePosition.value = positionStore.dishPosition[index].namePosition;
            price.value = positionStore.dishPosition[index].price;
            persons.value = positionStore.dishPosition[index].persons;
            isEdited.value = true;
            editingIndex.value = index;
        }

        const saveDishPosition = (index) => {//аналогичен методу добавления записи, только метод редактирования не создает новую запись, а обновляет старую
            if(payerName.value.trim() !== '' && namePosition.value.trim() !== ''&& 
            price.value.trim() !== '' && persons.length !== 0){
                if(price.value > 0 && price.value < 99999){
                    isEdited.value = false;
                    positionStore.updateDishPosition(index, payerName.value, namePosition.value, price.value, persons.value);//Обновление данных о выбранной позиции

                    payerName.value = "";
                    namePosition.value = "";
                    price.value = "";
                    persons.value = [];
                    editingIndex.value = "";
                    resultCalculate();
                }else{
                    alert("Цена указывается в диапазоне от 1 до 99999!")
                }
            }else{
                alert('Заполнены не все поля!')
            }
        }

        const positionInfo = (info) => {//Вывод информации о созданной позиции
            return `Платильцик: ${info.payerName}; Наименование: ${info.namePosition}; Цена: ${info.price}; Кто ел/пил: ${info.persons.join(',')}`
        };

        const resultCalculate = () => {//Расчет общей суммы за все позиции
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

.block-center{//Стиль для центрирования блока подсказки по центру, а текст по левому краю
    @include block-center;
    text-align: left;
}


</style>
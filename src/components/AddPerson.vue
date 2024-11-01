<template>
    <v-container>
        <v-card>
            <v-card-title class="d-flex">
                Добавление персоны
                <v-bottom-sheet>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" text="?" color="blue" class="border-radius"></v-btn>
                    </template>

                    <v-card
                        text="Необходимо добавить минимум два человека, которые будут участвовать при расчете долгов"
                        width="30%"
                        class="text-center"
                    ></v-card>
                </v-bottom-sheet>
            </v-card-title>
            <v-text-field
                variant = "solo"
                name="name"
                label="Добавить персону"
                density = "comfortable"
                v-model="newPerson"
            ></v-text-field>
            <v-card-actions>
                <v-btn class="btn"
                @click="addPerson">Добавить</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
    <v-container class="d-flex flex-column justify-between"
        v-if="isAddPerson">
        <v-card>
            <v-card-text
                v-for="(people, index) in peoples"
                :key="index"
                class="d-flex justify-between list">
                    {{ people.name }}

                <v-btn color="red"
                    @click="delPerson(index)">Удалить</v-btn>
            </v-card-text>
            <v-card-actions>
                <v-btn class="btn"
                    v-if="isAddPerson"
                    @click="this.$router.push({name: 'dishPosition'})">Далее</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>

</template>
    
<script>
import {ref} from 'vue'
import { usePersonStore } from '../stores/PersonStore.js';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted } from 'vue';

export default{
    name:'Home',
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

        const newPerson = ref('');//Введеное имя
        const personStore = usePersonStore(); //хранилище персон с его методами
        const {peoples} = storeToRefs(personStore); //получение массива всех добавленных персон
        const {isAddPerson} = storeToRefs(personStore);//проверка есть ли хоть один пользователь
        
        const addPerson = ()=>{//метод добавления персоны
            if(newPerson.value.trim() !== ''){
                personStore.addPerson(newPerson.value);
                newPerson.value = '';
                isAddPerson.value = true;
            }else{
                alert("Имя не должно быть пустым!")
            }
        }

        const delPerson= (index)=>{//удаление персоны и проверка на то, что массив персон пустой
            personStore.delitePerson(index);
            if(peoples.value.length <= 0){
                isAddPerson.value = false;
            }
        }

        return{
            peoples,
            newPerson,
            addPerson,
            delPerson,
            isAddPerson,
        }
    },
    methods:{

    }
}
</script>
    
<style lang="scss" scoped>
.btn{
    background-color:orange;
    margin: auto;
}
.d-flex{
    display: flex;
}
.flex-column{
    flex-direction: column;
}
.justify-between{
    justify-content: space-between;
}
.text-center{
    margin: auto;
    background-color:#C5C6C7;
}
.border-radius{
    border-radius:50%;
    margin: 0 0 0 10px;
}
.list{
    border-radius: 20px;
    margin: 10px;
    background-color:#FFF3CF;
}
v-card{
    background-color: #C5C6C7;
    border-radius: 50px;

}
</style>
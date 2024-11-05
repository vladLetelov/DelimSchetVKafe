<template>
    <v-container>
        <v-card class="cardStyle textStyle">
            <v-card-title class="display-flex">
                Добавление персоны
                <v-bottom-sheet> <!-- действия при нажатии на кнопку вызова подсказки -->
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" text="?" color="blue" class="border-radius"></v-btn>
                    </template>
                    <v-card
                        text="Необходимо добавить минимум два человека, которые будут участвовать при расчете долгов"
                        width="30%"
                        class="block-center textStyle"
                    ></v-card>
                </v-bottom-sheet>
            </v-card-title>
            <v-container> <!-- Добавление новой персоны -->
                <v-text-field
                    name="name"
                    label="Добавить персону"
                    density="comfortable"
                    v-model="newPerson"
                ></v-text-field><!--Поле ввода имени новой персоны-->
                <v-card-actions> <!--Кнопки добавления персон и возврата на главную страницу-->
                    <v-btn class="btn" @click="$router.back()">Назад</v-btn>
                    <v-btn class="btn" @click="addPerson">Добавить</v-btn>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-container>

    <v-container class="d-flex flex-column" v-if="isAddPerson"> <!--Контейнер со списком всех персон-->
        <v-card class="cardStyle">
            <v-card-text
                v-for="(people, index) in peoples"
                :key="index"
                class="d-flex justify-between list textStyle"
            ><!--С помощью цикла вывод имен всех персон из массива people-->
                {{ people.name }}
                <v-btn color="red" @click="delPerson(index)">Удалить</v-btn><!--Кнопка удаления ненужной персоны-->
            </v-card-text>
            <v-card-actions>
                <v-btn class="btn" @click="$router.push({ name: 'dishPosition' })">Далее</v-btn><!--Кнопка для перехода на страницу добавления позиций-->
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
// Импорт необходимых данных и методов
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usePersonStore } from '../stores/PersonStore.js';
import { storeToRefs } from 'pinia';

export default {
    name: 'Home',
    setup() {
        const newPerson = ref('');// Строка принимающая введенное пользователем имя
        const personStore = usePersonStore();//переменная для взаимодействия с хранилищем персон
        const { peoples, isAddPerson } = storeToRefs(personStore);//получение массива персон и булевой переменной определяющей была ли добавлена персона

        const addPerson = () => {//Метод добавления новой персоны и сохранения ее в хранилище
            if (newPerson.value.trim() !== '') {
                personStore.addPerson(newPerson.value);
                newPerson.value = '';
                isAddPerson.value = true;
            } else {
                alert("Имя не должно быть пустым!");//вывод сообщения если поле будет пустым
            }
        };

        const delPerson = (index) => {//удаление персоны по кнопке, находящейся рядом с ней
            personStore.delitePerson(index);
            if (peoples.value.length <= 0) {
                isAddPerson.value = false;
            }
        };

        const handleBeforeUnload = (event) => {//Вывод предупреждения о не сохранении данных при обновлении страницы
            event.returnValue = "Изменения не сохранятся!";
        };

        onMounted(() => window.addEventListener('beforeunload', handleBeforeUnload));
        onBeforeUnmount(() => window.removeEventListener('beforeunload', handleBeforeUnload));

        return {
            peoples,
            newPerson,
            addPerson,
            delPerson,
            isAddPerson,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.flex-column {
    flex-direction: column;
}
.display-flex {
    display: flex;
}
</style>

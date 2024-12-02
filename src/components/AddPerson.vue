<template>
  <v-container>
    <v-card class="cardStyle textStyle">
      <v-card-title class="display-flex">
        Добавление персоны
        <v-bottom-sheet>
          <!-- действия при нажатии на кнопку вызова подсказки -->
          <template v-slot:activator="{ props }">
            <v-btn 
              v-bind="props" 
              text="?" 
              color="blue" 
              class="border-radius"
            />
          </template>
          <v-card
            text="Необходимо добавить минимум два человека, которые будут участвовать при расчете долгов"
            width="30%"
            class="block-center textStyle"
          />
        </v-bottom-sheet>
      </v-card-title>
      <v-container>
        <!-- Добавление новой персоны -->
        <v-text-field
          v-model="newPerson"
          :rules="[rules.nullField]"
          name="name"
          label="Добавить персону"
          density="comfortable"
        /><!--Поле ввода имени новой персоны-->
        <v-card-actions>
          <!--Кнопки добавления персон и возврата на главную страницу-->
          <v-btn 
            class="btn" 
            @click="$router.back()"
            text="Назад"
          />
          <v-btn 
            :disabled="!newPerson || !newPerson.trim()"
            class="btn"
            @click="AddPerson"
            text="Добавить"
          />
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>

  <v-container class="d-flex flex-column" v-if="isAddPerson">
    <!--Контейнер со списком всех персон-->
    <v-card class="cardStyle">
      <v-card-text
        v-for="people in peoples"
        :key="people.id"
        class="d-flex justify-between list textStyle"
      ><!--С помощью цикла вывод имен всех персон из массива people-->
        {{ people.name }}
        <v-btn 
          color="red" 
          @click="delPerson(people.id)"
          text="Удалить"
        /><!--Кнопка удаления ненужной персоны-->
      </v-card-text>
      <v-card-actions>
        <v-btn 
          :disabled="peoples.length < 2"
          class="btn"
          @click="$router.push({ name: 'dishPosition' })"
          text="Далее"
        /><!--Кнопка для перехода на страницу добавления позиций-->
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
// Импорт необходимых данных и методов
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { usePersonStore } from "../stores/PersonStore.js";
import { storeToRefs } from "pinia";

export default {
  name: "Home",
  setup() {
    const newPerson = ref(null); // Строка принимающая введенное пользователем имя
    const personStore = usePersonStore(); //переменная для взаимодействия с хранилищем персон
    //получение массива персон и булевой переменной определяющей была ли добавлена персона
    const { peoples, isAddPerson } = storeToRefs(personStore);

    const rules = { // Правило которое отображает ошибку если поле имени пустое
      nullField: value => !!value || 'Поле не должно быть пустым!'
    }

    const AddPerson = () => {
      //Метод добавления новой персоны и сохранения ее в хранилище
      if (newPerson.value && newPerson.value.trim() !== '') 
      {
        personStore.AddPerson(newPerson.value);
        newPerson.value = null;
        isAddPerson.value = true;
      } 
    };

    const delPerson = (id) => {
      //удаление персоны по кнопке, находящейся рядом с ней
      personStore.DelitePerson(id);
      if (peoples.value.length <= 0) 
      {
        isAddPerson.value = false;
      }
    };

    const handleBeforeUnload = (event) => {
      //Вывод предупреждения о не сохранении данных при обновлении страницы
      event.returnValue = "Изменения не сохранятся!";
    };

    onMounted(() =>
      window.addEventListener("beforeunload", handleBeforeUnload)
    );
    onBeforeUnmount(() =>
      window.removeEventListener("beforeunload", handleBeforeUnload)
    );

    return {
      peoples,
      newPerson,
      AddPerson,
      delPerson,
      isAddPerson,
      rules,
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

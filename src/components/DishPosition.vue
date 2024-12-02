<template>
  <v-container>
    <v-card class="cardStyle textStyle">
      <v-card-title v-if="!isEdited"
        ><!--Условие если пользователь в режиме редактирования, меняется текст-->
        Добавление новой позиции
        <v-bottom-sheet
          ><!-- действия при нажатии на кнопку вызова подсказки -->
          <template v-slot:activator="{ props }">
            <v-btn 
              v-bind="props" 
              text="?" 
              color="blue" 
              class="border-radius"
            >
            </v-btn>
          </template>

          <v-card width="50%" class="block-center textStyle">
            <v-card-text>
              <p>- В первом поле выбирается платильщик, человек, который
                оплачивал блюдо.</p>
              <p>- Во втором поле указывается название блюда.</p>
              <p>- В третьем поле указывается цена, за которую платильщик купил
                блюдо.</p>
              <p>- В четвертом поле выбираются люди, которые употребляли блюдо и
                между которыми цена за блюдо делится.</p>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </v-card-title>
      <v-card-title v-else> Редактирование позиции </v-card-title>
      <v-container
        ><!--Заполнение полей для создания новой позиции-->
        <v-select
          v-model="payerName"
          :items="peoples"
          item-value="name"
          item-title="name"
          :rules="validationActive ? [rules.nullFielsds] : []"
          label="Выберите платильщика"
        >
        </v-select>
        <!--Поле выбора платильщика-->
        <v-text-field
          v-model="namePosition"
          name="name"
          :rules="validationActive ? [rules.nullFielsds] : []"
          label="Наименование позиции"
        ></v-text-field>
        <!--Поле ввода название позиции-->
        <v-text-field
          v-model="price"
          name="name"
          :rules="validationActive ? [rules.nullFielsds, rules.bigPrice] : []"
          label="Стоимость"
          type="number"
        ></v-text-field
        ><!--Поле ввода стоимости позиции-->
        <v-select
          v-model="persons"
          :items="peoples"
          item-value="name"
          item-title="name"
          :rules="validationActive ? [rules.nullArray] : []"
          label="Выберите человека/людей"
          chips
          multiple
        >
          <!--Поле выбора человек участвующих при расчете долгов-->
        </v-select>
      </v-container>
      <v-card-actions>
        <v-btn class="btn" @click="$router.back()">Назад</v-btn
        ><!--Кнопка возврата на страницу добавления персон-->
        <v-btn class="btn" @click="AddDishPosition" v-if="!isEdited"
        :disabled="!isFieldValid"
          >Добавить</v-btn
        ><!--Кнопка добавления новой позиции с введенными данными-->
      </v-card-actions>
    </v-card>
  </v-container>

  <v-container
    ><!--Контейнер содержащий информацию о позициях-->
    <v-card class="cardStyle textStyle">
      <v-card-title> Информация о позициях </v-card-title>
      <v-card-text v-if="dishPosition.length <= 0"
        ><!--Проверка, если массив позиций пуст, то появляется соответствующая надпись-->
        Список позиций пуст...
      </v-card-text>

      <v-card
        ><!--Вывод позиции ввиде карточек содержащих введенную пользователем информацию-->
        <v-card-title
          v-for="(position, index) in dishPosition"
          :key="position.id"
          class="list cardStyle textStyle"
        >
          Позиция {{ index + 1 }}: {{ positionInfo(position) }}
          <v-container class="d-flex">
            <v-btn
              color="red"
              :disabled="isEdited"
              @click="DelDishPosition(position.id)"
              >Удалить</v-btn
            ><!--Кнопка для удаления карточки, в которой она находится-->
            <v-btn
              v-if="!isEdited"
              color="yellow"
              @click="editDishPosition(position.id)"
              >Редактировать</v-btn
            ><!--Кнопка при нажатии на которую включается режим редактирования-->
            <v-btn
              v-else
              color="green"
              :disabled="editingIndex !== position.id"
              @click="saveDishPosition(position.id)"
              >Сохранить</v-btn
            ><!--Кнопка, с помощью которой происходит сохранение введеных изменений-->
          </v-container>
        </v-card-title>
      </v-card>
      <v-card-actions>
        <v-btn
          v-if="isResultBtnActive"
          :disabled="dishPosition.length < 2"
          class="btn"
          @click="$router.push({ name: 'result' })"
          >К результатам</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>

  <v-container>
    <v-card class="textStyle cardStyle">
      <v-card-title class="text-center"
        ><!--Подсчет и вывод общего чека-->
        Общий итог: {{ result }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onBeforeUnmount, onMounted, nextTick } from "vue";
import { usePersonStore } from "../stores/PersonStore.js";
import { storeToRefs } from "pinia";
import { usePositionStore } from "../stores/PositionStore.js";

export default {
  name: "AddDishPosition",
  setup() {
    const personStore = usePersonStore(); //объявление переменной для стора персон
    const { peoples } = storeToRefs(personStore); //Получение из стора персон массива людей

    const positionStore = usePositionStore(); //объявление переменной для стора позиций
    // Получение из стора позиций массива с позициями, результата, булевого значения активна ли кнопка результатов
    const { dishPosition, result, isResultBtnActive } = storeToRefs(positionStore);

    //Объявление реактивных переменный в которые записываются введенные пользователем значения
    const payerName = ref("");
    const namePosition = ref("");
    const price = ref("");
    const persons = ref([]);
    const rules = {
      nullFielsds: value => !!value || 'Поле не должно быть пустым!',
      nullArray: Array => Array.length > 0 || 'Поле не должно быть пустым!',
      bigPrice: value => (value > 0 && value < 99999) || 'Диапазон значений от 1 до 99999!'
    }
    // Состояние для управления валидацией
    const validationActive = ref(true);

    // Метод очистки формы
    const clearForm = () => {
      validationActive.value = false; // Отключаем валидацию
      payerName.value = "";
      namePosition.value = "";
      price.value = "";
      persons.value = [];
      nextTick(() => {
        validationActive.value = true; // Включаем валидацию снова
      });
    };

    // Проверка валидности всех полей
    const isFieldValid = () => {
      return !!payerName.value &&
            !!namePosition.value &&
            !!price.value &&
            persons.value.length > 0;    
    }

    const isEdited = ref(false); //проверка, находится ли пользователь в режиме редактирования
    const editingIndex = ref(""); //Индекс редактируемой позиции

    const AddDishPosition = () => {
      //метод добавления новой позиции
      if (
        payerName.value.trim() !== "" &&
        namePosition.value.trim() !== "" &&
        price.value.trim() !== "" &&
        persons.length !== 0 &&
        isFieldValid()
      ) 
      {
        //проверка, что все поля заполнены
        if (price.value > 0 && price.value < 99999) 
        {
          //ограничение цены пози
          positionStore.AddDishPosition(
            payerName.value,
            namePosition.value,
            price.value,
            persons.value
          );
          clearForm();

          isResultBtnActive.value = true;
          resultCalculate(); //вызов метода для изменения результата общего чека
        } 
      }
    };

    const DelDishPosition = (id) => {
      //Удаление выбранной позиции
      positionStore.DelDishPosition(id);
      if (dishPosition.value.length <= 0) 
      {
        //если позиций нет, то кнопка перехода на страницу расчета долгов удаляется
        isResultBtnActive.value = false;
      }
      resultCalculate(); //Перерасчет общей суммы за все позиции при их удалении
    };

    const editDishPosition = (id) => {
      //Метод, который переводит форму в режим редактирования и заполняет поля данными нужной позиции
      const position = positionStore.dishPosition.find((pos) => pos.id === id);
      if (!position) return;

      payerName.value = position.payerName;
      namePosition.value = position.namePosition;
      price.value = position.price;
      persons.value = position.persons;

      isEdited.value = true;
      editingIndex.value = id;
    };

    const saveDishPosition = (id) => {
      //аналогичен методу добавления записи, только метод редактирования не создает новую запись, а обновляет старую
      if (
        payerName.value.trim() !== "" &&
        namePosition.value.trim() !== "" &&
        price.value.trim() !== "" &&
        persons.value.length > 0
      ) {
        if (price.value > 0 && price.value < 99999) {
          positionStore.updateDishPosition(id, {
            payerName: payerName.value,
            namePosition: namePosition.value,
            price: price.value,
            persons: persons.value,
          });

          clearForm();
          isEdited.value = false;
          editingIndex.value = "";
          resultCalculate();
          console.log(dishPosition);
        }
      }
    };

    const positionInfo = (info) => {
  const persons = info.persons ? info.persons.join(", ") : "Не указаны";
  return `Платильцик: ${info.payerName || "Не указан"}; Наименование: ${info.namePosition || "Не указано"}; 
  Цена: ${info.price || "0"}; Кто ел/пил: ${persons}`;
};

    const resultCalculate = () => {
      // Расчет общей суммы за все позиции
      const sum = dishPosition.value.reduce((total, item) => total + Number(item.price), 0);
      positionStore.result = sum;
    };

    onMounted(() => {
      window.addEventListener("beforeunload", handleBeforeUnload);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });

    const handleBeforeUnload = (event) => {
      event.returnValue = "Изменения не сохранятся!";
    };


    return {
      peoples,
      payerName,
      namePosition,
      price,
      persons,
      dishPosition,
      AddDishPosition,
      positionInfo,
      resultCalculate,
      result,
      isResultBtnActive,
      DelDishPosition,
      editDishPosition,
      isEdited,
      saveDishPosition,
      editingIndex,
      rules,
      validationActive,
      isFieldValid
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

.block-center {
  //Стиль для центрирования блока подсказки по центру, а текст по левому краю
  @include block-center;
  text-align: left;
}
</style>

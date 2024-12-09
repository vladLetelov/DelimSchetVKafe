<template>
  <v-container>
    <v-card class="cardStyle"><!--Карточка содержащая долги-->
      <v-card-title class="textStyle">
        Итоговые результаты
        <v-bottom-sheet><!--Подсказка о долгах-->
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              text="?"
              color="blue"
              class="border-radius"
            />
          </template>

          <v-card width="50%" class="block-center textStyle">
            <v-card-text>
              <p>Производится расчет долгов между людьми, которые ели одно блюдо.</p>
              <p>Исходя из того, кто за кого заплатил и сколько</p>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </v-card-title>
      <v-container>
        <v-card v-if="debts.length > 0" class="cardStyle list" >
          <v-card-text v-for="(debt) in debts">
            {{ debt.from }} должен {{ debt.to }}
            <span>{{ debt.amount.toFixed(2) }} рублей</span>
          </v-card-text>
        </v-card><!--Карточки с долгами в формате кто, кому и сколько должен-->
        <v-card v-else class="cardStyle">
          <v-card-text><!--Если счет был поделен поровну выводится сообщение, что никто ничего не должен-->
            Никто, никому, ничего не должен
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-btn 
            class="btn" 
            @click="this.$router.back()"
            text="Назад"
          /><!--Кнопка для возврата на страницу добавления позици-->
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { usePersonStore } from "../stores/PersonStore.js";
import { storeToRefs } from "pinia";
import { usePositionStore } from "../stores/PositionStore.js";

export default {
  name: "ResultWindow",
  setup() {
    const personStore = usePersonStore();
    const { peoples, debts } = storeToRefs(personStore);

    const positionStore = usePositionStore();
    const { dishPosition } = storeToRefs(positionStore);

    personStore.calculateDebt(); // Вызываем метод получения долгов

    return {
      dishPosition,
      peoples,
      debts,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins.scss";

span {
  // цвет и нижнее подчеркивание суммы долна
  text-decoration: underline;
  color: #eae7dc;
}

.block-center {
  @include block-center;
}
</style>

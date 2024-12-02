<script>
export default {
  name: "notFound",
};
</script>

<template>
  <v-container>
    <!--Отображение ошибки о неправильном пути-->
    <v-card 
      class="cardStyle block-center textStyle" width="80%">
      <v-card-title class="textCenter"> Страница не найдена! </v-card-title>
      <div class="notFoundImg">
        <!--Изображение с номером ошибки-->
        <img src="../assets/NotFoundPhoto.png" />
      </div>
      <v-card-actions>
        <v-btn class="btnStart" @click="$router.back()">Назад</v-btn>
        <!--Кнопка ведущая на предыдущую страницу-->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.textCenter {
  text-align: center;
  font-size: 20pt;
}
.notFoundImg {
  text-align: center;
}
.btnStart {
  background-color: orange;
  margin: auto;
}
</style>

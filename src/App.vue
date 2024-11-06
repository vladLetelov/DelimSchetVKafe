<template>
    <v-app id="app">
        <router-view /> <!--Добавление маршрутизации в проект-->
    </v-app>
</template>
  
<script>
export default{
  name:'App',
}
</script>
  
<style lang="scss">
@import "../src/styles/mixins.scss";
// Глобальные стили, которые используются во всем проекте
.btn {
    @include btn-style;
    color: #B0E0E6 !important;
}
.border-radius {
    @include border-radius;
}
.textStyle{
    @include textStyle;
}
.list{
    @include list;
}
.cardStyle{
    @include cardStyle;
}
.d-flex{
    @include display-flex;
    @include justify-between;
}
.block-center{
    @include block-center;
    text-align: left;
}

</style>

<template>
    <v-app id="app">
        <router-view />
    </v-app>
</template>
  
<script>
export default{
  name:'App',
}
</script>
  
<style lang="scss">
@import "../src/styles/mixins.scss";
.btn {
    @include btn-style;
    @include textStyle;
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

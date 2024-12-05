<template>
    <v-container>
        <v-card id="container"><!--Карточка с названием и кнопкой-->
            <v-card-title>
                Расчитать долги
            </v-card-title>
            <v-card-actions>
                <v-btn 
                  class="btn"
                  @click="this.$router.push({name: 'addPerson'})"
                  text="Начать"
                /><!--Кнопка, которая переносит пользователя на страницу добавления персон-->
            </v-card-actions>
        </v-card>
    </v-container>

    <v-container>
        <v-footer id="footer"><!--Подвал страницы содержащий слоган, контакты и год создания страницы-->
            <v-card class="footer_card textStyle">
                <div id="footer_slogan">
                    <p>Расчитать долг по чеку просто!</p>
                </div>
                <div id="footer_contact">
                    <p>По вопросам писать в telegram: <span class="contact_tg">@wladgraft</span></p>
                </div>
                <div id="footer_dateCreate">
                    <p>&#x24b8 2024</p>
                </div>
            </v-card>
        </v-footer>
    </v-container>
</template>
    
<script>

export default{
    name:'Start',
}
</script>
    
<style lang="scss">
@import "../styles/mixins.scss";

#container{
    padding: 20px;
    border-radius: 50px;
    margin: 30vh auto;
    @include cardStyle;
    @include textStyle
}
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;

}
.contact_tg{
  color: red;
}
#footer_slogan{
  @include textStyle;
  font-size: 20pt;
}
.footer_container{
    margin: 0 auto;
}
.footer_card{
    width: 100%;
    text-align: center;
    @include cardStyle;
}


</style>
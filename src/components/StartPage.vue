<template>
    <v-container grid-list-xs>
        <v-card id="container">
            <v-card-title>
                Расчитать долги
            </v-card-title>
            <v-card-actions>
                <v-btn class="btn"
                    variant="outlined"
                    @click="this.$router.push({name: 'addPerson'})">Старт</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>

    <v-container grid-list-xs>
    <v-footer id="footer">
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
    data(){
        return{
            rules:[
                "Необходимо добавить минимум 2 человека и 2 блюда, для расчета долга по чеку"
            ]
        }
    }
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
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
        <v-card class="footer_card">
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
    
<style scoped>
#container{
    padding: 20px;
    border-radius: 50px;
    margin: 30vh auto;
    background-color: #C5C6C7
}
.btn{
    background-color:orange;
    margin: auto;
}
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  background-color:#1F2833;
}
.contact_tg{
  color: blue;
}
#footer_slogan{
  font-size: 20pt;
  color:black;
}
.footer_container{
    margin: 0 auto;
}
.footer_card{
    width: 100%;
    text-align: center;
    background-color:orange;
}

</style>
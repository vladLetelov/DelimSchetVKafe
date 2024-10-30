<template>
    <v-btn color="success"
    @click="this.$router.push({name: 'addPerson'})">Старт</v-btn>

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
    
</script>
    
<style scoped>
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
  background-color:black
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
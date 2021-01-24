<template>
    <div>
        <Breads :items="items"/>
        <section class="artist-wrapper">
            <h1 class="heading">Musiq</h1>
            <v-row justify="center" class="artist-list">
                <v-col 
                v-for="(data, key) in json_data" :key="key"
                cols="12" sm="12" md="4" lg="4">
                    <nuxt-link :to="data.link" ><img :src="data.imgurl" class="artist-img"></nuxt-link>
                    <p class="a-info">{{data.songtitle}}</p>
                </v-col>
            </v-row>
        </section>
    </div>
</template>

<script>
import Breads from '~/components/Breads.vue'
import firebase from '@/plugins/firebase'

const axios = require('axios');

let fbdata = "https://" + process.env.FIREBASE_PROJECT_ID + ".firebaseio.com/musiq.json";

export default {
    components: {
        Breads,
    },
    data(){
        return {
            items: [
                {
                    text: 'HOME',
                    disabled: false,
                    to: '/',
                },
                {
                    text: 'アーティストを探す',
                    disabled: false,
                    to: '/artist',
                },
                {
                    text: "Musiq",
                    disabled: true,
                    to: '/artists/musiq/musiq',
                },
            ],
        }
    },
    asyncData: async function() {
        let result = await axios.get(fbdata);
        return { json_data: result.data };
    },
    methods:{ 
    },
}
</script>

<style>
.artist-wrapper{
    background-color: white;
    text-align: center;
    padding:10px 0 ;
}

@media (min-width: 1024px){
    .artist-wrapper{
        height:100vh;
    }
}
@media (max-width: 767px){
    .artist-img{
        width:80%;
    }
}
</style>
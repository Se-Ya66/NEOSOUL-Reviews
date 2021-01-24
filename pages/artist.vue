<template>
    <div>
        <Breads :items="items"/>
        <section class="artist-wrapper">
                <h1 class="heading">アーティスト</h1>
                <v-row justify="center" class="artist-list">
                <v-col 
                v-for="(data, key) in json_data" :key="key"
                cols="12" sm="12" md="4" lg="4">
                    <nuxt-link :to="data.link" ><img :src="data.imgurl" class="artist-img"></nuxt-link>
                    <p class="a-info">{{data.name}}</p>
                </v-col>
            </v-row>
            
        </section>
    </div>
</template>

<script>
import Breads from '~/components/Breads.vue'
import firebase from '@/plugins/firebase'

const axios = require('axios');

let fbdata = process.env.FIREBASE_ARTIST_URL;


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
                    disabled: true,
                    to: '/artist',
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
@media (min-width:768px) and ( max-width:1023px) {
    
    
}
@media (max-width: 767px){
    .artist-img{
        width:80%;
    }
}
</style>
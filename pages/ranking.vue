<template>
    <div>
        <Breads :items="items"/>
        <section class="contents-wrapper">
            <div class="ranking-wrapper">
                <h1 class="heading">ランキング</h1>
                <div class="ranking-contents">
                    <v-row class="review-contents">
                        <v-col v-for="(data, key) in json_data" :key="key" 
                        cols="12" sm="3" md="3" lg="3"
                        class="rank"
                        >
                        <div class="rank-img">
                            <nuxt-link :to="data.link">
                                <img :src="data.imgurl">
                            </nuxt-link>
                        </div>
                            <p class="a-info">{{data.name}}-{{data.song}}</p>
                            <div class="like-wrap">
                                <v-icon color="pink">mdi-heart</v-icon>
                                <span class="like-number">{{data.count}}</span>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div class="more-button">SEE MORE</div>
            </div>
            
        </section>
    </div>
</template>

<script>
import Breads from '~/components/Breads.vue'
import firebase from '@/plugins/firebase'

const axios = require('axios');

export default {
    components: {
        Breads,
    },
    data(){
        return {
            json_data:[],
            user_name:'',
            logined: true,
            msg:'',
            page:0,
            data_obj:{},
            items: [
                {
                    text: 'HOME',
                    disabled: false,
                    to: '/',
                },
                {
                    text: 'ランキング',
                    disabled: true,
                    to: '/ranking',
                }
            ],
        }
    },
    methods:{
        getCount(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('like2');
            ref.orderByChild('count').limitToLast(15)
            .on("value", function(snapshot) {
                let arr2 = [];
                let data = snapshot.val();
                for(let item in data){
                    arr2.unshift(data[item]);
                }
                arr2.sort(
                    function (a, b) {
                        const countA = a.count;
                        const countB = b.count;
                        let comparison = 0;
                        if (countA < countB) {
                            comparison = 1;
                        } else if (countA > countB) {
                            comparison = -1;
                        }
                            return comparison;
                    }
                );
                self.json_data =arr2;
                });
        },
    },
    created(){
        this.getCount();
    }
}
</script>

<style>

.top-wrapper{
    width: 100%;
    height: 100vh;
    padding-top: 50%;
    position:relative;
    background: url('../static/top.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}
.contents-wrapper{
    background-color: white;
    text-align: center;
    padding:50px 0 ;
}
.heading{
    font-size:40px;
    margin-bottom: 20px;
    text-align: center;
}
.explain{
    margin-bottom: 20px;
}
.ranking-wrapper{
    margin-bottom: 20px;
    width:100%;
    margin: 0 auto;
}
.ranking{
    display: inline-block;
}
.ranking-item{
    border: 1px solid #666;
}
.rank img{
    width:100%;
}
.rank{
    counter-increment: rank;
    /* position: relative; */
}
.rank-img::before{
    content: counter(rank);
    background-color: red;
    font-size: 85%;
    display: block;
    position: absolute;
    color: #ffffff;
    padding: 0.2em 0.2em 0.2em 0;
    font-weight: bold;
    width: 4.5em;
    text-align: center;
    opacity: 0.8;
    box-sizing: border-box;
    /* top:0;
    left:0; */
}
.review-contents{
    width:100%;
    margin:0 auto;
}
.review-contents img{
    width:100%;
}
.more-button {
    display: inline-block;
    max-width: 180px;
    text-align: left;
    border: 1px solid #fff;
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    transition: .4s;
    margin-top:20px;
}
.more-button:hover {
    background-color:rgba(255,255,255,0.5);
    color: #FFF;
}
.latest-wrap{
    width:100%;
    margin: 0 auto;
}
.review-wrap{
    margin: 0 auto;
    width:80%;
    margin-bottom: 10px;
    position: relative;
}

@media (min-width: 1024px) {
    
}
@media (max-width: 767px) {
    
}
@media (max-width: 767px) {
    .wrap{
        padding: 0;
    }
}
</style>
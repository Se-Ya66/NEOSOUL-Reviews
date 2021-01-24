<template>
    <div>
        <section class="top-wrapper">
        </section>
        <section class="contents-wrapper">
            <div class="site-title">
                <h1 class="heading">NEO-SOUL Reviewsとは</h1>
                <p class="explain">ネオソウルアーティストによる楽曲のレビュー投稿サイトです!</p>
            </div>
            <div class="ranking-wrapper">
                <h1 class="heading">ランキング</h1>
                <div class="ranking-contents">
                    <v-row justify="center" class="review-contents">
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
                <nuxt-link to="/ranking" class="more-button">
                    <span class="btn-word">
                        SEE MORE
                    </span>
                </nuxt-link>
            </div>
            <div class="latest-wrapper">
                <h1 class="heading">最新のレビュー</h1>
                    <v-row v-for="(data2,key) in data_obj" :key="key" class="review-wrap">
                        <v-container>
                            <v-row class="review-contents">
                                <v-col cols="12" sm="4" md="4" lg="4">
                                    <nuxt-link :to="data2.tag">
                                        <img :src="data2.imgurl">
                                    </nuxt-link>
                                    <p class="a-info">{{data2.songtitle}}-{{data2.artist}}</p>
                                </v-col>
                                <v-col cols="12" sm="8" md="8" lg="8" class="right-wrap">
                                    <div class="user">{{data2.user}}</div>
                                    <div class="review-parts">
                                        <h3 class="review-title">{{data2.title}}</h3>
                                        <v-rating 
                                        v-model="data2.rating"
                                        half-increments
                                        size="20"
                                        class="rate" 
                                        color="yellow darken-3"
                                        length="5"
                                        background-color="grey darken-1"
                                        readonly
                                        ></v-rating>
                                    </div>
                                    <div class="posted">{{data2.posted}}</div>
                                    <p class="comment">{{data2.msg}}</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>
                <nuxt-link to="/review" class="more-button">
                    <span class="btn-word">
                        SEE MORE
                    </span>
                </nuxt-link>
            </div>
        </section>
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'

const axios = require('axios');

export default {
    data(){
        return {
            json_data:[],
            data_obj:{},
        }
    },
    methods:{
        getData(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('board2');
            ref.orderByKey().limitToLast(5)
            .on('value', function(snapshot){
            let arr = [];
            let data = snapshot.val();
            for(let item in data){
                arr.unshift(data[item]);
            }
            self.data_obj =arr;
        });
        },
        getCount(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('like2');
            ref.orderByChild('count').limitToLast(3)
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
        this.getData();
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
.site-title{
    padding-bottom: 50px;
}
.explain{
    margin-bottom: 20px;
}
.ranking-wrapper{
    padding-bottom: 50px;
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
}
.review-contents{
    width:100%;
    margin:0 auto;
}
.review-contents img{
    width:100%;
}

.btn-word{
    color: black;
    text-decoration: none;
    display: inline-block;
    max-width: 180px;
    text-align: left;
    border: 1px solid black;
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    padding: 8px 16px;
    transition: .4s;
    margin-top:20px;
}
.btn-word:hover{
    color:white;
    text-decoration: none;
    background-color: black;
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

@media (max-width: 767px) {
    .wrap{
        padding: 0;
    }
}
</style>

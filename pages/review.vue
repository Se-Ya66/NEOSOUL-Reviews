<template>
    <div>
        <Breads :items="items"/>
        <div class="review-page">
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
            <v-pagination
            v-model="page"
            :length="length"
            @input = "getPage"
            >
            </v-pagination>
        </div>
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
        return{
            data_obj:{},
            data_obj2:{},
            items: [
                {
                    text: 'HOME',
                    disabled: false,
                    to: '/',
                },
                {
                    text: '最新のレビュー',
                    disabled: false,
                    to: '/review',
                }
            ],
            page: 1,
            pageSize: 10,
            length:0,
        }
    },
    methods:{
        getData(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('board2');
            ref.orderByKey().limitToLast(10)
                .on('value', function(snapshot){
                let arr = [];
                let data = snapshot.val();
                for(let item in data){
                    arr.unshift(data[item]);
                }
                self.data_obj =arr;
            });
        },
        getPage(pageNumber){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('board2');
            ref.orderByKey()
                .on('value', function(snapshot){
                let arr = [];
                let data = snapshot.val();
                for(let item in data){
                    arr.unshift(data[item]);
                }
                self.data_obj =arr.slice(self.pageSize*(pageNumber -1), self.pageSize*(pageNumber));
            });
        },
        getLength(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('board2');
            ref.orderByKey()
                .on('value', function(snapshot){
                let arr = [];
                let data = snapshot.val();
                for(let item in data){
                    arr.unshift(data[item]);
                }
                self.data_obj2 =arr
            });
            
        },
    },
    created(){
        this.getData();
        this.getLength();
        this.length = Math.ceil(this.data_obj2.length/this.pageSize);
    }
}
</script>

<style>
.link2{
    color:black;
    text-align: center;
    display: block;
}
.review-page{
    width:100%;
    margin: 0 auto;
    padding:30px 0;
}
.review-wrap{
    margin: 0 auto;
    width:80%;
    margin-bottom: 10px;
    position: relative;
}

</style>
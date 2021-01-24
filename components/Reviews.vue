<template>
    <div>
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
                        <div class="btn btn2" @click="deleteItem(index)">削除</div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'

const axios = require('axios');

let fbdata = "https://vue-database-37ea9.firebaseio.com/board.json";
export default {
    props:[
        'num',
        'rating'
    ],
    data(){
        return{
            data_obj:{},
            delete:false,
        }
    },
    methods:{
        getData(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('board2');
            ref.orderByChild("num")
            .equalTo(self.num)
            .on("value", snapshot => (self.data_obj = snapshot.val()));
        },
        deleteItem(index){
            firebase.database().ref('board2').child(index).remove();
        }
        

    },
    created(){
        this.getData();
    },
}
</script>

<style>
.review-wrap{
    margin: 0 auto;
    width:80%;
    margin-bottom: 10px;
    position: relative;
}
.btn2{
    background-color: red;
    position: absolute;
    right: 100px;
    bottom: 5px;
}
.review-rate-star{
    text-align: left;
}
@media (max-width: 767px) {
    .review-rate-star{
        text-align: left;
        margin-left: -10px;
    }
}
</style>
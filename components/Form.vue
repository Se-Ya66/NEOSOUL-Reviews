<template>
    <div>
        <section class="post-wrapper">
                <v-row justify="center" class="review-contents">
                    <v-col cols="12" sm="7" md="4" lg="4" class="wrap">
                        <img :src="imgurl" class="main-img">
                        <div class="a-info">{{songtitle}}-{{artist}}</div>
                    </v-col>
                    <v-col cols="12" sm="12" md="8" lg="8" class="review-form">
                        <div>{{message}}</div>
                        <div class="post-form">
                            <v-rating 
                            v-model="rating"
                            half-increments
                            size="20"
                            class="rate-star" 
                            color="yellow darken-3"
                            length="5"
                            background-color="grey darken-1"
                            hover
                            ></v-rating>
                            <v-text-field clearable label="タイトル"  v-model="title"/>
                            <v-text-field clearable label="コメント"  v-model="msg"/>
                            <div class="btn" @click="add">投稿する</div>
                        </div>
                    </v-col>
                </v-row>
            
        </section>
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'

const axios = require('axios');

let fbdata = "https://vue-database-37ea9.firebaseio.com/board.json";
export default {
    data(){
        return{
            
        }
    },
    props: [
        'imgurl',
        'num',
        'songtitle',
        'artist',
        'title',
        'msg',
        'message',
        'tag',
        'rating'
        ],
    methods:{
        add(){
            if (firebase.auth().currentUser == null){
                this.message = 'ログインしないと投稿できません。';
                return;
            } else if(!this.msg || !this.title){
                this.message = '入力されていません。';
                return;
            } else {
                let db = firebase.database();
            let user = firebase.auth().currentUser;
            let userId = user.uid;
            let ref = db.ref('board2');
            let self = this;
            let d = new Date();
            let dstr = d.getFullYear() + '/' + (d.getMonth() + 1) + '/'
                + ("0"+d.getDate()).slice(-2);
            // let id = d.getTime();
            let data = {
                msg:self.msg,
                title:self.title,
                user:user.displayName,
                posted:dstr,
                num:self.num,
                imgurl:self.imgurl,
                songtitle:self.songtitle,
                artist:self.artist,
                uid:userId,
                tag:self.tag,
                rating:self.rating
            };
            firebase.database().ref('board2').push(data);
            this.msg = '';
            this.title = '';
            this.message = '投稿しました。';
            this.rating = 0;
            }
        },
    }
}
</script>

<style>
.post-wrapper{
    margin: 0 auto;
    width:80%;
    margin-bottom: 10px;
    text-align: right;
}
.post-form{
    width:100%;
}
.btn{
    background-color: black;
    display: inline-block;
    max-width: 180px;
    font-size: 16px;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    transition: .4s;
    cursor: pointer;
}
.review-form{
    padding: 0;
}
.rate-star{
    margin-left:-10px ;
    text-align: left;
}
@media (max-width: 767px) {
    .post-wrapper{
        width:90%;
    }
    .review-item{
        width:100%;
        margin: 0 auto;
    }
    .main-img{
        width:90%;
    }
    .review-form{
        width:100%;
    }
}
</style>
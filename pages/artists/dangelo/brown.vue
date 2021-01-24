<template>
    <div>
        <Breads :items="items"/>
        <section class="review-item">
            <div>
                <img :src="json_data.items[0].snippet.thumbnails.high.url"
                class="main-img"
                >
                <h2>{{json_data.items[0].snippet.title}}</h2>
                <div class="yt-wrap">
                    <a :href="ytlink" class="ytlink" >
                        <span class="a-tag">
                            YouTubeで視聴する
                        </span>
                    </a>
                    <v-icon color="red" large>mdi-youtube</v-icon>
                </div>
                <div class="like-wrap">
                    <v-btn
                    icon
                    color="pink"
                    @click="addLike"
                    >
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <span class="like-number">{{data_ob.count}}</span>
                </div>
            </div>
        </section>
        <Form :imgurl="imgurl" :num="num" :songtitle="songtitle" :artist="artist" :tag="tag"/>
        <Reviews :num="num"/>
    </div>
</template>

<script>

import Breads from '~/components/Breads.vue'
import Form from '~/components/Form.vue'
import Reviews from '~/components/Reviews.vue'
import firebase from '@/plugins/firebase'

const axios = require('axios');

let url = "https://www.googleapis.com/youtube/v3/videos?id=H_WzjiTzZBA&key=" + process.env.YOUTUBE_API_KEY + "&part=snippet,contentDetails,statistics,status";


export default {
    components: {
        Breads,
        Form,
        Reviews,
    },
    data(){
        return{
            json_data:[],
            data_ob:{},
            user_name:'',
            num:'H_WzjiTzZBA',
            imgurl:'https://i.ytimg.com/vi/H_WzjiTzZBA/mqdefault.jpg',
            songtitle:'Brown Sugar',
            artist:"D'Angelo",
            ytlink:'https://www.youtube.com/watch?v=H_WzjiTzZBA',
            tag:'/artists/dangelo/brown',
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
                    text: "D'angelo",
                    disabled: false,
                    to: '/artists/dangelo/dangelo',
                },
                {
                    text: 'Brown Sugar',
                    disabled: true,
                    to: '/artists/dangelo/brown',
                },
            ],
        }
    },
    asyncData: async function(){
        return axios.get(url)
        .then((res) => {
            return{ json_data:res.data }
        })
    },
    methods:{
        getNumber(){
            let self = this;
            let db = firebase.database();
            let ref = db.ref('like2').child('brown');
            ref.on("value", snapshot => (self.data_ob = snapshot.val()));
        },
        addLike(){
            let db = firebase.database();
            let user = firebase.auth().currentUser;
            let userId = user.uid;
            let ref = db.ref('like2').child('brown').child('count');
            let ref2 = db.ref('like2').child('liked').child('brown');
            let self = this;
            let likedRef = ref2.child('uid');
            likedRef.on('value', (snapshot) => {
                if(snapshot.val() === userId){
                    return
                } else {
                    ref.transaction(function (current_value) {
                        return (current_value || 0) + 1;
                    });
                    let data = {
                        uid:userId,
                    }
                    ref2.set(data);
                }
            });
        },
    },
    created(){
        this.getNumber();
    }
}
</script>

<style>
.review-item{
    margin:0 auto;
    text-align: center;
    padding:20px 0;
}
.like-wrap,
.yt-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
}
.like-number{
    margin-left:10px;
}
.ytlink {
    text-align: left;
    color:black;
    position: relative;
    display: inline-block;
    transition: 0.5s;
    letter-spacing: 1px;
    text-decoration: none;
}
.ytlink::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 0;
    border-bottom: solid 1px black;
    transition: 0.2s;
}
.ytlink:hover::after {
    width: 100%;
}
.a-tag{
    color: black;
}

@media (max-width: 767px) {
    .review-item{
        width:100%;
        margin: 0 auto;
    }
    .main-img{
        width:100%;
    }
    .main-img{
        width:90%;
    }
}
</style>
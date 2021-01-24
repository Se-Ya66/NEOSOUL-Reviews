<template>
  <div class="header">
    <v-app-bar dark color="black">
      <v-toolbar-title>
        <img src="../static/logo.png" @click="$router.push('/')" class="logo">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon 
            v-bind="attrs"
            v-on="on"
            class="hidden-sm-and-up hamb">
            </v-app-bar-nav-icon>
        </template>
        <v-list color="black">
            <v-list-item
            v-for="(item, key) in items"
            :key="key"
            :to="item.link"
            >
              <v-list-item-title
              class="link"
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title 
              class="link"
              v-if="isLogin" 
              @click="logout">
                ログアウト
              </v-list-item-title>
              <v-list-item-title 
              class="link"
              v-else 
              @click="login">
                ログイン
              </v-list-item-title>
            </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-items>
        <div v-for="(item, key) in items" :key="key">
          <nuxt-link :to="item.link" class="link-btn nav">
            <span class="link">
              {{item.title}}
            </span>
          </nuxt-link>
        </div>
        <span class="link-btn nav" text v-if="isLogin" @click="logout">ログアウト</span>
        <span class="link-btn nav" text v-else @click="login">ログイン</span>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { auth } from '../plugins/firebase'

const axios = require('axios');

export default {
  data(){
    return{
      items:[
            {   
              title:'ランキング',
              link:'/ranking'
            },
            {   
              title:'レビューを見る',
              link:'/review'
            },
            {   
              title:'アーティストを探す',
              link:'/artist'
            },
        ],
        isLogin: false,
        show:true
    }
  },
  async mounted () {
    await auth.onAuthStateChanged((user) => this.isLogin = user ? true :false)
  },
  methods:{
    login(){
      let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    },
    logout(){
      firebase.auth().signOut();
    },
  },
  
}
</script>

<style>
.header{
  font-size:1vw;
}
.link-btn{
  height: 65px;
  line-height: 65px;
  display: block;
  padding: 0 16px;
}
.link-btn:hover{
  background-color: rgba(255,255,255,0.5);
}
.link{
  color:#fff;
  
}
.logo{
  cursor: pointer;
}
.head-btn{
  font-size:16px;
}

@media (min-width:768px) {
    .hamb{
      display: none;
    }
    
}
@media (max-width: 767px) {
    .nav{
      display: none;
    }
    .logo{
      margin-left: -50px;
    }
}

</style>
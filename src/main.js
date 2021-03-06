import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'
import axios from 'axios'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import './assets/app.scss'
import 'bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import './registerServiceWorker'
var firebaseConfig = {
  apiKey: "AIzaSyB4fI0N4OgXzEXdsioGfAbu_xZvAM7xO_Q",
  authDomain: "resort1234.firebaseapp.com",
  databaseURL: "https://resort1234.firebaseio.com",
  projectId: "resort1234",
  storageBucket: "resort1234.appspot.com",
  messagingSenderId: "764353730728",
  appId: "1:764353730728:web:b83f84b68722e1feba4a9d",
  measurementId: "G-03W0BMCB8N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(async (user)=>{
  const {data} = await axios.get('/user',{
    params:{
      uid:user.uid
    }
  })

  user = {...user,...data}
  store.commit("updateUser",{user});
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
<template>
  <SignupLogin>
        <div class="card-body">
          <h4 class="title text-center mt-4">
            Login into account
          </h4>
          <form class="form-box px-3">
            <div class="form-input">
              <span>
              <i class="fa fa-envelope" aria-hidden="true"></i></span>
              <input type="email" name="" placeholder="UserName/E-mail address" tabindex="10" v-model="email" required>
            </div>
            <div class="form-input">
              <span><i class="fa fa-key"></i></span>
              <input type="password" name="" placeholder="Password" v-model="password" required>
            </div>

            <div class="mb-3">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="cb1" name="" required>
                <label class="custom-control-label" for="cb1">Remember me</label>
              </div>
            </div>
            <p v-if="error">{{error}}</p>
            <div class="mb-3">
              <b-button class="text-uppercase" @click="login()">
                Login
              </b-button>
            </div>

            <div class="text-right">
              <a href="#" class="forget-link">
                Forgot Password?
              </a>
            </div>

            <div class="row mb-3">

            </div>

            <hr class="my-4">

            <div class="text-center mb-2">
              Don't have an account?
              <router-link to="/signup/basic" class="register-link">
                Register here
              </router-link>
            </div>
          </form>
        </div>
    </SignupLogin>
</template>

<script>
import SignupLogin from '../views/SignupLogin'
import * as firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";
//import {mapState} from  'vuex'
export default{
    computed : {
      ...mapGetters(["user"]),
  
      nextRoute() {
        console.log("Hello");
        return  this.$route.query.redirect || "/user";
      }
    },
    data () {
        return {
          email:"",
          password:"",
          error:null,
        };
    },
    watch:{
       user(auth){
        if(auth){
          this.$router.replace(this.nextRoute);
        }
      }
    },
    methods:{
      login(){
          firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then( user =>{
            console.log(user);
            //console.log(firebase.auth().currentUser);
            this.$router.push("/user");
          })
          .catch(error=>{
            this.error=error.message;
          });
      }
    
    },
    components:{
    SignupLogin,
  }
}
</script>

<style scoped>

.card-body{
max-height: 50rem;
padding-top: 5rem;
}

.title{
  margin-bottom: 1rem;
}

.form-input{
  position: relative;
}

.form-input input{
  width: 100%;
  height: 2.8rem;
  padding-left: 3rem;
  margin-bottom: 1.4rem;
  box-sizing: border-box;
  box-shadow: none;
  border-radius: 50px;
  border: 1px solid #00000020;
  outline: none;
  background: transparent;
}

.form-input span{
  position: absolute;
  top: 0.7rem;
  padding-left: 1.1rem;
  color:  #00828b;
}

.form-input input::placeholder{
  color: black;
  padding-left: 0px;
}

.form-input input:focus, .form-input input:valid{
  border: 2px solid  #00828b;
}

.form-input input:focus::placeholder{
  color: #454b69;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before{
  background-color:  #00828b !important;
  border: 0px;
}

.form-box button{
  margin-top: 0.7rem;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  background: #006a71;
  color: #fff !important;
  font-size: 90%;
  font-weight: bold;
  letter-spacing: .1rem;
  transition: 0.5s;
  padding: 12px;
}

.form-box button:hover{
  background: #0069d9;
}

.forget-link, .register-link{
  color: #006a71;
  font-weight: bold;
}

.forget-link:hover, .register-link:hover{
  color: #0069d9;
  text-decoration: none;
}


.form-box .btn-social{
  color: white !important;
  border: 0;
  font-weight: bold;
}

button{
  width:100%;
}

</style>
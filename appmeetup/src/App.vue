<template>
  <div id="app">
    <div id="nav">
       <!-- <router-link :to='{name:"Home"}'><img src="./assets/logo-image/appmeetup-logo.png" /></router-link> -->
       <div id="nav-text">
        <h3 class="app-title">App Meetup </h3>
        <router-link class="logo" :to='{name:"Home"}'>Home</router-link>
        <router-link v-show="!logged" :to='{name:"Login"}'>Login</router-link>
        <router-link v-show="!logged" :to='{name:"Register"}'>Register</router-link>
        <router-link v-show="logged" :to='{name:"UserProfile"}'>MENU</router-link>
        <router-link v-show="adminlogged" :to='{name:"AdministratorPanel"}'>Menu Admin</router-link>
        <router-link :to='{name:"About"}'>About</router-link>
        <button v-show="logged" @click ="logoutUser()">Logout</button>
        <button v-show="adminlogged" @click ="logoutUser()">Logout</button>
      </div>
          <p v-if="logged" class="greeting">Hola,{{ username }} </p>
       </div>

    <!-- Menu utilizado para tamaños pequeños de pantalla. Movil ... -->
    <div id="mobile-nav" v-show="seeModal">
      <router-link :to='{name:"Home"}'>Home</router-link>
      <router-link :to='{name:"Login"}'>Login</router-link>
      <router-link :to='{name:"Register"}'>Register</router-link>
      <router-link v-show="logged" :to='{name:"UserProfile"}'>MENU</router-link>
      <router-link :to='{name:"About"}'>About</router-link>

    </div>
    <!-- Boton para menu desplegable y vertical del modo movil -->
      <div class="menu-btn">
      <button @click="seeModal =! seeModal"><fa-icon :icon="['fas','bars']" size="2x" /></button>
    </div>
    <router-view  @login='loginUser'/>
    <footercustom />
  </div>
</template>

<script>

import axios from 'axios'
import { logout } from '@/api/utils' // Salir de la sesion
import { getName } from '@/api/utils' // Recogemos el nombre del usuario de la base de datos
import { isLoggedIn } from '@/api/utils' // Metodo utilizado para determinar si esta logeado o no
import { getTypeUser} from '@/api/utils' // Extraemos el tipo de usuario del localstorage



 import { checkIsUser, checkIsOrganizer, checkIsAdmin } from '@/api/utils'

import slider from '@/components/Slider.vue'
import footercustom from '@/components/FooterCustom.vue'

export default {
  name:'App',
  components:{
    slider,
    footercustom
  },
  data(){
    return{
      username:'',
      timeout:false,
      adminlogged:false,
      logged:false, // Oculta los campos si no estas logeado
      seeModal:false
    }
  },
  methods:{
    setUserName(){
      console.log("Entro aqui");
      this.username = getName()
    },

    getUserName(){
      this.username = localStorage.getItem("NAME");
    },

    logoutUser(){
      logout()
      this.$router.push({name:'Login'})
      location.reload()
      
    },

    loginUser(){
      this.getLogin()
       this.getUserName()
      this.$router.push({name:'Home'})
    },



    getLogin(){

      if(checkIsUser() === true || checkIsOrganizer() === true){
        this.logged = isLoggedIn()
      }else{

        this.adminlogged = isLoggedIn();
      }
    },
    

  },

  created(){
    this.setUserName();
    this.getLogin();
  }

}
</script>

 
<style>
/* Import utilizado para poder utilizar esa fuente de "Google Fonts como fuente principal en toda la aplicacion */
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

input:focus{
  outline:none;
}

button:focus{
  outline:none;
}
html {
  background-color: #dbe5de;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%2396ac92' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  /* background-color: #dbe5de; */
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2350903c' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"); */
  /* https://www.heropatterns.com/ */
  /* background-color: #d1eacc; */
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%233d762c' fill-opacity='0.2' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E"); */
}
#app {
  font-family: "Righteous", cursive;
  text-align: center;
  color: #2c3e50;
}

/* Clase utilizado para mostrar el saludo al iniciar el login */
.greeting{
  position:fixed;
  top:30px;
  animation: fade 5s;
}


#nav {
  padding: 15px;
  background-color: #00a896;
  border-bottom: 0.1rem solid #fff;
  height: 4.5rem;
  width:100%;
}

#nav #nav-text{
  display: flex;
  justify-content:flex-end;
  align-items: baseline;
  font-size: 20px;
}

#nav img{
  display:inline-block;
  margin-top:-1.7rem;
  height:4.2rem;
  width:13rem;
}
#nav a {
  font-weight: bold;
  margin-right: 5rem;
  text-decoration: none;
  color: #fff;
  display:inline-block;
  margin-top:1.8rem;
}

#nav button {
  font-weight: bold;
  margin-right: 5rem;
  background-color:#42b983;
  color:#fff;
  height:2rem;
  width:6rem;
  border-radius:20rem;
  border :2px solid white;
  display:inline-block;
  margin-top:1.8rem;
}

#nav a.router-link-exact-active {
  color: #08f527;
  float:left;
}

.app-title {
  padding-right:2rem;
  color:#fff;
  text-transform: uppercase;
}

h1 {
  color: #354f52;
}

.logo{
  font-size:18px;
}


/* Efecto desvanecimiento saludo ("Hola Raul") */

 @keyframes fade {
 0%{
    opacity: 0;
  }

  30% {
    opacity: 1;
  }


  80% {
    opacity: 0;
  }

  100% {
     opacity: 1;
  }
} 

/* Media Queries */



/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 600px) { 

  #nav{
    display:none;
  }
  #mobile-nav {
    display: flex;
    width:100%;
    position: absolute;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 35%;
    height: 100%;
    z-index: 1;
    background-color: rgb(64, 145, 108, 0.8);
  } 


  #mobile-nav a {
    text-decoration: none;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  #mobile-nav a:hover {
    text-decoration: none;
    transform: scale(1.5);
    color: yellowgreen;
    cursor: pointer;
  }

  .menu-btn {
    position: absolute;
    cursor: pointer;
    top: 15px;
    right: 30px;
  } 
  
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 600px) {
  .menu-btn{
    display:none;
  }

  #mobile-nav{
    display:none;
  }
}

@media only screen and (max-width: 957px) {

  .logo{
  font-size:22px;
}
  #nav img{
    display:none;
  }

  #nav #nav-text{
    margin-top: -0.5rem;
  }

  #nav-tex{
    margin-top:1rem;
  }
  .mobile-nav{
    display:none;
  }

  footer{
    font-size:0.9rem;
  }
}

@media only screen and (min-width: 957px) {
  #nav img{
    display:flex;
    justify-content:flex-end;
    margin-right:37rem;
  }

  #nav #nav-text{
    margin-top: -0.5rem;
  }

  #nav-tex{
    margin-top:1rem;
  }
  .mobile-nav{
    display:none;
  }

  footer{
    font-size:0.9rem;
  }
}





</style>
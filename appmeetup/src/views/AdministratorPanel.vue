<template>
  <div class="administrator">
    <vue-headful title=" Administrator Panel" />
    <spinner v-show="loading_spinner"/>
    <administratorpanel :users="users" v-on:data="showUsersDetail" v-on:indice="deleteUsers" v-show="list_users"/>
    <div v-show="seeModal" class="modal">
           <div class="modalBox">
                <h3>Users Detail</h3>
                <span>Id:</span><input type="text" class="text"  v-model="id" readonly=readonly />
                <span>Username:</span><input type="text" class="text"  v-model="first_name" readonly="readonly" />
                <span>Surname:</span><input type="text" class="text"  v-model="last_name" readonly="readonly"/>
                <span>UserImage:</span><input type="text" class="text"  v-model="user_image" readonly="readonly" />
                <span>Email:</span><input type="text" class="text"  v-model="email" readonly="readonly"/>
                <span>Phone:</span><input type="text" class="text"  v-model="phone" readonly="readonly"  />
                <span>UserType:</span><input type="text" class="text"  v-model="user_type" readonly="readonly"/>
                <span>User Autonomous Community:</span><input type="text" class="text"  v-model="user_autonomous_community" readonly="readonly"  />
                <span>User Province:</span><input type="text" class="text"  v-model="user_province" readonly="readonly"  />
                <span>User City:</span><input type="text" class="text"  v-model="user_city" readonly="readonly" />
                <span>Organizer Name:</span><input type="text" class="text"  v-model="organizer_name" readonly="readonly"/>
                <span>Organizer Autonomous Community:</span><input type="text" class="text"  v-model="organizer_autonomous_community" readonly="readonly"  />
                <span>Organizer Province:</span><input type="text" class="text"  v-model="organizer_province" readonly="readonly"  />
                <span>Organizer City:</span><input type="text" class="text"  v-model="organizer_city" readonly="readonly"/>
                <span>Description</span><input type="text" class="text"  v-model="description_text" readonly="readonly"/>
            <div class="modalbox-buttons">
                <button @click="seeModal =! seeModal">Cancel</button>
            </div>
            </div>
       </div>
  </div>
</template>

<script>



import { sweetAlertConfirmUserDelete } from '../utilities/sweetalert-modals'

// Import de la libreria axios
import axios from "axios"

// Importamos el componente "SeeProducts" para poder relacionarlo con la vista "Home"

import administratorpanel from "@/components/AdministratorPanel.vue"

// Importamos el componente " Spinner" para poder relacionarlo con la vista "Home"

import spinner from '@/components/Spinner.vue'


export default {

name:"AdminsitratorPanel",

components:{
    administratorpanel,
    spinner
},

data(){
    return{
        users:[],
        id:"",
        first_name:"",
        last_name:"",
        user_image:"",
        email:"",
        phone:"",
        user_type:"",
        user_autonomous_community:"",
        user_province:"",
        user_city:"",
        organizer_name:"",
        organizer_autonomous_community:"",
        organizer_province:"",
        organizer_city:"",
        description_text:"",
        loading_spinner:"true",
        list_users:"false",
        seeModal:false

    }
},


methods:{

     activatespinner(){
      setTimeout( () =>
        { 
          this.loading_spinner = false; 
          this.list_products = true;
        }, 1000);
    },


    // Metodo para BORRAR los USUARIOS de la base de datos
    deleteUsers(userIndex){
      console.log(userIndex);
        var self = this;
        axios.delete("http://localhost:8888/users/user/" + userIndex)
        .then(function(response){
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
        sweetAlertConfirmUserDelete();
        setTimeout(function(){location.reload()},1000);
        
    },

    // Metodo para  MOSTRAR de los datos de los Usuarios

    showUsersDetail(dataUser){
      console.log("Estos son los datos del Data User")
      console.log(dataUser)
      console.log("Estoy en show users detail");
        this.id = dataUser.id;
        this.first_name = dataUser.first_name;
        this.last_name = dataUser.last_name;
        this.user_image = dataUser.user_image;
        this.email = dataUser.email;
        this.phone = dataUser.phone;
        this.user_type = dataUser.user_type;
        this.user_autonomous_comunity = dataUser.user_autonomous_community;
        this.user_province = dataUser.user_province;
        this.user_city = dataUser.user_city;
        this.organizer_name = dataUser.organizer_name;
        this.organizer_autonomous_community = dataUser.organizer_autonomous_community;
        this.organizer_province = dataUser.organizer_province;
        this.organizer_city = dataUser.organizer_city;
        this.description_text = dataUser.description_text;
        this.seeModal = true;

    },

    //Metodo para OBTENER los CLIENTES de la base de datos

    getUsers(){
        var self = this;
        axios.get("http://localhost:8888/users/listusers")
        .then(function(response){

            self.users = response.data.data;
        })
        .catch(function(error){
            console.log(error);
        })
    },


    },
created() {
    this.getUsers();
},


mounted(){
  this.activatespinner()
}

}
</script>

<style scoped>

.modal{
  display:flex;
  justify-content:center;
  margin-bottom:10rem;
}

.modalBox{
  display:flex;
  justify-content:center;
  flex-direction: column;
  width:20%;
  border:8px outset #00a896;
  padding:2rem;
}

.text{
  height:1.5rem;
  border-radius:20rem;
  text-align:center;
}
</style>


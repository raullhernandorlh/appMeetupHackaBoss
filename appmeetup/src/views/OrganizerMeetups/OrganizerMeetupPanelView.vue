<template>
  <div class="organizer-meetup">
    <vue-headful title=" Organizer Meetup Panel" />
    <ul>
      <li v-for="meetup in meetups" :key="meetup.id">
        <organizermeetuppanel
          :meetup="meetup" 
          v-on:data="showMeetupsDetail" 
          v-on:index="deleteMeetups" 
          v-on:indexShowComment="showMeetupComments"
          v-show="list_meetups"
      />
      </li>
    </ul>
      <div v-show="seeModal" class="organizerModalBox" >
      <!-- Modal para detalle y actualizar -->
       
           <div class="modalBox">

                <div class="column1">
                  <span class="title">Id:</span><input type="text" class="text"  v-model="id" />
                  <span>Title</span><input type="text" class="text"  v-model="title" />
                  <span>Time</span><input type="text" class="text"  v-model="time" />
                  <span>Duration</span><input type="text" class="text"  v-model="duration" />
                  <span>Location</span><input type="text" class="text"  v-model="location" />
                  <span>Category</span><input type="text" class="text"  v-model="category" />
                </div>
                <div class= "column2">
                  <h2>Meetup Images </h2>
                    <div class="meetupsImages">
                      <p class="flexMeeetupImageParagraph"><span><img class="image" :src='meetup_principal_image'> </span><input class="image" type="file" ref="update_principal_image" @change="updatePrincipalImage"></p>
                      <p class="flexMeeetupImageParagraph"><span> <img class="image" :src='meetup_second_image'></span><input class="image" type="file" ref="update_second_image" @change="updateSecondImage"></p>
                      <p class="flexMeeetupImageParagraph"><span><img class="image" :src='meetup_third_image'> </span><input class="image" type="file" ref="update_third_image" @change="updateThirdImage"></p>
                    </div>
                   
                  <span>Meetup Price</span><input type="text" class="text"  v-model="meetup_price" />
                  <span>Description</span><input type="text" class="text"  v-model="description" /> 
                </div>
                  <div class="modalbox-buttons">
                        <button class="close-button" @click="seeModal =! seeModal"><fa-icon :icon="['fas','times']" size="2x" /></button>
                        <button class="edit-button" @click="updateMeetup()"><fa-icon :icon="['fas','edit']" size="2x" /></button>
                  </div>
            </div>
            
          
    </div>
    
        <!--Modal para ver los comentarios de los meetups -->
          <div v-show="seeModalMeetupsComments" class="organizerModalBox">
            <div class="showCommentModalBox">
               <h3>MeetupComments</h3>
              <ul class="comment-list">
                <li v-for="comment in comments" :key="comment.id">
                    <div class="data-comment">
                        <p class="comment-text"><span>Comment</span>{{ comment.comment }}</p>
                        <p class="comment-text"><span>Date</span>{{ comment.date }}</p>
                        <p class="comment-text"><span>Time</span>{{ comment.time }}</p>
                    </div>
                </li>
              </ul>
              <div >
              <button title="Close Comment Window" class="close-button-comment" @click="seeModalMeetupsComments =! seeModalMeetupsComments"><fa-icon :icon="['fas','times']" size="2x" /></button>
            </div>
            </div>
        </div>
  </div>
</template>

<script>

// Imports sweet alerts from class "utilities"
import { confirmMeetupUpdateModal, confirmDeleteOrganizerMeetups, noComments } from '@/utilities/sweetalert-modals'
import Swal from 'sweetalert2';
import { getAuthToken} from '@/api/utils.js'
// Import de la libreria axios
import axios from "axios"

import  organizermeetuppanel from "@/components/Meetup/OrganizerMeetupPanel.vue"

// Importamos el componente " Spinner" para poder relacionarlo con la vista "Home"

import spinner from '@/components/Spinner.vue'

import moment from 'moment'


export default {

name:"OrganizerMeetupPanelView",

components:{
    organizermeetuppanel,
    spinner
},

data(){
    return{
        meetups:[],
        comments:[],
        id:"",
        title:"",
        date:"",
        time:"",
        duration:"",
        location:"",
        category:"",
        meetup_principal_image:"",
        meetup_second_image:"",
        meetup_third_image:"",
        update_principal_image:"",
        update_second_image:"",
        update_third_image:"",
        meetup_price:"",
        description:"",
        list_meetups:"false",
        seeModal:false,
        seeModalMeetupsComments:false
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

  // Metodos para subir las fotos a Actualizar

    updatePrincipalImage(){
        this.update_principal_image = this.$refs.update_principal_image.files[0];
    },


     updateSecondImage(){
      this.update_second_image = this.$refs.update_second_image.files[0];
    },


    updateThirdImage(){
      this.update_third_image = this.$refs.update_third_image.files[0];
    },

  //Metodo para actualizar Meetups

  async updateMeetup(){

     let userresponse = await Swal.fire({
            title: 'Are you sure?',
            text: "The Meetup is going to update",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2D7A39',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update The Meetup!'
    })

      if (userresponse.value) {
        try{
          let formData = new FormData();
          formData.append('title',this.title)
          formData.append('date',this.date)
          formData.append('time',this.time)
          formData.append('duration',this.duration)
          formData.append('location',this.location)
          formData.append('category',this.category)
          formData.append('update_principal_image',this.update_principal_image)
          formData.append('update_second_image',this.update_second_image)
          formData.append('update_third_image',this.update_third_image)
          formData.append('meetup_price',this.meetup_price)
          formData.append('description',this.description)
         
           
          const response = await axios.put("http://localhost:8888/meetups/" + this.id , formData,{
            headers:{
            Authorization: `${getAuthToken()}`,
            "Content-Type": "multipart/form-data"
            },
          })
          Swal.fire(
                  'Update!',
                  'Your meetup has been update.',
                  'success'
          )
        // Recargamos todas las meetups despues de actualizar
      
        this.$router.push({name:'OrganizerMeetupPanel'})
        location.reload()
        // TODO Hacer un evento para que me refresque el "Update Meetups"
        }catch(error){
          console.log(error);
        } 
            
       }
    
    },
  

    //Show Meetups Comments

    showMeetupComments(meetupShowCommentIndex){
      var self=this;
        const id = meetupShowCommentIndex;
        //LLamada de axios para obtner los clientes de la BBDDD
        axios.get("http://localhost:8888/comments/" + id,{
          headers:{
            Authorization: getAuthToken()
          }

        })
        .then(function(response){
            if (self.comments === undefined){
              noComments()
            }
            else{
            self.comments = response.data.data;
            }
        })
        .catch(function(error){
            console.log(error);
        })
        this.seeModalMeetupsComments = true;
    },

   

    // Metodo para BORRAR los Meetups de la base de datos
    async deleteMeetups(meetupIndex){

    let userresponse = await Swal.fire({
        title: 'Are you sure?',
        text: "The Meetup is going to delete",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2D7A39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete The Meetup!'
      })

    if (userresponse.value) {

      try{
          const response = await axios.delete("http://localhost:8888/meetups/" + meetupIndex,{
            headers:{
              Authorization: `${getAuthToken()}`
            }

       })

        Swal.fire(
                  'Delete!',
                  'Your meetup has been deleted.',
                  'success'
        )

        this.getOrganizerMeetups()

        }catch(error){

            Swal.fire({
              icon: 'info',
              title: 'Meetup reserved',
              text: 'The meetup cannot be deleted because it has an associated reservation',
             
            })
        }
      }
    },

    // Metodo para  MOSTRAR de los datos de los Meetups del Organizador

    showMeetupsDetail(dataMeetup){
        this.id = dataMeetup.id;
        this.title = dataMeetup.title
        this.date = dataMeetup.date;
        this.time = dataMeetup.time;
        this.duration = dataMeetup.duration;
        this.location = dataMeetup.location;
        this.category = dataMeetup.category;
        this.meetup_principal_image = dataMeetup.meetup_principal_image;
        this.meetup_second_image= dataMeetup.meetup_second_image;
        this.meetup_third_image = dataMeetup.meetup_third_image;
        this.meetup_price = dataMeetup.meetup_price;
        this.description = dataMeetup.description;
        this.seeModal = true; 
    },

    //Metodo para OBTENER los Meetupsde la base de datos

    async getOrganizerMeetups(){

      try{
        //LLamada de axios para obtner los clientes de la BBDDD
        const response = await axios.get("http://localhost:8888/meetups/listmeetups/",{
          headers:{
            Authorization: getAuthToken()
          }

        })
       
        this.meetups = response.data.data;
       
        }catch(error){
            console.log(error);
        }
    },

},
created() {
    this.getOrganizerMeetups();
},

// Hook "mounted". Utilizado para ejecutar el spinner una vez la app ya esta montada
mounted(){
  this.activatespinner()
}

}
</script>

<style scoped>

.organizerModalBox {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  background:rgb(0,0,0,0.5)
}

.modalBox{
  display:flex;
  justify-content:space-around;
  background-color:#fff;
  margin:2% auto;
  padding: 3rem;
  width:80%;
  border:3px solid #00a896;
  border-radius:12px;
}

.showCommentModalBox{
  display:flex;
  background-color:#fff;
  margin:2% auto;
  padding: 3rem;
  width:60%;
  border:3px solid #00a896;
  border-radius:12px;
}

ul{
  list-style:none;
  margin-bottom:7rem;
}

.comment-list{
  display:flex;
  flex-direction: column;
  flex-wrap:wrap;
  
}

.commentModalBox{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-around;
  background-color:#fff;
  margin:20% auto;
  padding: 2rem;
  width:40%;
  border:3px solid #00a896;
  border-radius:12px;
}

.button-comment{
  margin-top:-2rem;
}



.column1{
  display:flex;
  flex-direction:column;
  align-items:center;
  width:30%;
}

.column2{
  display:flex;
  flex-direction:column;
  align-items:center;
  width:70%;
}


.edit-button{
  margin-top:40em;
  color:#fff;
  border:3px solid white;
  background-color: #00a896;
  width:8rem;
  height:2.5rem;
  border-radius:8rem;
}

.edit-button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  cursor:pointer;
}

.close-button{
  border:3px solid white;
  background-color: #00a896;
  color:#fff;
  width:4rem;
  height:2.5rem;
  border-radius:8rem;
}
.close-button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  cursor:pointer;
}

.close-button-comment{
  border:3px solid white;
  background-color: #00a896;
  color:#fff;
  width:4rem;
  height:2.5rem;
  border-radius:8rem;
  margin-top:20rem;;
  margin-left:22rem;
}


.button{
  align-items: center;
  justify-content:center;
  margin:1rem;
  border-radius:20px;
  width:10rem;
  height:2rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
  margin-top:4rem;
}



.button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  cursor:pointer;
}

/* Modal Comment */

.modalComment{
   display:flex;
   flex-direction: column;
   justify-content: center;
   position: absolute;
   width:40%;
   height:20%;
   left: 32%;
   top: 50%;
   background-color:rgb(255, 255, 255,0.85);
  border:5px outset #00a896 ;
}



.text{
  text-align:center;
  border:3px solid #00a896 ;
  margin:0.8rem;
  height:1.5rem;
  border-radius:8rem;
  width:90%;
}

.textarea{
  height:6rem;
  resize:none;
  border:5px outset #00a896 ;
  width:70%;

}

div.data-comment{
  display:flex;
  width:10rem;
  height:4rem;
 
}
span{
  margin:0.7rem
}

/* Images div and images styles */

.meetupsImages{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:baseline;
  margin:1rem;
}

span{
  margin-right:1rem;
}

.flexMeeetupImageParagraph{
  display:flex;
}

.image{
  margin-right:2rem;
  height:100px;
}


 /* Modal For All Comments */

 .showModalComment{
   display:flex;
   flex-direction: column;
   justify-content: center;
   position: absolute;
   width:40%;
   height:80%;
   left: 32%;
   top: 5%;
   background-color:rgb(255, 255, 255,0.85);
  border:5px outset #00a896 ;
}


p.comment-text{
  display:flex;
  align-items:baseline;
  margin-left:0.6rem;
  
}




</style>

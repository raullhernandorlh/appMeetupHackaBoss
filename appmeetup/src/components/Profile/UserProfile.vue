<template>
<!-- Cargamos el spinner del componente si los datos que nos vienes del perfil del usuario son nulos -->
  <Spinner :is-loading="userprofile === null">
    <div class="user-profile">
        <div class="profile">
              <article>
                  <div class = "organizer-card" v-show ="organizer">
                    <div class="organizer-details">
                      <h2>User Profile</h2>
                      <p class="user-text"><span> Name </span>{{userprofile.first_name}}</p>
                      <p class="user-text"><span> Last Name </span>{{ userprofile.last_name}}</p>
                      <p class="user-text"><span> Phone </span>{{ userprofile.phone}}</p>
                       <p class="user-img" :style="{'background-image':`url('${userprofile.user_image}')`}"><img :src="userprofile.user_image"></p> 
                      
                      
                      <button  title = "User Detail" @click="sendUserProfileData()"><fa-icon :icon="['fas','user-circle']" size="2x" /></button>
                      <button><router-link title = "View My Reservations" :to='{name:"OrganizerReservations"}'><fa-icon :icon="['fas','clipboard-list']" size="2x" /></router-link></button>
                    </div>
                    <div class="organizer-menu">
                      <h3 > ORGANIZER MENU </h3>
                      <button><router-link  title = "Organizer Detail" :to='{name:"OrganizerProfile"}'><fa-icon :icon="['fas','info-circle']" size="2x" /></router-link></button>
                      <button><router-link title="Create A Meetup" :to='{name:"CreateAMeetup"}'><fa-icon :icon="['fas','plus-square']" size="2x" /></router-link></button>
                      <button><router-link title = "List Organizer Meetups"  :to='{name:"OrganizerMeetupPanel"}'><fa-icon :icon="['fas','list']" size="2x" /></router-link></button>
                  </div>
                    </div>
                  <div v-show="user" >
                   <h2>User Profile</h2>
                      <p class="user-text"><span> Name </span>{{ userprofile.first_name}}</p>
                      <p class="user-text"><span> Last Name </span>{{ userprofile.last_name}}</p>
                      <p class="user-text"><span> Phone </span>{{ userprofile.phone}}</p>
                       <p class="user-img" :style="{'background-image':`url('${userprofile.user_image}')`}"><img :src="userprofile.user_image"></p> 
                      <button @click="sendUserProfileData()">User Detail</button>
                       <button><router-link :to='{name:"UserReservations"}'>Reservations</router-link></button>
                  </div>
              </article>
          </div>
      </div>
  </Spinner>
</template>
<script>

import {checkIsOrganizer,checkIsUser,checkIsAdmin} from "@/api/utils.js"
import Spinner from '@/components/Spinner.vue'

export default {
  name: "UserProfile",
  data(){
    return{
      user: false,
      organizer: false,
      admin:false,

    }
  },
  props: {
     userprofile: Object,
  },
  components: {
    Spinner
  },
  methods: {

    sendUserProfileData() {
      
      this.$emit("data", this.userprofile);
    },

    showOrganizerMenu() {
      this.organizer = checkIsOrganizer();
    },

    showUserMenu() {
      this.user = checkIsUser();
    },

    showAdminMenu(){
      this.admin = checkIsAdmin();
    }
  },

   created() {
    this.showOrganizerMenu();
    this.showUserMenu();
    this.showAdminMenu();
  }
}
</script>


<style scoped>
li {
  list-style: none;
}


article{
  
  margin-top:7rem;
 
}


.organizer-card{
  display:flex;
  justify-content:center
}



.organizer-menu{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction: column;
  margin-bottom:4rem;
}



button{
  width:10rem;
  height:2.5rem;
  border-radius:4rem;
  color:#fff;
  border:3px solid white;
  margin-right:0.5rem;
  margin-bottom:2rem;
  background-color: #00a896;
  cursor:pointer;
}

button a {
  text-decoration:none;
  color:#fff;
}

button a:hover{
  color:#00a896;

}
button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896 ;

}
img{
  margin-left:auto;
  margin-right:auto;
  width:15rem;
  height:15rem;
}
.user-text{
  margin-bottom:1rem;
}

ul.profile{
  margin-left:-2rem;
  margin-right:auto;
}


@media only screen and (min-width: 680px) {
  
  .article{
    display:flex;
  }

}

/* Mobile Screen */

@media screen and (min-width: 360px) {
  
  .organizer-card{
    display:flex;
    flex-direction:column;
  }


} 

/* Tablet Screen */


@media screen and (min-width: 768px) {
  

  .organizer-card{
    margin-top:-5rem
  }

  img{
    width:20rem;
    height:auto;
    border:0.3rem solid #00a896;
    border-radius:1rem;
  }

  span{
    margin-right:1rem;
  }

  p.user-img{
    display:flex;
    justify-content:center;
    margin-left:auto;
    margin-right:auto;
    border-radius:1rem;
    border:3px solid #fff;
    width:60%;
    background-repeat: no-repeat;
    background-position:center;
    background-attachment: cover;
    margin-top:4%;
    padding:1.5rem;
    background-size:cover;
    transform:rotate(0.5deg);
  }



  .organizer-details{

    border-radius:1rem;
  }

  .organizer-menu{
    display:block;
    border-radius:1rem;

  }
  
} 




</style>
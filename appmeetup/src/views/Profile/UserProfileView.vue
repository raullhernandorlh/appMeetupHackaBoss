<template>
  <div class="user-profile">
    <vue-headful title=" User Profile" />
    <userprofile :userprofile="userprofile" v-on:data="showUserProfileDetail" />
    <div v-show="seeModal" class="profileModalBox">
      <div class="modalBox">
          <div class ="columnProfile1">
            <span>Name</span><input type="text" class="text" v-model="first_name" />
            <span>Lastname</span><input type="text" class="text" v-model="last_name" />
            <img class="image" :src='user_image'>
            <input type="file" ref="update_user_image" @change="updateUserImage">
            <!-- <span>Image</span><input type="text" class="text" v-model="user_image" /> -->
          </div>
          <div class ="columnProfile2">
            <span>Autonomous Community</span><input type="text" class="text" v-model="user_autonomous_community" />
            <span>Province</span><input type="text" class="text" v-model="user_province" />
            <span>City</span><input type="text" class="text" v-model="user_city" />
            <span>Phone</span><input type="text" class="text" v-model="phone" />
          </div>
         <div class="modalbox-buttons">
            <button class="close-button" @click="seeModal =! seeModal"><fa-icon :icon="['fas','times']" size="2x"/></button>
            <button title="Press to change your password" class="changePasswordButton" @click="changePasswordModal()"> Update Password </button>
            <button class="update-button" @click="updateProfile()"><fa-icon :icon="['fas','edit']" size="2x" /></button>
          </div>
      </div>
    </div>


      <!-- Reset Password Modal -->
      <div v-show="seeModalChangePassword" class="profileModalBox">
            <div class="modalBoxRecovery">
              <span>Old Password</span><input type="password" class="text" placeholder="Enter Your Current Password" v-model="oldpassword"/>
              <span>New Password </span><input type="text" class="text" placeholder="Enter Your New Password" v-model="newpassword"/>
            <div class= "modalRecoveryButtons">
               <button @click="changePassword()" title="Change your password" class="change-password">Change Password</button>
               <button title="Close Pasword Recover Window" class="close-resetPassword" @click="seeModalChangePassword =! seeModalChangePassword"><fa-icon :icon="['fas','times']" size="2x" /></button>
            </div>
            </div>
      </div>
  </div>
  
</template>

<script>
import Swal from 'sweetalert2';
import { getAuthToken } from '@/api/utils'
import axios from "axios";
import userprofile from "@/components/Profile/UserProfile.vue";

export default {
  name: "UserProfileView",
  components: {
    userprofile,
  },
  data() {
    return {
      userprofile:{},
      first_name: "",
      last_name: "",
      user_image: "",
      update_user_image:"",
      user_autonomous_community: "",
      user_province: "",
      user_city: "",
      phone: "",
      oldpassword:"",
      newpassword:"",
      seeModalChangePassword:false,
      seeModal: false,
    }
  },

  methods: {

     async getUserProfile() {
       try{
        const response = await axios.get("http://localhost:8888/profiles/user/" ,{ 
             headers: {
              Authorization:`${getAuthToken()}`
            },  
          })
          this.userprofile = response.data.data;
        
        }catch(error) {
            console.log(error);
        };
    },

    updateUserImage(){
      this.update_user_image = this.$refs.update_user_image.files[0];
  },

    showUserProfileDetail(dataUserProfile) {

      this.first_name = dataUserProfile.first_name;
      this.last_name = dataUserProfile.last_name;
      this.user_image = dataUserProfile.user_image;
      this.user_autonomous_community = dataUserProfile.user_autonomous_community;
      this.user_province = dataUserProfile.user_province;
      this.user_city = dataUserProfile.user_city;
      this.phone = dataUserProfile.phone;
      this.seeModal = true;
    },

    async updateProfile(){

        let userresponse = await Swal.fire({
        title: 'Are you sure?',
        text: "The Profile is going to update",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#2D7A39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,  The Reservation was updated!'
      })

      if (userresponse.value) {
        try{
          let formData = new FormData();
          formData.append('first_name',this.first_name);
          formData.append('last_name',this.last_name);
          formData.append('update_user_image',this.update_user_image);
          formData.append('user_autonomous_community',this.user_autonomous_community);
          formData.append('user_province',this.user_province);
          formData.append('user_city',this.user_city);
          formData.append('phone',this.phone);

          const response = axios.put("http://localhost:8888/profiles/user/",formData,{ 
            headers:{
            Authorization: `${getAuthToken()}`,
            "Content-Type": "multipart/form-data"
            },
          })

        Swal.fire(
          'Updated!',
          'Your meetup has been updated.',
          'Update'
          )
          
        this.getUserProfile();
         location.reload()
      

        }catch(error){
          console.log(error);
        }
       }
      },

    changePasswordModal(){
      this.seeModalChangePassword = true;
    },

    async changePassword(){
      try{
        const oldpassword = this.oldpassword
        const newpassword = this.newpassword
        const response = await axios.post("http://localhost:8888/users/password/",{ 
          oldpassword: oldpassword,
          newpassword: newpassword
        },
        {headers:{
            Authorization:`${getAuthToken()}`
          },
        })
      confirmPasswordChange()
      }catch(error){
        console.log(error);
      }

      }
  },

  created() {
    this.getUserProfile();
}

}
</script>




<style  scoped>

/* Center and position profile modal */

.profileModalBox {
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
  margin:10% auto;
  padding: 3rem;
  width:40%;
  border:3px solid #00a896;
  border-radius:12px;

}

/* Modalbox for Recovery Password */

.modalBoxRecovery{
  display:flex;
  flex-direction: column;
  background-color:#fff;
  margin:15% auto;
  padding: 3rem;
  width:40%;
  border:3px solid #00a896;
  border-radius:12px;
}

.modalRecoveryButtons{
  display:flex;
  margin-top:1rem;
  align-items:center;
  justify-content:space-between,
}


/* Center and position recovery password modal */


.modalBox{
  display:flex;
  justify-content:space-around;
  background-color:#fff;
  margin:10% auto;
  padding: 3rem;
  width:50%;
  border:3px solid #00a896;
  border-radius:12px;

}



.columnProfile1{
  display:flex;
  flex-direction: column;
  width:70%;
  margin:1.5rem;

}

.columnProfile2{
   display:flex;
   flex-direction: column;
   margin:1rem;
   width:25%;
  
}

h1{
  margin-top:8rem;
}

.modalbox-buttons{
  display:block;
  margin:2rem;
  align-items: center;
  justify-content:center;
  margin-left: auto;
  margin-right: auto;
  
}

span{
  margin-bottom: 0.5rem;
  margin-top:0.5rem;
}

.text{
  border-radius:5rem;
  height:1.5rem;
  border: 3px solid #00a896;
  margin-bottom:0.5rem;
  text-align: center;
}

button{
  width:5rem;
  height:2.5rem;
  border-radius:4rem;
  color:#fff;
  border:3px solid white;
  margin-right:0.5rem;
  background-color: #00a896;
  cursor:pointer;
}

button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896 ;

}

.close-button{
  width:3rem;
}

.update-button{
  margin-top: 5rem;
}

.changePasswordButton{
  margin-top:5rem;
  width:6rem;
}

/* Images div and images styles */

.meetupsImages{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:baseline;
  margin:1rem;
}

.span{
  margin-right:1rem;
}

.flexMeeetupImageParagraph{
  display:flex;
  
}

.image{
  margin:0.5rem;
  height:140px;
}




</style>


</style>
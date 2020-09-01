<template>
  <div class="register">
     <vue-headful title=" Create Meetup" />
    <p class="errorMessage" v-show="errorMessage">You have empty fields</p>
    <form class="form">
      <div class="meetup-information">
        <h2>Create a Meetup</h2>
        
          <p v-if="!$v.title.required"> Obligatory Field . It can be empty</p>
          <label>User </label>
          <input type="text" v-model="$v.title.$model" placeholder="Insert a title for meetup" class="input" />
        
         <div class="dateandtime">
            <p>
                <label>Date</label>
                <input type="date" v-model="date"  class="date" />
            </p>
            <p>
                <label>Time</label>
                <input type="time" v-model="time"  class="time" />
            </p>
        </div>
        
           <p v-if="!$v.duration.numeric"> A Meetup Price must be composed only of numbers</p> 
          <p v-if="!$v.duration.required"> Obligatory Field . It can be empty</p>
          <label>Duration</label>
          <input type="text" v-model="$v.duration.$model" placeholder="In hours" class="input" />
        
         
           <p v-if="!$v.location.required"> Obligatory Field . It can be empty</p>
          <label>Location (City) </label>
          <input type="text" v-model="$v.location.$model" placeholder="Insert a City for Meetup" class="input" />
        
       
          <p v-if="!$v.category.required"> Obligatory Field . It can be empty</p>
          <label>Category</label>
          <select required v-model="$v.category.$model" name="category" id="category" class="select">
            <option value="">Choose a Category</option>
            <option value="natureandadventure">Nature And Adventure</option>
            <option value="sociallife">Social Life</option>
            <option value="languages">Languages</option>
            <option value="beliefs">Beliefs</option>
            <option value="sportsandphysicalcondition">Sports and Physical Condition</option>
            <option value="careersandbusiness">Careers and Business</option>
            <option value="travels">Travels</option>
          </select> 
        

          <div class="meetupsImages">
            <p class="flexMeeetupImageParagraph"><span>Meetup Image 1 </span><input class="image" type="file" ref="meetupPrincipalImage" @change="uploadPrincipalImage"></p>
            <p class="flexMeeetupImageParagraph"><span>Meetup Image 2 </span><input class="image" type="file" ref="meetupSecondImage" @change="uploadSecondImage"></p>
            <p class="flexMeeetupImageParagraph"><span>Meetup Image 3 </span><input class="image" type="file" ref="meetupThirdImage" @change="uploadThirdImage"></p>
          </div>
 
          <p v-if="!$v.meetupPrice.numeric"> A Meetup Price must be composed only of numbers</p> 
           <p v-if="!$v.meetupPrice.required"> Obligatory Field . It can be empty</p>
          <label>Meetup Price</label>
          <input v-model="$v.meetupPrice.$model" placeholder="Use '0' in case it is free" type="text" class="input" />
         
         
            <p v-if="!$v.description.required"> Obligatory Field . It can be empty</p>
          <label>Description</label>
          <input v-model="$v.description.$model" placeholder="Insert a description for Meetup" type="textarea" class="textarea" />
      
       </div> 
       <div class="create_meetups_buttons">
          <button title ="add-meetup" class="submit" @click="addNewMeetup()"><fa-icon :icon="['fas','folder-plus']" size="2x" /></button>
          <button title="Return to Profile" class="submit"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
        </div>
    </form>
  </div>
</template>


<script>

import Swal from 'sweetalert2'
import { required , numeric } from "vuelidate/lib/validators";
import { getAuthToken } from '@/api/utils.js';
import axios from 'axios';

export default {
  name: "CreateMeetupView",
  data() {
    return {
      title: "",
      date: "",
      time: "",
      duration: "",
      location:"",
      category: "",
      meetupPrincipalImage: "",
      meetupSecondImage: "",
      meetupThirdImage: "",
      meetupPrice: "",
      description: "",
      errorMessage: false,
    };
  },
  validations:{
      title:{required},
      duration:{required,numeric},
      location:{required},
      category:{required},
      meetupPrice:{required,numeric},
      description:{required}
  },
  methods: {


    uploadPrincipalImage(){
      this.meetupPrincipalImage = this.$refs.meetupPrincipalImage.files[0];
    },


     uploadSecondImage(){
       this.meetupSecondImage = this.$refs.meetupSecondImage.files[0];
    },


    uploadThirdImage(){
      this.meetupThirdImage = this.$refs.meetupThirdImage.files[0];
    },

    async addNewMeetup() {

      try{
             let formData = new FormData();
             formData.append('title',this.title)
             formData.append('date',this.date)
             formData.append('time',this.time)
             formData.append('duration',this.duration)
             formData.append('location',this.location)
             formData.append('category',this.category)
             formData.append('meetupPrincipalImage',this.meetupPrincipalImage)
             formData.append('meetupSecondImage',this.meetupSecondImage)
             formData.append('meetupThirdImage',this.meetupThirdImage)
             formData.append('meetupPrice',this.meetupPrice)
             formData.append('description',this.description)
            
            const response = await axios.post('http://localhost:8888/meetups/',formData,{
                headers: {
                  Authorization: `${getAuthToken()}`,
                  "Content-Type": "multipart/form-data"

                }, 
            })

            Swal.fire({
              icon: "success",
              title: "User Added",
              text: "The user was added successfully",
            });

            this.$router.push({name:'OrganizerMeetupPanel'})
            
          }catch(error) {
            console.log(error)
          }
      },
   }
}
</script>


<style scoped>



.dateandtime{
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    
}


.input{
    margin-bottom:0.5rem;
    border-radius: 20rem;
    width:60%;
    height:1.5rem;
    border:0.2rem solid #02C39A;
    font-size:15px;
}

.textarea{
  width:80%;
  height:5rem;
  resize:none;
}

.select{
  width:50%;
  height:1.5rem;
  background-color: #fff;
  color:#555a59;;
  border-color: 0.2rem solid #555a59;
  border-radius:20px;
}

.register{
  margin-bottom:5rem;
}
 h2{
    margin-top:3rem;
}

.register{
    display:flex;
    justify-content:center;
    flex-direction: column;
    margin-bottom:8rem;
}

.meetup-information{
    margin: 4rem 1rem 1rem 1rem;

}

.input{
    border:3px solid #02C39A;
    border-radius:20px;
}

label{
    margin-right:2rem;
}

button{
  align-items: center;
  justify-content:center;
  margin-top:1rem;
  margin-bottom:2rem;
  border-radius:20px;
  width:10rem;
  height:2.5rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
}

button a{
  color:#fff;
}

button a:hover{
  color:#00a896
}

button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  cursor:pointer;
}

.create_meetups_buttons{
  display:flex;
  justify-content:space-around;
}

/* Images Styles */

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
  border:3px solid #00a896;
  padding:0.2rem;
  border-radius:0.5rem
}


</style>
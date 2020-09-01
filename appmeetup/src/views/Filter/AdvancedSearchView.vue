<template>
  <div class="home">
    <h1>Advanced Search</h1>
    <searchcomponent 
    :searchmeetups="searchmeetups" 
    v-on:parametros="getAllMeetups" 
    v-on:data="showMeetupsDetail"
     v-on:indexShowComment="showMeetupComments" />

     <!-- Modal With Search Detail Information -->

    <div v-show="seeModal" class="containerModalBox">
           <div class="searchModalBox">
                <div class="images">
                  <p class="meetup-search-image image1"><img :src="meetup_principal_image"></p>
                  <p class="meetup-search-image image2"><img :src="meetup_second_image"></p>
                  <p class="meetup-search-image image3"><img :src="meetup_third_image"></p>
                </div>
                <div class="more-information">
                  <h3>Meetup Information</h3>
                  <p class="type-text"><span>Activity</span>{{ title }}</p>
                  <p class="type-text"><span>Date</span>{{ date | formatDate}}</p>
                  <p class="type-text"><span>Hour</span>{{ time }}</p>
                  <p class="type-text"><span>Duration</span>{{duration | durationFilter}}</p>
                  <p class="type-text"><span>Price</span>{{ meetup_price | priceFilter}}</p>
                  <p class="type-text"><span>Location</span>{{ location }}</p>
                  <p class="type-text"><span>Category</span>{{ category }}</p>
                  <span>Description</span>
                  <p class="description">{{ description }}</p>

                  <span>Total {{ avg_rating.media }} / Number of Votes {{ avg_rating.votes_number }} </span>
                 
                </div>
                <div class="buttons-and-description">  
                  <div class = "button-search">
                    <button title="Reserve your Meetup" @click="makeAReservation()" v-show="logged"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','plus-square']" size="2x" /></router-link></button>
                    <button title = "View Comments or Updates of Meetup " @click="showMeetupComments()"><fa-icon :icon="['fas','comments']" size="2x" /></button>
                    <button title = "View AVG rating " @click="viewRating()"><fa-icon :icon="['fas','star']" size="2x" /></button>
                    <button title = "Close the Detail" @click="seeModal =! seeModal"><fa-icon :icon="['fas','times']" size="2x" /></button>
                  </div>
                </div>
            </div>
       </div>

       <!--Modal to see the comments of Meetups -->

          <div v-show="seeModalMeetupsComments" class="containerModalBox">
            <div class="commentsModalBox">
               <h3>MeetupComments</h3>
              <ul class="comment-list">
                <li v-for="comment in comments" :key="comment.id">
                    <div class="data-comment">
                        <p class="comment-text"><span>Comment</span>{{ comment.comment }}</p>
                        <p class="comment-text"><span>Date</span>{{ comment.date | formatDate}}</p>
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

import { isLoggedIn } from '@/api/utils'
import Swal from 'sweetalert2'
import moment from 'moment';
moment.locale('es');
import axios from "axios";
import { format, addMinutes } from "date-fns";
import es from "date-fns/locale/es";
import {reservationsuccessmodal, reservationerrormodal, noRatingsForMeetup,noComments} from '@/utilities/sweetalert-modals'
import searchcomponent from "@/components/Filter/Search.vue";
import { noSearchs } from "@/utilities/sweetalert-modals"
import { getAuthToken } from '@/api/utils';
export default {
  name: "AdvancedSearchView",
  components: {
    searchcomponent,
  },

   filters: {
        formatDate(value) {
          if (value === null) { return "---"; }
          let myDate = moment(value);
          return myDate.format('DD/MM/YYYY ');
        },

         durationFilter(value) {
          if (value === null) { return "---"; }
          return value + ' hour';
        },

         priceFilter(value) {

          if (value === null) { return "---"; }
          if (value === 0){
            return 'FREE'
          }
          else{
             return value + ' €';
          }

  
        }
    },

  data() {
    return {
        searchmeetups:[],
        id:"",
        title:"",
        date:"",
        time:"",
        duration:"",
        location:"",
        category:"",
        comments:[],
        meetup_principal_image:"",
        meetup_second_image:"",
        meetup_third_image:"",
        meetup_price:"",
        description:"",
        avg_rating:"",
        list_meetups:"false",
        seeModal:false,
        seeModalMeetupsComments:false,
        logged:false
    };
  },

  methods: {

    async getAllMeetups(info) {
    try{
      const response = await axios 
        .get("http://localhost:8888/meetups/filter", {
          headers: {
            Authorization: `${getAuthToken()}`,
          },
          params: {
            location: info.location,
            duration:info.duration,
            category: info.category,
            date: info.date,
            timezone : info.timezone,
            dateyear:info.dateyear,
            price: info.price,
          },
        })
        if(response.data == ""){
            noSearchs()
          }
          this.searchmeetups = response.data;
        }catch(error) {
          noSearchs()
        }
    },

     showMeetupsDetail(dataMeetup){

        this.id = dataMeetup.id;
        this.title = dataMeetup.title
        this.date = dataMeetup.date
        this.time = dataMeetup.time;
        this.duration = dataMeetup.duration;
        this.location = dataMeetup.location;
        this.category = dataMeetup.category;
        this.meetup_principal_image = dataMeetup.meetup_principal_image;
        this.meetup_second_image= dataMeetup.meetup_second_image;
        this.meetup_third_image = dataMeetup.meetup_third_image;
        this.meetup_price = dataMeetup.meetup_price;
        this.description = dataMeetup.description;
        this.viewRating();
        this.seeModal = true;
        
    },

    async makeAReservation() {
      try{
        await axios.post("http://localhost:8888/reservations/" + this.id ,{ 
          },{
             headers: {
              Authorization: getAuthToken()
            },  

          })
          }catch(error) {
            console.log(error)
          }
          reservationsuccessmodal()
    },

    async viewRating() {
      const id = this.id
      try{
        const response = await axios.get("http://localhost:8888/ratings/avg/" + id, {
        })
    
        if (response.data.data.media === 0) {
           Swal.fire({
            icon: "error",
            title: "No comments found",
            text: "No results were found for this meetup",
           });
        }
 
        this.avg_rating = response.data.data;
      }catch(error) {
          console.log(error);
      };
    },

    async showMeetupComments(){
      try{
        const response = await axios.get("http://localhost:8888/comments/" + this.id,{
        })
       
        if (this.comments === undefined){
          noComments()
        }
        else{
        this.comments = response.data.data;
        }
        
        }catch(error){
            console.log(error);
        }
     this.seeModalMeetupsComments = true;
    },

      getLogin(){
      this.logged = isLoggedIn()
    }
  },
  created(){
    this.getLogin()
  }


};
</script>

<style scoped>

.containerModalBox {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  background:rgb(0,0,0,0.5)
}

.searchModalBox{
  display:flex;
  justify-content:space-around;
  background-color:#fff;
  margin:5% auto;
  padding: 3rem;
  width:70%;
  border:3px solid #00a896;
  border-radius:12px;

}

.commentsModalBox{
  display:flex;
  justify-content:space-around;
  background-color:#fff;
  margin:10% auto;
  padding: 3rem;
  width:70%;
  border:3px solid #00a896;
  border-radius:12px;

}

h3{
  color:#00a896;
}

span{

  font-size: 18px;
  font-style: italic;
  margin-right:2rem;
}


.images{
  display:flex;
  flex-direction: column;
}



.more-information{
  display:flex;
  width:60%;
  align-items:center;
  flex-direction: column;
  margin-top:0.5rem;
  margin-bottom:1rem;
}

img{
  width: 18rem;
  height: 10rem;
  margin-right:2rem;
  border:6px solid #00a896;
  border-radius:1rem;
}

button {
  border-radius:20px; 
  width:8rem;
  height:2.5rem;
  margin-right:0.5rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
  margin-bottom:1rem;
  margin-top:2rem;


}

button a {
  color:#fff;
}

.modalbox-buttons{
  margin-top:1.5rem;
}
button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color:#00a896;
  font-weight: bold;
  cursor:pointer;
}

.text{
  width:50%;
  border-radius:20rem;
  height:1.5rem;
  border:3px solid #00a896;  
  text-align:center;
  font-size:17px;
}

.buttons-and-description{
  position:relative;
  width:40%;
  margin-top:20%; 
  /* margin:1.5rem; */
}

.button-search{
  display:flex;
  align-items:center;
  /* flex-direction: column; */
}

.textarea{
  width:100%;
  border: 3px solid #00a896;
  height:4rem;
}
li {
  list-style: none;
}

h1 {
  padding-top: 2rem;
}

.description{
  text-align:justify
}


 /* Media Queries */


 @media only screen and (max-width: 400px) { 

   /* Information Modal Changes */

   .image1{
     display:none;
   }

   .image2{
     display:none;
   }

   

   div.modalBox{
     display:flex;
     flex-direction: column;
     background:#fff;
     margin:2% auto;
     padding:1.5rem;
     width:70%;
     border:3px solid #00a896;
     border-radius:12px;
   }

   .div.images{
     display:flex
   }

   img{
     width:15rem;
     height:10rem;
     border: 4px solid #00a896;
     border-radius:2rem;
   }

   div.more-information{
     display:flex;
     align-items:center;
     flex-direction:column;
     margin-top:0.5rem;
     margin-bottom:1rem;
     width:auto;
   }

   .text{
     border-radius:20rem;
     height:1.5rem;
     border:3px solid #00a896;
     font-size:15px;
     width:15rem;
     margin-bottom:0.7rem;
   }

   span{
     font-size:18px;
     font-style:italic;
   }

  .button-search{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .buttons-and-description{
    margin-top:2% 2% 5% 2%;
    align-items: center
    
  }

  button{
    margin-top:-3rem;
    margin-right:3.5rem;
    width:auto;
  }

}


 @media only screen and (min-width: 768px) { 

   .text{
     width:20rem;
     border-radius:20rem;
     height:1.5rem;
     border: 3px solid #00a896;
     text-align:center;
     font-size:17px;
     margin-bottom:1.5rem;
   }

   .modalBox{
     margin-left:4%;
     width:60%;

   }

   .button-search{
     display:flex;
     align-items:center;
     flex-direction: column;
   }

   .more-information{
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin-top:0.5rem;
    margin-bottom:1rem;
    padding:1rem;
    border:3px solid #00a896;
    width:auto;
    margin:1rem;
    align-items:center;
    border-radius:2rem
   }

   .searchModalBox{
     margin:2% auto;
   }

 }



@media only screen and (min-width: 1000px) { 

  .meetup-information{
    display:flex;
  }

  ul.meetups-list{
    display:flex;
    margin-left:0;

  }

  div.meetups-data{
    margin-left:auto;
    margin-right:auto;
    align-items:center;
    background-color:#fff;
    border-radius:2rem;
    border:3px solid #00a896;
    display:flex;
    flex-direction: column;
    width:30rem;
    flex-wrap:wrap;

  }



}


</style>




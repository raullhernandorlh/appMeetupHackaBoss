<template>
    <div>
      <!-- <h2>Organizer Meetups</h2> -->
        <div class="meetups">
                    <div class="meetup-data">
                        <p class="user-text"><span>Title </span>{{ meetup.title }}</p>
                        <p class="user-text"><span>Date</span>{{ formatDateToDb(meetup.date)  }}</p>
                        <p class="user-text"><span>Time </span>{{ meetup.time}}</p>
                        <p class="user-text"><span>Duration</span>{{ meetup.duration}}</p>
                        <p class="user-text"><span>Location</span>{{ meetup.location}}</p>
                        <p class="user-text"><span>Category</span>{{ meetup.category}}</p>
                       
                        <div class="buttons">
                            <button  title="Delete Meetup" @click="sendMeetupIndex(meetup.id)"><fa-icon :icon="['fas','trash-alt']" size="2x" /></button>
                            <button title ="Show Comments Of Meetup" @click="sendMeetupShowCommentIndex(meetup.id)"><fa-icon :icon="['fas','comments']" size="2x" /></button>
                            <button  title = "Add Comment" @click="openModal(meetup.id)"><fa-icon :icon="['fas','comment']" size="2x" /></button>
                            <button title = "Meetup Info" @click="sendDataMeetup(meetup)"><fa-icon :icon="['fas','info-circle']" size="2x" /></button>
                        </div>
                    </div>
            <button  title ="Return to Profile" class="return"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
         </div>

          <!-- Modal para Comentario -->
         <div v-show="seeModalComment" class="organizerModalBox">
            <div class="commentModalBox">
              <h3>Comments and Updates</h3>
                <textarea class="textarea" type ="textarea" v-model="comment" placeholder="Insert a comment or update to Meetup"  />
                <div class = "button-comment">
                  <button class="comment-buttons" @click="seeModalComment =! seeModalComment"><fa-icon :icon="['fas','times']" size="2x" /></button>
                  <button class="comment-buttons" @click="addMeetupComments()"><fa-icon :icon="['fas','comment']" size="2x" /></button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { format, addMinutes } from "date-fns";
import Swal from "sweetalert2"
import es from "date-fns/locale/es";
import moment from 'moment'
import axios  from 'axios'
import spinner from '@/components/Spinner.vue'
import { getAuthToken } from "@/api/utils.js";
export default {
    name:"OrganizerMeetupPanel",
    data(){
        return{
            comment:"",
            meetupId:"",
            seeModalComment :false,
        }
    },

  
    props:{
        meetup:{type:Object,required :true}
    },
    methods:{


        // Show Meetups Comment
        sendMeetupShowCommentIndex(meetupId){
            let meetupShowCommentIndex = meetupId;
            this.$emit('indexShowComment',meetupShowCommentIndex);
        },

        // Delete
        sendMeetupIndex(meetupId){
            let meetupIndex = meetupId
            this.$emit('index',meetupIndex)
        },

        //Edit
        sendDataMeetup(meetup){
            let dataMeetup = this.meetup
            this.$emit('data',dataMeetup)
        },


        // Modal para realizar añadir el comentarios

        // Abrir el Modal
            openModal(meetupId) {
            this.seeModalComment = true;
             this.meetupId = meetupId;
            },

         // Metodo para agregar comentarios

        async addMeetupComments(meetupIndexForComment){
          const comment = this.comment;
          const meetupId = this.meetupId;
          const todayDate = moment().format("YYYY-MM-DD");
          const todayTime = moment().format("hh:mm:ss");
          const idMeetup = Number(meetupIndexForComment);
         
         try{
            const response = await axios.post("http://localhost:8888/comments/" + meetupId ,{
              comment:comment,
              date:todayDate,
              time:todayTime
            },
            {
              headers:{
                Authorization:`${getAuthToken()}`
              }
            })


             Swal.fire({
               icon: "success",
               title: "Meetup Updated",
               text: "The Meetup has been updated!",
              });
              setTimeout(function(){location.reload()},2000);
                
          }catch(error){
            console.log(error)
          }

        },
      
    formatDateToDb(date) {
      let internalDate;
      if (typeof date === "string") {
        internalDate = new Date(date);
      } else {
        internalDate = date;
      }
      const adjustedDate = addMinutes(
        internalDate,
        internalDate.getTimezoneOffset()
      );
       return format(adjustedDate, "dd-MM-yyyy p", { locale: es });
    },
      
  },

    
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



li{
    list-style:none;
    margin-bottom:7rem
}

.return a {
    color:#fff;
}
.return{
    position:absolute;
    top:85%;
    margin:1.5rem;
    right:0;
    width:5rem;
    height:2.5rem;
    border-radius:4rem;
    border:3px solid #fff;
    background-color: #00a896;
    cursor:pointer;
}

meetups-list{
    display:flex;
    width:90%;
    justify-content:space-around;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5rem;
}

.meetup-data{
    border:3px solid #00a896;
    margin-left: auto;
    margin-right:auto;
    padding:1rem;
    margin-bottom:3rem;
    background-color:#fff;
    max-width:80%;
    border-radius:2rem;

}


.meetups{
    margin-top:5rem;
}

.buttons button{
  width:8rem;
  height:2.5rem;
  border-radius:4rem;
  border:3px solid white;
  background-color: #00a896;
  cursor:pointer;
}

.buttons button{
  width:8rem;
  height:2.5rem;
  color:#fff;
  border-radius:4rem;
  border:3px solid #fff;
  background-color: #00a896;
  cursor:pointer;
}

.buttons button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color: #00a896
}

span{
    margin-right:1rem;
    text-transform: uppercase;
}


ul.meetups-list{
  display:flex;
  justify-content:space-around;
  margin-top:5%;
  flex-wrap: wrap;
}

.textarea{
  resize:none;
  width:25rem;
  height:5rem;
  border:3px solid #00a896;
}

.comment-buttons{
  margin-top:1rem;
  color:#fff;
  width:8rem;
  height:2.5rem;
  border-radius:4rem;
  border:3px solid white;
  background-color: #00a896;
  cursor:pointer;
}

.comment-buttons:hover{
  border:3px solid #00a896;
  background-color: #fff;
  color: #00a896
}




</style>
<template>
    <div class="reservations">
      <article>
      
      <div class="user-reservations" >

                <h3>Meetup Resume </h3>
                    <p class="user-text">{{ reservation.title}}</p>
                    <p class="user-text"><span> Date</span>{{reservation.date | mydate}}</p>
                    <p class="user-text"><span>  Hour</span>{{ reservation.time}}</p>

                    <h3>Reservation Resume</h3>
                    <p class="user-text"><span> Date</span>{{ reservation.reservation_date | mydateandhour}}</p>
                    <p class="user-text"><span>Price</span>{{ reservation.reservation_price | priceFilter}}</p>
                    <span>Total {{ avg_rating.media }} / Number of Votes {{ avg_rating.votes_number }} </span>
                    
                     <p v-if="reservation.paid_out == 0">NOT PAID</p>
                    
                    <div class="buttons">
                        <button title="Delete a Reservation" @click="sendReservationIndex(reservation.id)"><fa-icon :icon="['fas','trash-alt']" size="2x" /></button>
                        <button title=" Rate The Meetup" @click="openModal(reservation.date,reservation.id)"><fa-icon :icon="['fas','star']" size="2x" /></button>
                        <button title="Avg Rating" @click="avgRating(reservation.id)"><fa-icon :icon="['fas','smile']" size="2x" /></button>
                        <button title = "Meetup Information" @click="sendDataReservation(reservation)"><fa-icon :icon="['fas','info-circle']" size="2x" /></button>
                         <!-- Enviando el id a Payment para sacar los datos de la reserva -->
                         <button @click="paymentDetail(reservation.id)" v-if="reservation.paid_out == 1">Ticket</button>
                         <router-link :to="{name:'Payment',params: {id:reservation.id }}">
                         <button :class="{disable_button: reservation.paid_out != notPay}"><fa-icon :icon="['fas','shopping-cart']" size="2x" /></button>
                         </router-link>
                    </div>
              </div>
      </article>
    
            <button title="Return to Organizer Menu" class="return"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
    
    <!-- Make a Valoration Modal -->
    <div v-show="seeValorationModal" class="modalContainer">
      <div class="modalBoxValoration">
        <h3>Introduce Your Valoration</h3>
        <input type="number" class="valoration-input" v-model="valoration" />
        <div class= "limitValoration" v-if="valoration > 5"> The valoration must be between 0 and 5 </div>
         <div class="valorationButton" v-else>
          <button @click=" insertRating()">Make Valoration</button>
          <button @click="seeValorationModal =! seeValorationModal"><fa-icon :icon="['fas','times']" size="2x" /></button>
        </div>
      </div>
    </div>

    <!-- Payment Receipt Modal -->

    <div v-show="seeTicketPaymentModal" class="modalContainer">
      <div class="modalBoxPayment">
        <h3>Payment Ticket </h3>
          <p class="user-text"><span class="ticketSpan"> Meetup Name</span>{{payment_detail.meetup_name}}</p>
          <p class="user-text"><span class="ticketSpan"> Meetup Price</span>{{ payment_detail.reservation_price | priceFilter}}</p>
          <p class="user-text"><span class="ticketSpan"> Payment Time</span>{{ payment_detail.date | mydate}}</p>
          <p class="user-text"><span class="ticketSpan"> Payment Hour</span>{{ payment_detail.time}}</p>
        <button @click="seeTicketPaymentModal =! seeTicketPaymentModal"><fa-icon :icon="['fas','times']" size="2x" /></button>
      </div>
    </div>


  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios"
import moment from "moment"
import { getAuthToken } from "@/api/utils.js";

export default {
    name:"OrganizerReservation",

     filters: {
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

      props:{
      reservation:{type:Object,required :true}
    },

    data(){
        return{
            payment_detail:[],
            paid_out:"",
            notPay:0,
            id:null,
            avg_rating:"",
            valoration:"",
            seeValorationModal:false,
            seeTicketPaymentModal:false,
            meetupId:"",
            meetupDate:"",
            reservationDate:"",
            reservationId:""
        }
    },

    methods:{


        // Enviando el index de la reserva
        sendReservationIndex(reservationId){
            let reservationIndex = reservationId
            this.$emit('indexReservation',reservationIndex)
        },

        // Eviando todos los datos de la Reserva
        sendDataReservation(reservation){
            let dataReservation = this.reservation
            this.$emit('reservationData',dataReservation)
        },

    async insertRating() {
       const meetupDate = this.meetupDate;
       const meetupId = this.meetupId;
      try {
        const response = await axios.post(
          `http://localhost:8888/ratings/${meetupId}`,
          {
            valoration: this.valoration,
            meetup_date: meetupDate,
          },
          {
            headers: {
              Authorization: `${getAuthToken()}`,
          },
        });

         Swal.fire({
              icon: "success",
              title: "Rating added",
              text: " Rating was added successfully",
         }); setTimeout(function(){location.reload()},2000);


        // this.searchmeetups = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

     async avgRating(ratingIndex) {
       try{
          const response =  await axios.get(
            "http://localhost:8888/ratings/avg/" + ratingIndex, {
                headers: {
                  Authorization: getAuthToken(),
                },
                
           })

        if (response.data.data.media === null) {
            // noRatingsForMeetup();
          }
          this.avg_rating = response.data.data;
        
        }catch(error) {
          console.log(error);
        }
      },

      async paymentDetail(meetupId){
        this.seeTicketPaymentModal=true;
        try{
          const response = await axios.get(`http://localhost:8888/payments/${meetupId}`, {
            headers: {
              Authorization: getAuthToken(),
           },
          
        })
        
        this.payment_detail = response.data.data[0]
        }catch(error){
          console.log(error)
        }
      },
      

    openModal(meetupDate, meetupId) {
      this.seeValorationModal = true;
      this.meetupDate = meetupDate;
      this.meetupId = meetupId;
    },

  },

  created (){
    this.avgRating(this.reservation.id)
  }

}
</script>



<style scoped>

/* Center and position modal */

.modalContainer {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  background:rgb(0,0,0,0.5)
}

/* Valoration Modal Class */

.modalBoxValoration{
  display:flex;
  flex-direction: column;
  align-items:center;
  background-color:#fff;
  margin:10% auto;
  padding: 3rem;
  width:45%;
  border:3px solid #00a896;
  border-radius:12px;

}

/* Payment Modal Class */
.modalBoxPayment{
  display:flex;
  flex-direction: column;
  align-items:center;
  background-color:#fff;  
  margin:10% auto;
  padding: 3rem;
  width:30%;
  border:8px solid #00a896;
  border-radius:16px;
  font-family:'Helvetica';
  font-size:1rem;
  transform: rotate(-5deg);


}

.valoration-input{
  border-radius:8rem;
  border: 3px solid #00a896;
  height: 1.2rem;

}

/* Reservation Object Style */
.reservations {
  display: flex;
  align-items: center;
  margin-top:4rem;
  margin-bottom:7rem;
}

.user-reservations{
  display: flex;
  flex-direction:column;
  width: 80%;
  max-width:30rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  background-color:#fff;
  border:3px solid #00a896;
  border-radius:3rem;
}


span{
 margin-right:1.5rem;
}


button{
    width: 7rem;
    height:2.5rem;
    margin:0.5rem;
    border-radius:20rem;
    border: 3px solid #fff;
    background-color:#00a896;
    color:white;
    cursor:pointer;
}

button:hover{
    border: 3px solid #00a896;
    background-color:#fff;
    color:#00a896;

}

.return{
    
   position:absolute;
   right:0;
   top:85%;
   width:5rem;
}

button a{
    text-decoration:none;
    color:#fff;
}

button a:hover{
    color:#00a896
}

.disable_button{
  visibility:hidden;
}

h2{
  margin-top:4rem;
}

.valorationButton{
  display:flex;
  margin:0.5rem
}

.valorationButton button{
  width:8rem;
}

.limitValoration{
  color:red;
  margin-top:0.2rem;

}

.ticketSpan{
  font-style: oblique;
  text-transform: uppercase;
  color:#00a896;
}

</style>
<template>
  <div class="organizer-reservations">
    <vue-headful title=" Organizer Reservations Panel" />
    <spinner v-show="loading_spinner" />
    <h2>Organizer Reservations</h2>
    <ul>
      <li v-for="organizerreservation in organizerreservations" :key="organizerreservation.id">
        <organizerreservations
          :reservation="organizerreservation"
          v-on:indexReservation="deleteReservations"
          v-on:reservationData="showReservationsDetail"
        />
      </li>
    </ul>
    <div v-if="organizerreservations.length === 0">
      You do not have any real reservations. Click on the following link to go to the search engine and be able to book a meetup
      <router-link :to="{name: 'Search'}">Go To Meetups Search</router-link>
    </div>
    <div v-else class="organizer-reservations">
      <div v-show="seeModal" class="modal">
        <div class="modalBox">
          <div class="column1">
            <span>Meetup Title</span>
            <input type="text" class="text" v-model="title" readonly="readonly"/>
            <p><img :src="meetup_principal_image" /></p>
            <span>Description</span><textarea type="textarea" class="textarea" v-model="description" readonly="readonly" />
          </div>
          <div class="column2">
            <span>Meetup Duration</span>
            <input @change="duration= $event.target.value" type="text" class="text" :value="reservationDurationFormatted" readonly="readonly" />
            <span>Meetup Location</span>
            <input type="text" class="text" v-model="location" readonly="readonly" />
            <span>Reservation Date</span>
            <input type="text" class="text" @change="reservation_date= $event.target.value"  :value="reservationDateFormatted" readonly="readonly" />
            <span>Reservation Price</span>
            <input type="text" class="text" @change="reservation_price=$event.target.value" :value="reservationPriceFormatted" readonly="readonly" />
            <span>Paid Out</span>
            <input type="text" class="text" @change="paid_out=$event.target.value"  :value="reservationPaidOutFormatted" readonly="readonly" />
            <div class="modalbox-button">
              <button class="button" @click="seeModal =! seeModal">
                <fa-icon :icon="['fas','times']" size="2x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Swal from 'sweetalert2';
import { getAuthToken } from "@/api/utils.js";
// Import de la libreria axios
import axios from "axios";

import organizerreservations from "@/components/Reservation/OrganizerReservation.vue";

// Importamos el componente " Spinner" para poder relacionarlo con la vista "Home"

import spinner from "@/components/Spinner.vue";

import moment from "moment";

export default {
  name: "OrganizerReservationsView",

  components: {
    organizerreservations,
    spinner,
  },

  data() {
    return {
      organizerreservations: [],
      id: "",
      idMeetup: "",
      title: "",
      meetup_principal_image: "",
      description: "",
      duration: "",
      location: "",
      reservation_date: "",
      reservation_price: "",
      dataForRating: "",
      paid_out: "",
      loading_spinner: false,
      list_reservations: "false",
      seeModal: false,
    };
  },

  computed:{

    reservationDurationFormatted(){
      return this.duration + ' hours';
    },


    reservationDateFormatted() {
     return moment(this.reservation_date).format("YYYY-MM-DD");
    
   },

    reservationPriceFormatted() {
      if(this.reservation_price === 0){
        return 'FREE'
      }
      else{
         return this.reservation_price + ' €'; 
      }
      
    },
    
    reservationPaidOutFormatted(){
        if(this.paid_out === 0){
          return "NOT PAID"
        }
        else{
          return"PAID"
        }
    }
},

  methods: {
    activatespinner() {
      setTimeout(() => {
        this.loading_spinner = false;
        this.list_reservations = true;
      }, 1000);
    },

    //Metodo para actualizar Meetups

    // Metodo para BORRAR las reservas de la base de datos
    async deleteReservations(reservationIndex) {

      let userresponse = await Swal.fire({
        title: 'Are you sure?',
        text: "The Meetup is going to delete",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#2D7A39',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,  The Reservation was deleted!'
      })

    try{
        const response = await axios
        .delete("http://localhost:8888/reservations/" + reservationIndex, {
            headers: {
              Authorization: getAuthToken(),
            },
          })
          
      Swal.fire(
        'Delete!',
        'Your meetup has been deleted.',
         'Delete'
      )

      this.getOrganizerReservations();
      
      }catch(error) {
        console.log(error)
      };
    },

    // Metodo para  MOSTRAR el detalle de las reservas

    showReservationsDetail(dataReservation) {
      this.title = dataReservation.title;
      this.meetup_principal_image = dataReservation.meetup_principal_image;
      this.description = dataReservation.description;
      this.duration = dataReservation.duration;
      this.location = dataReservation.location;
      this.reservation_date = dataReservation.reservation_date;
      this.reservation_price = dataReservation.reservation_price;
      this.paid_out = dataReservation.paid_out;
      this.seeModal = true;
    },

    //Metodo para OBTENER las Reservas de la base de datos

    async getOrganizerReservations(reservationIndex) {
      try{
      //LLamada de axios para obtner los clientes de la BBDDD
      const response = await axios
        .get("http://localhost:8888/reservations/organizerreservations/", {
          headers: {
            Authorization: `${getAuthToken()}`,
          },
        })
      this.organizerreservations = response.data.data;

      }catch( error) {
          console.log(error);
        };
    },
  },
  created() {
    this.getOrganizerReservations();
  },

  // Hook "mounted". Utilizado para ejecutar el spinner una vez la app ya esta montada
  mounted() {
    this.activatespinner();
  },
};
</script>

<style scoped>
/* Center and position modal */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgb(0, 0, 0, 0.5);
}

.modalBox {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin: 10% auto;
  padding: 3rem;
  width: 60%;
  border: 3px solid #00a896;
  border-radius: 12px;
}

.modalbox-button {
  margin-top: 3rem;
}
/* Dividing the modal */

.column1 {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
}

.column2 {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
}

.title {
  margin-top: 5rem;
  margin-bottom: 1rem;
}

img {
  width: 15rem;
  height: 15rem;
  margin: 1rem;
  border: 3px solid #00a896;
}

span {
  margin-bottom: 1rem;
}

.text {
  display: flex;
  text-align: center;
  height: 1.5rem;
  border: 3px solid #00a896;
  border-radius: 20rem;
  margin-bottom: 1rem;
  width: 60%;
}

.textarea {
  text-align: justify;
  align-items: center;
  height: 5rem;
  border: 3px solid #00a896;
  margin-bottom: 1rem;
  width: 70%;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  border-radius: 20px;
  width: 10rem;
  height: 2rem;
  color: #fff;
  text-decoration: none;
  border: 3px solid white;
  background-color: #00a896;
}

.button:hover {
  border: 3px solid #00a896;
  background-color: #fff;
  cursor: pointer;
}

li {
  list-style: none;
}

ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>

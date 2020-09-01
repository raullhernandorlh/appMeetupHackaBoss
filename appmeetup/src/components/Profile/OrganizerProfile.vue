<template>
     <div class="organizer-profile">
        <div class="organizer-profile-data">
          <p class="user-text"><span>Organizer Name</span>{{organizerprofile.organizer_name }}</p>
          <p class="user-text"> <span>Organizer Autonomous Community</span>{{ organizerprofile.organizer_autonomous_community }}</p>
          <p class="user-text"><span>Organizer Province</span>{{ organizerprofile.organizer_province}}</p>
          <p class="user-text"><span>Organizer City</span>{{ organizerprofile.organizer_city}}</p>
          <p class="user-text"><span>Description</span>{{ organizerprofile.organizer_description}}</p>
        </div>
        <div class="buttons">
          <button @click="sendOrganizerProfileData()">Organizer Details</button>
          <button title="Return to Profile" class="submit"><router-link :to='{name:"UserProfile"}'><fa-icon :icon="['fas','step-backward']" size="2x" /></router-link></button>
        </div>
  </div>

</template>
<script>
export default {
  name: "OrganizerProfile",
  props: {
     organizerprofile: Object,
  },
  methods: {
    sendOrganizerProfileData(index) {
      this.$emit("data", this.organizerprofile);
    }
  }
}
</script>




<style scoped>
li {
  list-style: none;
  display:flex;
  flex-direction: column;
  align-items:center;
}


.organizer-profile{
  display:flex;
  flex-direction: column;
  align-items:center;
}

.organizer-profile-data{
  display:flex;
  padding:3rem;
  flex-direction: column;
  align-items:center;
  border-radius: 6rem;
  width:40%;
  border:6px outset #00a896;
    background-color:#fff;
}

.buttons{
  display:flex;
  margin-top:2rem;
  justify-content:space-evenly;
}

.buttons button{
  width:10rem;
  height:2.5rem;
  border-radius:4rem;
  color:#fff;
  border:3px solid white;
  margin-right:0.5rem;
  background-color: #00a896;
  cursor:pointer;
}



button a{
  text-decoration:none;
  color:#fff;
}
button a:hover {
  color:#00a896;
  
}

button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896 ;

}

span{
  margin-right:1rem;
  text-transform: uppercase;
}

.user-text{
  margin-bottom:1.5rem;
  
}

button.submit{
  width:5rem;
}
</style>
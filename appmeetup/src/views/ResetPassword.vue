<template>
    <div class="reset">
        <h3>Reset Password</h3>
        <p>Please enter the registration code that was sent to you in the registration email and a new password to reset your password</p>
        <span>Registration Code</span><input type="password" class="text" v-model="registrationcode" /> 
        <span>New Password</span><input type="password" class="text " v-model="newpassword" />
        <button @click= "resetPassword()">Reset Password</button>
    </div>

</template>


<script>

import axios from 'axios'
export default{
    user:"ResetPasword",
    data(){
        return{
            registrationcode:"",
            newpassword:""
        }
    },

    methods: {
        resetPassword(){
        var self=this;
          axios
          .post("http://localhost:8888/users/reset", {
            registrationcode: self.first_name,
            newpassword:self.newpassword
          })
          .then(function (response) {
          })
          .catch(function (error) {
            
          });

        }
    }
}

</script>




<style scope>

.reset {
  display:flex;
  flex-direction: column;
  margin-top:10%;
  width:65%;
  margin-right:auto;
  margin-left:auto;
  justify-content:center;
  align-items:center;
  background-color:#fff;
  padding:2rem;
  border-radius:4rem;
  border:3px solid #00A896;
}

.text{
    border-radius:8rem;
    border:3px solid #00A896;
    width:12rem;
    height:1.5rem;
    margin-bottom:0.5rem;
    text-align:center;
}
span{
    margin:0.5rem;
}

button{
    width:7rem;
    height:2.5rem;
    background-color:#00A896;
    border-radius:8rem;
    border:3px solid #fff;
    color:#fff;
    cursor:pointer;
}

button a{
    text-decoration: none;
    color:#fff;
}
button:hover {
  background-color:#fff;
  color:#00A896;
  border-radius:8rem;
  border:3px solid #00A896;

}




</style>



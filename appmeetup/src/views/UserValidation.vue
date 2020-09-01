<template>
    <div class="validation">
        <h3>User validation page</h3>
        <p>Click the following button to proceed with its validation and be redirected to the login to proceed to log in with your account</p>
        <button><router-link :to='{name:"Login"}'>User Validation</router-link></button>
    </div>



</template>


<script>

export default{
    name:"UserValidation"
}

</script>




<style scope>

.validation {
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




<template>
  <!-- Vista "Error" utilizada para mostrar el error cuando la no existe la pagina. La ruta no esta
  establecida en "router"-->
  <div>
    <vue-headful title="Error" />
    <div class="error">
      <h2>Error 404 . The link does not exist</h2>
      <img alt="Error 404" src="../assets/error404/error-404-page.jpg"  />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped>
.error {
  display:flex;
  flex-direction: column;
  align-items: center;
  margin-top:15rem;
}

img{
    border:9px outset #40916c;
    height:70%;
    width:80%

}


@media only screen and (min-width: 600px) { 

.error {
  margin-top:5rem;
  align-items: center;
  }
}

@media only screen and (min-width: 824px) { 

.error {
  width:90%;
  margin-left:7%;
  }
}


@media only screen and (min-width: 1000px) { 

.error {
  width:80%;
  height:70%;
  margin-left:9%;
  }
}



</style>
<template>
  <div>
    <div class="container">
      <ul class="slider">
        <li id="meetupPhoto1">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
        </li>
        <li id="meetupPhoto2">
          <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
        </li>
        <li id="meetupPhoto3">
          <img src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" />
        </li>
      </ul>

      <ul class="menu">
        <li>
          <a href="#meetupPhoto1">1</a>
        </li>
        <li>
          <a href="#meetupPhoto2">2</a>
        </li>
        <li>
          <a href="#meetupPhoto3">3</a>
        </li>
      </ul>
    </div>
    <div class="search-meetups">
      <h2>SEARCH OUR MEETUPS</h2>
      <router-link class="button" :to='{name:"Search"}'><fa-icon :icon="['fas','search']" size="2x" /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
body{
  background-color: lightgrey;
  font-family: sans-serif;
}

.container{
  margin: auto;
  margin-top:7rem;
  background-color: white;
  width: 80%;
  height:15rem;
  padding: 30px;
}

ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
}

ul.slider{
  position: relative;
  width: 800x;
  height: 300px;
}

ul.slider li {
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    width: inherit;
    height: inherit;
    transition: opacity .5s;

}

ul.slider li img{
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

ul.slider li:first-child {
    opacity: 1; /*Mostramos el primer <li>*/
}

ul.slider li:target {
    opacity: 1; /*Mostramos el <li> del enlace que pulsemos*/
}

.menu{
  text-align: center;
  margin: 20px;
}

.menu li{
  display: inline-block;
  text-align: center;
}

.menu li a{
  display: inline-block;
  color: white;
  text-decoration: none;
  background-color: grey;
  margin-top:-4rem;
  margin-right:1rem;
  padding: 10px;
  width: 1rem;
  height: 1.3rem;
  font-size: 1rem;
  border-radius: 100%;
}

.search-meetups{
  margin-top:45%;
  display:flex;
  flex-direction: column;
  align-items: center; 
}

.button{
  display:flex;
  align-items: center;
  justify-content:center;
  margin-bottom:2rem;
  border-radius:20px;
  width:10rem;
  height:2rem;
  color:#fff;
  text-decoration: none;
  border:3px solid white;
  background-color: #00a896;
}

.button:hover{
  border:3px solid #00a896;
  background-color: #fff;
  cursor:pointer;
}

@media only screen and (min-width: 400px) { 

  .search-meetups{
    margin-top:25%;
  }
}

@media only screen and (min-width: 590px) { 

  .search-meetups{
    margin-top:12%;
  }
}


@media only screen and (min-width: 750px) { 

  .search-meetups{
    margin-top:8%;
  }
}

</style>







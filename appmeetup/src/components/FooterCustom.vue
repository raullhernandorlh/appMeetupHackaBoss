<template>
  <div>
    <footer>
      <p class = "data-information">© Copyright 2020 App Meetup.All rights reserved.<span>ByRaul Lopez Hernando</span></p>
    </footer>
  </div>
</template>


<script>
export default {
    name:"FooterCustom"
}
</script>

<style scoped>

footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #00a896;
  color: #fff;
  text-align: center;
  height:70px;
  font-weight: bold;
  border-top: 0.1rem solid #fff;
}

.data-information{
    padding-top:0.7rem;

}






</style>
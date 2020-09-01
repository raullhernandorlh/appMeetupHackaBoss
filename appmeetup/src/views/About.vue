<template>
<div class="about">
  <body>
    <header class="parallax-completo">
      <div class="texto-boardgame-image1">
        <h2>The Team</h2>
      </div>
    </header>
    <section class="center espacio">
      <h2>Our Story</h2>
      <p>
        Our small company was born in 2017 given the incipient demand for new forms of leisure and communication in today's society
        The world has changed and we, with it and the people, seek to stay among us and have a good time while we exchange our knowledge, concerns, curiosities
        Starting from these premises, "AppMeetup" allows to facilitate an environment in which people can sign up for activities or meetups of all kinds in a safe and controlled environment.
      </p>
    </section>

    <section class="parallax-pequeno"></section>

    <section class="texto">
      <h2>Let's build our world together</h2>
    </section>
    <section class="center espacio">
      <h2>Our values</h2>
      <p>
       Since we decided to set up the company among a few partners, we have always thought that the values that we set that day should remain for the future as a solid base for the business model.
       These values are honesty and transparency between us and with respect to our clients, quality of service, punctuality with respect to periodic updates of the app, teamwork, social responsibility and last but not least,
       cultivate passion for what we do daily
      </p>
    </section>

    <section class="parallax-pequeno"></section>

    <section class="texto">
      <h2>© Copyright 2020 - AppMeetup-</h2>
    </section>
    <section class="parallax-completo">
      <div class="texto-boardgame-image1">
        <h2>App Meetup</h2>
      </div>
    </section>
  </body>
</div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>

*{
    margin:0;
    padding:0;
}

body{
    width:100%;
    font-family: 'Lato';
}

.parallax-completo{
    width:100%;
    height:100vh;
    background-image: url("https://images.unsplash.com/photo-1558698972-c50e325e6799?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display:flex;
    justify-content: center;
    align-items: center;
}

.texto-boardgame-image1{
    background: #111;  
    padding: 18px;
    width: 320px;
    text-align: center;
    color:#fff;
}

h2{
    font-size:32px;
    font-weight: 300;
}

.center{
    max-width: 1100px;
    width: 90%;
    overflow: hidden;
    margin:auto;
}

.espacio{
    padding: 30px 0px 60px 0px;

}

.espacio h2{
    text-align:center;
    padding: 30px;
}

.espacio p{
    text-align: justify;
}

.parallax-pequeno{
    height:450px;
    background-image: url("https://images.unsplash.com/photo-1538688423619-a81d3f23454b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
    background-attachment: fixed;
    background-size: cover;
    background-position:center;
}



.parallax-pequeno h2{
    display:flex;
    height:inherit;
    justify-content:center;
    align-items:center;
    color:#000;
    font-weight: 400;
}

.texto{
    background: #00a896;
    height: 190px;
}

.texto h2{
    text-align:center;
    color:#000;
    display:flex;
    height: inherit;
    justify-content: center;
    align-items: center;
}

</style>
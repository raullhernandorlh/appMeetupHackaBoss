<template>
  <div class="login">
    <vue-headful title="Login" />
    <form class="form">
      <h2>Enter and Enjoy your Time</h2>
      <input v-model="email" type="text" class="text" placeholder="Enter your email" />
      <input v-model="pass" type="password" class="text" placeholder="Enter your password">
      <div v-if="isInvalid" class="invalid-password">Password incorrecto</div>
      <button @click="loginUser">
        <fa-icon :icon="['fas','sign-in-alt']" size="2x" />
      </button>
    </form>
  </div>
</template>

<script>
import { emptyFieldsLogin } from "@/utilities/sweetalert-modals";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      isInvalid : false
    };
  },
  methods: {
    loginUser() {
    
      var self = this;
      this.isInvalid = false;
      if (this.email === "" || this.pass === "") {
       emptyFieldsLogin();
      } else {
        axios
          .post("http://localhost:8888/users/login", {
            email: self.email,
            pass: self.pass,
          })
          
          .then((response) => {
            let token = response.data.token;
            let role = response.data.role;
            let name = response.data.name;
            localStorage.setItem("AUTH_TOKEN_KEY", token);
            localStorage.setItem("TYPE_USER", role);
            localStorage.setItem("NAME", name);

            this.$emit("login");
          })
          .catch(() => {
              this.isInvalid = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  border: 3px solid #fff;
  border-radius: 1rem;
  background-image: url("https://images.unsplash.com/photo-1500771309643-de18b0aea901?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: cover;
  margin-top: 4%;
  min-width: 80%;
}

h2 {
  letter-spacing: 0.3rem;
  margin-top: 2rem;
  color: #00a896;
  margin-bottom: 2rem;
}
label {
  margin-bottom: 0.5rem;
  color: #00a896;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 6px outset #00a896;
  border-radius: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-width: 100px;
  min-height: 50%;
  position: relative;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
}

.text {
  margin-bottom: 0.5rem;
  text-align: center;
  border-radius: 20rem;
  width: 50%;
  height: 2.5rem;
  border: 0.2rem solid #02c39a;
  font-size: 15px;
}

button {
  text-transform: uppercase;
  border: none;
  height: 3.5rem;
  margin-top: 1rem;
  background: #00a896;
  color: #fff;
  padding: 10px;
  width: 30%;
  border-radius: 20rem;
  position: relative;
  box-sizing: border-box;
  transition: all 500ms ease;
  border: 3px solid #fff;
  margin-bottom: 1rem;
}

.invalid-password{
  color:red;
}

button a {
  text-decoration: none;
  color: #fff;
}

/* Cambiar Agrandar */
button:hover {
  animation: scale 2s;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.1);
  }

  80% {
    transform: scale(1.2);
  }
}

/* pointer-events:none; */

@media only screen and (min-width: 400px) {
  .login {
    margin-top: 10rem;
  }
}

@media only screen and (min-width: 600px) {
  .login {
    margin-top: 10rem;
  }
}
</style>
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueHeadful from 'vue-headful'
import Vuelidate from 'vuelidate'
import './icons'
import moment from 'moment'
import { format, addMinutes } from "date-fns";
import es from "date-fns/locale/es";

//Vuelidate - Libreria para validar formularios en Vue'
Vue.use(Vuelidate);
// Vue headful para crear los titulos de las pestañas donde nos encontramos en el proyecto
Vue.component('vue-headful',vueHeadful)

Vue.use(moment)


Vue.filter('mydate', function (date) {

  // moment.locale(es);
  const formatDate = moment().format("YYYY-MM-DD");
  return formatDate
 
})

Vue.filter('mydateandhour', function (date) {
  if (date === null) { return ""; }
  let internalDate;
  if (typeof date === "string") {
    internalDate = new Date(date);
  } else {
    internalDate = date;
  }
  const adjustedDate = addMinutes(
    internalDate,
    internalDate.getTimezoneOffset()
  );
   return format(internalDate, "dd-MM-yyyy  hh:mm", { locale: es });
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import { isLoggedIn } from '../api/utils.js'
import { checkIsAdmin } from '../api/utils.js'
import { checkIsUser } from '../api/utils.js'
import { checkIsOrganizer } from '../api/utils.js'

Vue.use(VueRouter)

// Home habilitado para todos los usuarios

  const routes = [
    //Home
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/Home.vue'),
  
  },

  // Login habilitado para todos los usuarios
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

  // Habilitado para todos los usuarios 
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },

  // Habilitado solo para usuarios organizer ,register y admin

  {
    path: '/userprofile',
    name: 'UserProfile',
    component: () => import('../views/Profile/UserProfileView.vue'),
},

// Organizer Profile
{
    path:'/organizerprofile',
    name: 'OrganizerProfile',
    component: () => import('../views/Profile/OrganizerProfileView.vue')
},


// USER VALIDATION (Page to validate user)

{
  path:'/validationuser',
  name:'ValidationUser',
  component:() => import ('../views/UserValidation.vue')

},

// USER RESET PAGE (Page for reset de Password)

{
  path:'/resetpassword',
  name:'ResetPassword',
  component:() => import ('../views/ResetPassword.vue')

},


// USER RESERVATIONS (ONLY FOR USERS)
  {
    path: '/userreservations',
    name: 'UserReservations',
     component: () => import('../views/Reservations/UserReservationsView.vue'),
     meta:{
       onlyUser:true,
       onlyOrganizer:false,
       onlyAdmin:false,
       allowAnon:false
     },
     beforeEnter: (to,from,next) =>{
      if(to.meta.onlyUser === true && !checkIsUser()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }

  },


  //ADMINISTRATOR PAGE (ONLY FOR ADMINISTRATOR) 

  {
    path:'/administratorpanel',
    name:'AdministratorPanel',
    component:() => import('../views/AdministratorPanel.vue'),
    meta:{
      onlyAdmin: true,
      onlyOrganizer:false,
      onlyUser:false,
      onlyAnon:false
    },
    beforeEnter: (to,from,next) =>{
      if(to.meta.onlyAdmin === true && !checkIsAdmin()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }
  },


  // CREATE A MEETUP (Only for organizer)

  {
    path:'/createmeetup',
    name:'CreateAMeetup',
    component:() => import('../views/OrganizerMeetups/CreateMeetupView.vue'),
    meta:{
      onlyOrganizer: true,
      onlyAnon:false,
      onlyAdmin:false,
      onlyUser:false
    },

    beforeEnter: (to,from,next) =>{
      if(to.meta.onlyOrganizer === true && !checkIsOrganizer()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }
  },


  // ORGANIZER MEETUP PANEL (Only for Organizer)

  {
    path:'/organizermeetuppanel',
    name:'OrganizerMeetupPanel',
    component:() => import('../views/OrganizerMeetups/OrganizerMeetupPanelView.vue'),
     meta:{
    onlyOrganizer: true,
    allowAnon: false,
    onlyAdmin:false,
    onlyUser:false,
    },

    beforeEnter: (to,from,next) =>{
      if(to.meta.onlyOrganizer === true && !checkIsOrganizer()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }
  },




  // ORGANIZER RESERVATIONS (Only for organizers)
  {
    path: '/organizerReservations',
    name: 'OrganizerReservations',
     component: () => import('../views/Reservations/OrganizerReservationsView.vue'),
     meta:{
       onlyOrganizer:true,
       onlyUser:false,
       onlyAdmin:false,
       allowAnon:false
     },
     beforeEnter: (to,from,next) =>{
      if(to.meta.onlyOrganizer === true && !checkIsOrganizer()){
        next({
          path:'/home',
          query: { redirect: to.fullPath }
        })
       }else{
          next()
        }
    }

  },

  // Paymenyts (Pantalla accesible solo para Organizer y User)

  {
    path: '/payment/:id',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
   

  },


  // BUSCAR MEETUP (Accesible para todos incluso no registrados)

  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Filter/AdvancedSearchView.vue'),

  },

  // ABOUT(Acceso para todos incluso no registrados)

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),

  },
  

  //Error Page : Error 404
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  },
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next) =>{
//   // Si la pagina no permite anonimos y no estas logeado
//   if(!to.meta.allowAnon && !isLoggedIn()){
//     next({
//       // A donde redirige 
//       path:'/',
//       query:{redirect:to.fullPath}
//     })
//   }else{
//     next()
//   }
// })

export default router
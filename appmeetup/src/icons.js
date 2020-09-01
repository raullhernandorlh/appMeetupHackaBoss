import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars,faTimes,faSearch, faInfoCircle, faShoppingCart, faTrashAlt, faSmile, faStar, faComment, faUserPlus, faEdit, faComments, faFolderPlus, faStepBackward, faSearchPlus, faPlusSquare, faList, faClipboardList, faUserCircle, faSignInAlt, faArrowAltCircleRight, faArrowAltCircleLeft, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Icons Added in app

// Mobil Menu
library.add(faBars)
library.add(faTimes)
//Search Button
library.add(faSearch)
// Detail or Info Button
library.add(faInfoCircle)
// Buy Meetup Button
library.add(faShoppingCart)
// Delete Button 
library.add(faTrashAlt)
// Addon Rating for Meetup
library.add(faSmile)
// Avg Meetup
library.add(faStar)
// Add a Comment for Meetup
library.add(faComment)
// Adding User To Application
library.add(faUserPlus)
// Edit 
library.add(faEdit)
// Show Comment
library.add(faComments)
//Add Comment
library.add(faComment)
//Add Meetup
library.add(faFolderPlus)
// Go Back Icon
library.add(faStepBackward)
//Advanced Search
library.add(faSearchPlus)
// Add Meetup Search filter
library.add(faPlusSquare)
// List for view de Meetups of Organizer
library.add(faList)
// List for view the reservations
library.add(faClipboardList)

// User Detail Logo
library.add(faUserCircle)

// Icon for Login Button
library.add(faSignInAlt)

// Icon Pagination Next

library.add(faArrowRight)

// Icon Pagination Previous

library.add(faArrowLeft)
Vue.component('fa-icon', FontAwesomeIcon);




// Import de libreria "sweetalert2"
import Swal from "sweetalert2";


// Sweet Alerts For Administrator Panel

export function sweetAlertConfirmUserDelete(){
    Swal.fire({
        icon: "success",
        title: "Users Deleted",
        text: "The User has been deleted!",
      });
      setTimeout(function(){location.reload()},3000);
}


// Sweet Alerts For Organizer Meetup Panel

export function sweetAlertMeetupConfirmUpdate() {
  Swal.fire({
    icon: "success",
    title: "Meetup Updated",
    text: "The Meetup has been updated!",
  });
   setTimeout(function(){location.reload()},4000);
}


export function sweetAlertMeetupNotUpdateMeetup() {
  Swal.fire({
    icon: "error",
    title: "Meetup Not Updated",
    text: "The Meetup not Updated!",
  });
   setTimeout(function(){location.reload()},4000);
}

// Sweet ALerts For UserProfile

export function sweetAlertUserProfileConfirmUpdate() {
  Swal.fire({
    icon: "success",
    title: "User Profile Updated",
    text: "The USer Profile has been updated!",
  });
   setTimeout(function(){location.reload()},4000);
}


export function sweetAlertUserProfileNotUpdateProfile() {
  Swal.fire({
    icon: "error",
    title: "User Profile Not Updated",
    text: "The User Profile not Updated!",
  });
   setTimeout(function(){location.reload()},4000);
}

// Sweets Alert for User Reservation Deleted

export function sweetAlertReservationsConfirmDelete(){
  Swal.fire({
    icon: "success",
    title: "Reservation Delete",
    text: "The User Reservation has been deleted!",
  });
   setTimeout(function(){location.reload()},4000);

}

export function sweetAlertReservationsErrorDelete(){
  Swal.fire({
    icon: "error",
    title: "User Reservation Not Delete",
    text: "The User Reservation not Deleted",
  });
   setTimeout(function(){location.reload()},4000);

}

// Sweet alerts for Reserve Confirmation or errot

export function reservationsuccessmodal(){
  Swal.fire({
    icon: "success",
    title: "Reservation Success",
    text: "The Reservation was made successfully",
  });
   setTimeout(function(){location.reload()},4000);
}

export function reservationerrormodal(){
  Swal.fire({
    icon: "error",
    title: "Reservation Error",
    text: "The Reservation could not be completed",
  });
  setTimeout(function(){location.reload()},4000);
}

// Sweet Alert For Add Comment Meetup

export function commentsuccessmodal(){
  Swal.fire({
    icon: "success",
    title: "Comment Added",
    text: "The comment was added successfully",
  });
  setTimeout(function(){location.reload()},2000);
}


// No searchs found in Filter 


export function noSearchs(){
  Swal.fire({
    icon: "error",
    title: "No results found",
    text: "No results were found for this search",
  });
  setTimeout(function(){location.reload()},2000);
}

// No searchs found in Filter 


export function noComments(){
  Swal.fire({
    icon: "error",
    title: "No comments found",
    text: "No results were found for this meetup",
  });
  setTimeout(function(){location.reload()},2000);
}

export function emptyFieldsLogin(){
  Swal.fire({
    icon: "error",
    title: "Empty Fields",
    text: "User or Password is empty",
  });
  setTimeout(function(){location.reload()},2000);

}


export function confirmDeleteOrganizerMeetups(){
  Swal.fire({
    title: 'Are you sure to delete this Meetup?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your Meetup has been deleted.',
        'success'
      )
    }
  })
}

export function userCreatedModal(){
    Swal.fire({
      icon: "success",
      title: "Meetup Added",
      text: "The user was added successfully",
    });
}

export function meetupCreatedModal(){

  Swal.fire({
    icon: "success",
    title: "User Added",
    text: "The user was added successfully",
  });
}









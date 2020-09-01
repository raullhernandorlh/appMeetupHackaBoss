const database = require('../database');
const express = require('express');
const reservationService = require('../service/reservationService');
const validation = require('../validations/validations')
const logger = require('../utilities/logger');

// Import Auth Middleware

const { isAuthenticated, isUserOfThisReservation, organizerUserReservations } = require('../middlewares/auth');


// Defining Router
const router = express.Router();

// Create Reservations
//Luego hay que ponerlo isAuthenticated

router.post('/:idMeetup', isAuthenticated,async function (req, res) {
    const idUser = req.auth.id;
    const idMeetup = parseInt(req.params.idMeetup);

    if (idUser === undefined || idMeetup === undefined) {
        res.status(400).send();
    }
    // Adding the reservation

    let responseDTO;
    if (await reservationService.addReservation(idUser, idMeetup)) {
        responseDTO = {

            //Cuando un post se da con exito se utiliza 201
            'code': 201,
            'description': 'Successfully created Reservation',
            'data': reservation
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': 'The reservation could not be registered',
        };
    }

    return res.status(responseDTO.code).json(responseDTO);

})

// Delete Reservations
// Luego hay que ponerlo "isAuthenticated"
// Luego hay que ponerlo isUserOfThisReservation

router.delete('/:id_meetup', isAuthenticated, async function (req, res) {

    const id_user = req.auth.id;
    const id_meetup = req.params.id_meetup;

    if (id_user === undefined) {
        res.status(402).send();
        return
    }

    reservationService.deleteReservation(id_user,id_meetup);
    res.send();

})



// User all reservations 
// Luego hay que ponerlo 
// Luego hay que poner el organizerUserReservations

router.get('/userreservations/',isAuthenticated, async function (req, res) {

    console.log("LLego hasta el user reservations del backend")
    const id = req.auth.id

    if (id === undefined) {
        res.status(402).send();
        return
    }

    const responseDTO = await reservationService.userReservations(id);
   return res.status(responseDTO.code).json(responseDTO);

})

// Organizer all reservations 
// Luego hay que ponerlo isAuthenticated,
// Luego hay que ponerlo organizerUserReservations

router.get('/organizerreservations/',  isAuthenticated , async function (req, res) {

    const id = req.auth.id;

    if (id === undefined) {
        res.status(402).send();
        return
    }

    const responseDTO = await reservationService.organizerReservations(id);
    return res.status(responseDTO.code).json(responseDTO);
})


// Reservation Detail

router.get('/reservation/:idMeetup',isAuthenticated, async function (req,res){

    const idUser = req.auth.id
    const idMeetup =parseInt(req.params.idMeetup)
    console.log(idUser)
    console.log(idMeetup)

    const responseDTO = await reservationService.detailReservation(idUser,idMeetup);
    console.log(responseDTO)
    res.status(responseDTO.code).json(responseDTO);
})


// Filter Reservations 

router.get('/filter', async function (req,res){

    const { reservationDate, reservationDateYear, reservationDateMonth, price ,pay} = req.query;

    let filter = {
        "reservationDate": reservationDate,
        "reservationDateYear": reservationDateYear,
        "reservationDateMonth": reservationDateMonth,
        "price": price,
        "paidOut": paidOut,
    }

    const filterReservations = await reservationService.filterReservations(filter);
    const responseDTO = {
        'code': 200,
        'data': filterReservations
    };

    return res.status(responseDTO.code).json(filterReservations);
})



module.exports = router;
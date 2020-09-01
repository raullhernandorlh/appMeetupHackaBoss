//Imports

const moment = require('moment');
const express = require('express');
const ratingService = require('../service/ratingService');


const { isAuthenticated} = require('../middlewares/auth');

// Defining Router
const router = express.Router();

//Add Rating 

router.post('/:id_meetup', isAuthenticated, function (req, res) {

    console.log("LLego hasta aqui")

    const id_user = Number(req.auth.id);
    const meetup_date = moment(req.body.meetup_date).format('YYYY-MM-DD');
    const id_meetup = Number(req.params.id_meetup);
    const valoration = Number(req.body.valoration);
    const valoration_date = moment().format('YYYY-MM-DD');
   
    const responseDTO = ratingService.addRatingAfterMeetups(valoration,meetup_date,valoration_date,id_meetup,id_user);
    res.json(responseDTO);
})

// Average Rating 

router.get('/avg/:id_meetup', async function (req, res) {

    console.log("Entra a calcular la media")

    const id_meetup  = parseInt(req.params.id_meetup);

    const responseDTO = await ratingService.avgMeetupRating(id_meetup)
    res.status(responseDTO.code).json(responseDTO);
})




module.exports = router;






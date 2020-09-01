//Imports

const express = require('express');
const commentService = require('../service/commentService');
const moment = require('moment');
moment.locale('es');


const { isAuthenticated, isOrganizer, isOrganizerOfThisMeetup } = require('../middlewares/auth');


// Defining Router
const router = express.Router();

// Add Comments

router.post('/:id' ,isAuthenticated,async function (req, res) {

    const id_user = req.auth.id;
    const id_meetup = req.params.id;
    const date = req.body.date
    const time = req.body.time
    const meetupComment= req.body.comment;




    // Objeto a meter en comentarios
    
    const comment = {
        'id_user': id_user,
        'id_meetup':id_meetup,
        'date':date,
        'time':time,
        'meetupComment': meetupComment,
    };

    console.log(comment)


    let responseDTO;
    if (await commentService.addComment(comment)){
        responseDTO = {
            'code': 200,
            'description': 'Comment created correctly',
            'data': meetupComment
        }
    } else {
        responseDTO = {
            'code': 404,
            'description': 'Could not create comment',
        };
    }

    return res.status(responseDTO.code).json(responseDTO);
})


//Show Meetup Comments

router.get('/:id',async function (req,res){

    const idMeetup = parseInt(req.params.id)
    console.log("ESte es el id del Meetup para ver los comentarios" + idMeetup )

    const responseDTO = await commentService.showMeetupComment(idMeetup);
    res.status(responseDTO.code).json(responseDTO);
})
module.exports = router;

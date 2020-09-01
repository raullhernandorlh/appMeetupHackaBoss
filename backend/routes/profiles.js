//Imports

const express = require('express');
const profileService = require('../service/profileService');
const validation = require('../validations/validations');
const processImage = require('../utilities/processImage');

// Import Auth Middleware

const { isAuthenticated, isUserOfThisOrganizerProfile,isUserOfThisUserProfile } = require('../middlewares/auth');

// Defining Router
const router = express.Router();


// Update User Profile
//Luego hay que ponerlo "isAuthenticated"
// Luego hay que poner "isUserOfThisUserProfile"

router.put('/user/',isAuthenticated, async function (req, res) {
    console.log("Entro al update de user");

    const id = req.auth.id;
    console.log(id);

    //Checking if the id is undefined

    if (id === undefined) {
        res.status(404).send();
        return
    }

    // Watch out !!!!! . It is not allowed to change the email because we use it as an identifier for the login
    
    const userProfile = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'user_autonomous_community': req.body.user_autonomous_community,
        'user_province': req.body.user_province,
        'user_city': req.body.user_city,
        'phone': req.body.phone
    };

    console.log(userProfile)
     // Checking if the organizer profile attributes are undefined

     if (userProfile.first_name === undefined || userProfile.last_name === undefined
        || userProfile.user_autonomous_community === undefined
        || userProfile.user_province === undefined
        || userProfile.user_city === undefined|| userProfile.phone === undefined) {
        res.status(400).send();
        return;
    }

    if (req.files) {
        try {
            if (req.files.update_user_image) {
                userProfile.update_user_image = await processImage(req.files.update_user_image);
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send('No se pudieron procesar la imagen');
        }
    }

     // User Profile Validation

     try {
        validation.userProfileValidation(userProfile)

    } catch (error) {
        console.log(error)
        res.status(400).send();
        return
    }


    let responseDTO;
    if (await profileService.updateUserProfile(id, userProfile)) {
        responseDTO = {
            'code': 200,
            'description': `User Profile ${id} successfully updated`,
            'data': userProfile
        };
    } else {
        responseDTO = {
            'code': 404,
            'description': `The User Profile ${id} could not be updated`,
        };
    }

    return res.status(responseDTO.code).json(responseDTO);

})


// Update Organizer Profile
//Luego hay que ponerlo "isAuthenticated"
// Luego hay que ponerlo "isUserOfThisOrganizerProfile"

router.put('/organizer/', isAuthenticated,async function (req, res) {

    console.log("LLego hasta aqui")

    const id = req.auth.id;
    console.log(id);

    //Checking if the id is undefined

    if (id === undefined) {
        res.status(404).send();
        return
    }

    const organizerProfile = {
        'organizer_name': req.body.organizer_name,
        'organizer_autonomous_community': req.body.organizer_autonomous_community,
        'organizer_province': req.body.organizer_province,
        'organizer_city': req.body.organizer_city,
        'organizer_description': req.body.organizer_description,
    };

    console.log(organizerProfile)


    // Checking if the organizer profile attributes are undefined

    if (organizerProfile.organizer_name === undefined || organizerProfile.organizer_autonomous_community === undefined
        || organizerProfile.organizer_province === undefined || organizerProfile.organizer_city === undefined
        || organizerProfile.organizer_description === undefined) {
        res.status(400).send();
        return;
    }

    // Organizer Profile Validation
    try {
        validation.organizerProfileValidation(organizerProfile)

    } catch (e) {
        console.log(e)
        res.status(400).send();
        return
    }

    let responseDTO;
    if (await profileService.updateOrganizerProfile(id, organizerProfile)) {
        responseDTO = {
            'code': 200,
            'description': `Organizer Profile ${id} successfully updated`,
            'data': organizerProfile
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': `The Organizer Profile ${id} could not be updated`,
        };
    }

    return res.status(responseDTO.code).json(responseDTO);

})


// Detail Organizer Profile

// Luego hay que ponerlo "isUserOfThisOrganizerProfile"

router.get('/organizer/', isAuthenticated,async function (req, res) {
    console.log("LLego al organizer profile");

    const id = req.auth.id;

    const responseDTO = await profileService.organizerProfileDetail(id);
    res.status(responseDTO.code).json(responseDTO);

})

// Detail User Profile
//Luego hay que ponerlo "isAuthenticated"
//Luego hay que ponerlo "is User of THis Profile"

router.get('/user/',isAuthenticated,async function (req, res) {

    const id = req.auth.id

    const responseDTO = await profileService.userProfileDetail(id);
    res.status(responseDTO.code).json(responseDTO);

})




module.exports = router;




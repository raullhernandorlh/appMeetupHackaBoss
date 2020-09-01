
//Imports
const Joi = require('@hapi/joi'); // Validations

async function registerValidation(register) {


    const schema = Joi.object().keys({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        user_image:Joi.string().allow('', null),
        user_autonomous_community: Joi.string().min(3).max(30).required(),
        user_province: Joi.string().min(3).max(30).required(),
        user_city: Joi.string().min(3).max(30).required(),
        phone: Joi.string().max(9).allow('', null),
        email: Joi.string().pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/),
        pass: Joi.string().pattern(/^(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/),
        user_type: Joi.string().min(3).max(30).required(),
        organizer_name: Joi.string().allow('', null),
        organizer_autonomous_community: Joi.string().allow('', null),
        organizer_province: Joi.string().allow('', null),
        organizer_city: Joi.string().allow('', null),
        description_text: Joi.string().allow('', null),
    })

    try{
        const value = await schema.validateAsync(register);

    }catch (e) {
        console.log(e);
    }

}
    


 
    const meetupValidation = Joi.object().keys({
        title: Joi.string().max(200).required(),
        date:Joi.string().required(),
        time:Joi.string().required(),
        location: Joi.string().required(),
        duration: Joi.number().required(),
        category: Joi.string().min(3).max(50).required(),
        meetupPrincipalImage: Joi.string().allow('',null),
        meetupSecondImage: Joi.string().allow('', null),
        meetupThirdImage: Joi.string().allow('', null),
        meetupPrice: Joi.number().required(),
        description: Joi.string().max(500),
        idOrganizer: Joi.number()
    });


// async function meetupUpdateValidation (meetup){

//     const schema = Joi.object({
//         date:Joi.date().required(),
//         time:Joi.string().required(),
//         location:Joi.string().required(),
//         duration: Joi.number().required(),
//         meetup_principal_image: Joi.string().max(500).required(),
//         meetup_second_image: Joi.string().allow('', null),
//         meetup_third_image: Joi.string().allow('', null),
//         meetup_price: Joi.number().required(),
//         description: Joi.string().max(500),
//     })

//     const value = await schema.validateAsync(meetup);
// }


async function userProfileValidation(userProfile) {

    const schema = Joi.object().keys({
        first_name: Joi.string().min(3).max(60),
        last_name: Joi.string().min(3).max(60),
        update_user_image: Joi.string().allow('', null),
        user_autonomous_community: Joi.string().min(3).max(60),
        user_province: Joi.string().min(3).max(400),
        user_city: Joi.string().min(3).max(400),
        phone: Joi.string().min(3).max(400),
    })

    const value = await schema.validateAsync(userProfile);

}


async function organizerProfileValidation(organizerProfile) {

    const schema = Joi.object().keys({
        organizer_name: Joi.string().min(3).max(60),
        organizer_autonomous_community: Joi.string().min(3).max(60),
        organizer_province: Joi.string().min(3).max(60),
        organizer_city: Joi.string().min(3).max(60),
        organizer_description: Joi.string().min(3).max(500),
    })

    const value = await schema.validateAsync(organizerProfile);

}
 
async function reservationValidation(reservation){

    const schema = Joi.object().keys({


    })

    const value = await schema.validateAsync(reservation)
}


async function paymentValidator (payment){
    

    const schema = Joi.object().keys({
        creditCardNumber: Joi.number().min(1234564378915672).max(9999999999999999), 
        expirationMonth:Joi.number().min(1).max(12),
        expirationYear:Joi.number().min(2020).max(2028),
        securityCode:Joi.number().min(100).max(999)

    })

    const value = await schema.validateAsync(payment);


}



module.exports = {
    registerValidation,
    meetupValidation,
    // meetupUpdateValidation,
    organizerProfileValidation,
    userProfileValidation
}
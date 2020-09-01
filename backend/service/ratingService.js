//Imports

const database = require('../database');
const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');


//See rating assigned to the Meetup by previous meetups

async function avgMeetupRating(id_meetup) {

    const sql = 'SELECT ROUND(AVG(valoration),2) AS media , COUNT(id_meetup) AS votes_number FROM ratings WHERE id_meetup = ? AND valoration != 0';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id_meetup]);
        console.log(rows)
        let description;
        if (!rows[0]) {
            description = `The average of the meetup ${id_meetup} ratings could not be performed`;
        } else {
            description = `The average of the meetup ${id_meetup} ratings was successful`;
        }

        let responseDTO = {
            'code': 200,
            'description': description,
            'data': rows[0]
        };

        return responseDTO;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

// Add ratings after meetups

async function addRatingAfterMeetups(valoration,meetup_date,valoration_date,id_meetup,id_user) {

    console.log (valoration)
    console.log(meetup_date)
    console.log(valoration_date)
    console.log(id_meetup)
    console.log(id_user)
    // Si la fecha actual es mayor a la fecha en la que se ha realizado el meetup se puede realizar la valoracion
    // sino error

    if( valoration_date >= meetup_date){

        console.log("Entra aqui");


        const sqlAddRating = 'INSERT INTO ratings (valoration,meetup_date,valoration_date,id_meetup,id_user) VALUES (?,?,?,?,?)';
    
        try {
            const connection = await database.connection();
            const [rows] = await connection.execute(sqlAddRating, [valoration,meetup_date,valoration_date,id_meetup,id_user]);
            console.log(rows[0])
            let description;
            if (!rows[0]) {
                description = `The meetup rating  ${ id_meetup }has been added successfully`;
            } else {
                description = `The meetup rating ${ id_meetup } has been added successfully`;
            }
    
            let responseDTO = {
                'code': 200,
                'description': description,
                'data': rows[0]
            };
    
            return responseDTO;
    
        } catch (exception) {
            return {
                'code': 500,
                'description': exception.toString()
            };
        }
    }

    
}

module.exports = {
    avgMeetupRating,
    addRatingAfterMeetups
}
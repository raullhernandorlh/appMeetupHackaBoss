//Imports

const database = require('../database');
const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');

// Add Reservation

async function addReservation(idUser, idMeetup) {

    const sqlSearchMeetup = 'SELECT meetup_price FROM meetups WHERE id = ? ';
    const connection = await database.connection();
    const rows = await connection.execute(sqlSearchMeetup, [idMeetup]);
    rows[0].forEach(row => {
        const sqlAddReservation = 'INSERT INTO reservations (id_user,id_meetup,reservation_price,paid_out) VALUES ( ?, ?, ?, ?)';
        connection.query(sqlAddReservation, [idUser, idMeetup, row.meetup_price, false], function (error) {
            if (error) {
                const errorResponse = '{"error", "An error occurred while adding the Rervation"}';
                return errorResponse;
            }
        })

        logger.info(`The Reservation added successfully`);
    })
}

// Delete Reservation

async function deleteReservation(id_user,id_meetup) {

    const sqlDeleteReservation = "DELETE  FROM  reservations WHERE reservations.id_user = ? AND reservations.id_meetup = ?";
    const connection = await database.connection();

    await connection.query(sqlDeleteReservation, [id_user,id_meetup], function (error) {

        if (error) {
            const errorResponse = `An error occurred while deleting the reservation ${id_meetup}`;
            logger.error(`Reservation ${id_meetup} has not been deleted`);
            return errorResponse
        }
        return [id_meetup];
    })

}

// Reservation Detail

async function detailReservation(idUser,idMeetup) {

    const sqlReservationDetail = 'SELECT M.title,U.first_name, U.last_name, U.email, R.reservation_date, R.reservation_price  FROM  reservations R , meetups M , users U WHERE  R.id_meetup = M.id and R.id_user = U.id and   R.id_meetup =?  and R.id_user = ?'

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlReservationDetail, [idMeetup,idUser]);
        let description;
        if (!rows[0]) {
            description = `The reservation  does not exist in the database`;
        } else {
            description = `Reservation displayed correctly `;
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

// Uaser All Reservations
async function userReservations(id) {

    console.log("Este es el id de las reservas de usuario")

    console.log(id)

   
    const sqlUserReservations = "SELECT R.id, M.id, M.title, M.date, M.duration, M.time, M.location, M.meetup_principal_image, M.description, R.reservation_date,R.reservation_price, R.paid_out " + 
        "FROM users U, reservations R, meetups M, usersprofiles UP " +
        "WHERE R.id_user = U.id  AND R.id_meetup = M.id AND M.id = UP.id AND U.id = ? AND U.user_type = 'user'"

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlUserReservations, [id]);
        console.log(rows[0]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        let description;
        if (!rows[0]) {
            description = `There are no reservations in the database associated with this user ${id}`;
        } else {
            description = `User reservations have been displayed correctly ${id}`;
        }

        let responseDTO = {
            'code': 200,
            'description': description,
            'data': rows
        };

        return responseDTO;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

// Organizer All Reservations

async function organizerReservations(id) {
    console.log(id);
    const sqlOrganizerReservations = "SELECT R.id, M.id, M.title, M.date, M.duration, M.time, M.location, M.meetup_principal_image, R.reservation_date,R.reservation_price, R.paid_out  FROM users U, reservations R, meetups M, organizerprofiles OP  WHERE R.id_user = U.id  AND R.id_meetup = M.id AND M.id_organizer_profile = OP.id AND U.id = ? AND U.user_type = 'organizer'"
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlOrganizerReservations, [id]);
        console.log(rows);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        
        let description;
        if (!rows[0]) {
            description = `There are no reservations in the database associated with this user ${id}`;
        } else {
            description = `User reservations have been displayed correctly ${id}`;
        }

        let responseDTO = {
            'code': 200,
            'description': description,
            'data': rows
        };

        return responseDTO;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}


// Filter Reservations 

async function filterReservations(filter){

    const reservationDate = filter.reservationDate;
    const reservationDateYear = filter.reservationDateYear;
    const reservationDateMonth = filter.reservationDateMonth;
    const price = filter.price;
    const paidOut = filter.paidOut;


    // Filter By ReservationDate

    if (reservationDate) {
        const sqlFilterReservationDate = 'SELECT * FROM reservarions WHERE date = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterReservationDate, [date]);
        return rows;
    }


    // Filter By Reservation DateYear

    if (reservationDateYear) {
        const sqlreservationDateYear = 'SELECT * FROM meetups WHERE date = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlreservationDateYear, [date]);
        return rows;
    }


    // Filter By Reservation DateMonth

    if (reservationDateMonth) {
        const sqlreservationDateMonth = 'SELECT * FROM meetups WHERE date = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlreservationDateMonth, [date]);
        return rows;
    }


    // Filter By Price

    if (price) {
        const sqlFilterDate = 'SELECT * FROM meetups WHERE date = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDate, [date]);
        return rows;
    }


    // Filter By PaidOut

    if (paidOut) {
        const sqlFilterDate = 'SELECT * FROM meetups WHERE date = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDate, [date]);
        return rows;
    }







}
module.exports = {
    addReservation,
    deleteReservation,
    userReservations,
    organizerReservations,
    detailReservation,
    filterReservations
}
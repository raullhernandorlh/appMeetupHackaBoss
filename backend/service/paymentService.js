//Imports

const database = require('../database');
const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');

// Add Reservation

async function addPayment(payment) {

    console.log(payment)

    const paymentIdUser = payment.user_id;
    console.log(paymentIdUser)
    const paymentIdMeetup = payment.meetup_id;
    console.log(paymentIdMeetup)

      // 1. First Insert Payment User
      const sqlInsertUserPayment = await'INSERT INTO payments (meetup_name,reservation_price,date,time,meetup_id,user_id) VALUES ( ?, ?, ?, ?, ?,?)'
      const connectionToInsert = await database.connection();
      await connectionToInsert.execute(sqlInsertUserPayment, Object.values(payment));

     logger.info(`The Reservation added successfully`);


     //2. Update The Reservation Payment (Pid_ Out 0 to Paid Out 1)

     const sqlUpdateReservationPaid = "UPDATE reservations SET paid_out = '1' where id_user = ? AND id_meetup = ? "
     const connectionToUpdate = await database.connection();
     await connectionToUpdate.execute(sqlUpdateReservationPaid,[paymentIdUser,paymentIdMeetup])

     logger.info(`Reservation Paid Out Update to 1`)

}
async function paymentDetail(meetup_id,id_user) {

    console.log("Estoy en el service de Payment Detail")
    console.log(typeof(meetup_id))
    console.log(typeof(id_user))

    const sqlPaymentDetail = 'SELECT * FROM payments P where P.meetup_id = ? and P.user_id = ?'

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlPaymentDetail, [meetup_id,id_user]);
        console.log(rows);
        let description;
        if (!rows[0]) {
            description = `There is no purchase receipt for this meetup ${meetup_id}`;
        } else {
            description = `The meetup purchase receipt ${meetup_id} was displayed correctly`;
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

module.exports = {
    addPayment,
    paymentDetail
}



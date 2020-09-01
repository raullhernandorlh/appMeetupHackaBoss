// Import stripe library (npm i stripe)
// Es necesario pegar la clave secreta que genera stripe a partir de la clave publica
// Esta clave se encuentra en nuestro dashboard de stripe 

const stripe = require('stripe')('sk_test_51GuukdBytFFQ2wtX3xXnhWdWkbmQtZKSytcpZ49w9gN3QRFjrPynKTndDY6Wp9WwGdRSSP5G6qfgfIl9tieHyWbT00bfZLZzPH');

// Defining Database
const database = require('../database');

// Defining router

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout/:idReservation', async (req, res) => {

    const idReservation = parseInt(req.params.idReservation);
    console.log(idReservation);

    if (idReservation === undefined){
        console.log('hola');
        res.status(404).send();
        return ;
    }
    
    try {
        const selectDataForPayment = 'SELECT U.email , R.reservation_price, R.paid_out from reservations R, users U WHERE R.id_user= U.id AND U.id = ?'
        const connection = await database.connection();
        const rows = await connection.execute(selectDataForPayment, [idReservation]);
            rows[0].forEach(row => {
                // Almacenando el comprador
                const customer =  stripe.customers.create({
                    email: row.email,
                    source: req.body.stripeToken
                });

                // Almacenando la orden de compra
                const charge = stripe.charges.create({
                    amount: row.reservation_price,
                    currency: 'eur',
                    customer: customer.id,
                    description: 'Meetup Product'
                })

                console.log(charge.id);
                // Final show success view
                res.render('downloads');

            })
    }
    catch (e) {
        console.log(e);
    }

})


module.exports = router;
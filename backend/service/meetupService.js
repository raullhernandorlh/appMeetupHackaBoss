//Imports


const { formatDateToDB } = require('../utilities/convertDate.js')
const database = require('../database');
// const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');
const { Console } = require('winston/lib/winston/transports');
const moment = require('moment');
moment.locale('es');



// Register Meetups

async function registerMeetup(meetup) {

    try {

        const id = meetup.idOrganizer
        console.log("Este es el id del usuario para poder sacar el id del organizazor" + id)

        const selectOrganizerProfileId = 'SELECT id from organizerprofiles WHERE id_user = ?'
        const connection = await database.connection();
        const row = await connection.execute(selectOrganizerProfileId, [id]);
        
        row[0].forEach(row => {

        const sqlInsertMeetup = 'INSERT INTO meetups (title,date,time,duration,location,category,meetup_principal_image,meetup_second_image,meetup_third_image,meetup_price,description,id_organizer_profile) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

        connection.query(sqlInsertMeetup, [meetup.title, meetup.date, meetup.time, meetup.duration, meetup.location, meetup.category, meetup.meetupPrincipalImage
            , meetup.meetupSecondImage, meetup.meetupThirdImage, meetup.meetupPrice, meetup.description, row.id]);

        })
        logger.info(`The meetup ${meetup.title} has been created`);
        
        return true;
    } catch (error) {
        console.error(error);
        return error;
    }
}



// Delete Meetup

async function deleteMeetup(id) {

    console.log("LLego hasta aqui")

    const sqlDeleteMeetup = "DELETE FROM meetups WHERE id = ? ";
    const connection = await database.connection();

    await connection.query(sqlDeleteMeetup, [id], function (error) {

        if (error) {
            const errorResponse = '{"error":An error occurred while deleting the meetup"}';
            logger.error(`Meetup ${id} has not been deleted`);
            return errorResponse
        }
        return [id];
    })

}



// List All Meetups

async function listAllMeetups() {

    const sql = 'SELECT * FROM meetups';
    const connection = await database.connection();
    const [rows] = await connection.execute(sql);

    return rows;
}
// List Organizer Meetups
async function listOrganizerMeetups(id) {



    console.log("Este es el id del organizador de listOrganizerMeetups" + id)
    console.log(id);

    const sql = 'SELECT M.id ,M.title, M.date, M.time, M.duration, M.location, M.category , M.meetup_principal_image, M.meetup_second_image, M.meetup_third_image,M.meetup_price, M.description FROM meetups M ,organizerprofiles OP ,users U WHERE M.id_organizer_profile = OP.id AND OP.id_user = U.id AND OP.id_user = ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        console.log(rows);
        let description;
        if (!rows[0]) {
            description = `The Organizer with this id  ${id} does not exist in the database`;
        } else {
            description = `Organizer Meetups displayed correctly ${id}`;
        }

        //Image url modification to insert  Meetup Principal Image
            for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
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
// Filter meetups

async function filterMeetups(filter) {

    const category = filter.category;
    const price = filter.price;
    const duration = parseInt(filter.duration);
    const location = filter.location;
    const date = filter.date;
    console.log(date);
    const dateyear = filter.dateyear;
    const timezone = filter.timezone;
    const id = filter.id;
    console.log("El estado de este id es de " + id)
    console.log("Este es el precio que llega" + price)

    let id_organizer = 0;

    // if(id){
    //     const sqlSelectIdUser = 'SELECT id FROM usersprofiles WHERE id_user = ?';
    //     const connection = await database.connection();
    //     const [rows] = await connection.execute(sqlSelectIdUser, [id]);
    //     id_organizer= rows[0].id
    // }

    if (id) {
        const sqlSelectIdUser = 'SELECT id FROM organizerprofiles WHERE id_user = ?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlSelectIdUser, [id]);
        id_organizer = rows[0].id
    }




    // Filter by Category and Location

    if ((location) && (category)) {
        const sqlFilterByLocationAndCategory = 'SELECT * FROM meetups WHERE location = ?  AND id_organizer_profile!=? AND category = ? ORDER BY category '
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterByLocationAndCategory, [location, id_organizer, category]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }


   




    // Filter by Duration And Category

    if ((duration) && (category)) {
        const sqlFilterByDurationAndCategory = 'SELECT * FROM meetups WHERE meetup_price = ?  AND id_organizer_profile!=? AND category = ? ORDER BY category '
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterByDurationAndCategory, [price, category, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    // Filter by Duration And Price

    if (duration) {

        const sqlFilterByDurationAndPrice = 'SELECT * FROM meetups WHERE  duration = ? AND id_organizer_profile!=? ORDER BY meetup_price';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterByDurationAndPrice, [duration, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }


    // Filter By Category

    if (category) {
        const sqlFilterCategory = 'SELECT * FROM meetups M WHERE category = ? AND id_organizer_profile!=? AND date >= CURRENT_DATE() ';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterCategory, [category, id_organizer]);


        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    // Filter By Date

    if (date) {
        const convertDate = formatDateToDB(date)
        const sqlFilterDate = `SELECT * FROM meetups WHERE date = '${convertDate}' AND id_organizer_profile!=?`;
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDate, [convertDate, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    // Filter By Year

    if (dateyear) {
        const sqlFilterDateYear = 'SELECT * FROM meetups M WHERE YEAR(M.date)= ? AND id_organizer_profile!=?';
        console.log(id_organizer)
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDateYear, [dateyear, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    // Filter by Time Zone 
    //We can filter by time slot. If the meetup takes place before 3:00 p.m. or after 3:00 p.m. 
    //That is, if it is a morning or afternoon event

    if (timezone === 'morning') {
        const minorSign = "<";
        const sqlFilterMorningTime = `SELECT * FROM meetups M where HOUR(M.time) ${minorSign} + '15' AND id_organizer_profile!=?`
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterMorningTime, [id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }


    if (timezone === 'afternoon') {
        const greaterEqualSign = ">=";
        const sqlFilterAfternoonTime = `SELECT * FROM meetups M where HOUR(M.time) ${greaterEqualSign} + '15' AND id_organizer_profile!=?`
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterAfternoonTime, [id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }


    // Filter by Price
    //The filtering will be done by price interval

    if (price === 'free') {

        const sqlFreePrice = `SELECT * FROM meetups M where M.meetup_price = 0 AND id_organizer_profile!=?`
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFreePrice, [id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    if (price === 'cheap') {
        const minorSign = "<";
        const higherSign = ">";
        const sqlCheapPrice = `SELECT * FROM meetups M where M.meetup_price ${higherSign} 0 AND  M.meetup_price ${minorSign} 30  AND id_organizer_profile!=?`
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlCheapPrice, [id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }


    if (price === 'intermediate') {
        const higherSign = ">";
        const minorSign = "<";

        const sqlIntermediatePrice = `SELECT * FROM meetups M where M.meetup_price ${higherSign} 20 AND M.meetup_price ${minorSign} 50 AND id_organizer_profile!=?`
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlIntermediatePrice, [id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    if (price === 'expensive') {
        const higherSign = ">";
        const sqlExpensivePrice = `SELECT * FROM meetups M where M.meetup_price ${higherSign} 50 AND id_organizer_profile!=? `
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlExpensivePrice, [id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }





    // Filter by City

    if (location) {
        const sqlFilterCity = 'SELECT * FROM meetups WHERE location = ? AND id_organizer_profile!=? ';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterCity, [location, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }


    // Filter By Price

    if (price) {
        const sqlFilterPrice = 'SELECT * FROM meetups WHERE meetup_price = ? ORDER BY meetup_price  AND id_organizer_profile!=?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterPrice, [price, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

    // Filter By Duration
    if (duration) {
        const sqlFilterDuration = 'SELECT * FROM meetups WHERE duration = ? ORDER BY meetup_price  AND id_organizer_profile!=?';
        const connection = await database.connection();
        const [rows] = await connection.execute(sqlFilterDuration, [duration, id_organizer]);

        for(let i=0; i < rows.length ; i++) {
            if(rows[i].meetup_principal_image !== "" && rows[i].meetup_principal_image !== null){
                rows[i].meetup_principal_image = "http://localhost:8888/uploads/" +  rows[i].meetup_principal_image;
            }
            else{
                rows[i].meetup_principal_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
            
        

         //Image url modification to insert  Meetup Second Image
        
            if(rows[i].meetup_second_image !== "" && rows[i].meetup_second_image !== null){
                rows[i].meetup_second_image = "http://localhost:8888/uploads/" +  rows[i].meetup_second_image;
            }
            else{
                rows[i].meetup_second_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        

         //Image url modification to insert  Meetup Third Image
         
            if(rows[i].meetup_third_image !== "" && rows[i].meetup_third_image !== null){
                rows[i].meetup_third_image = "http://localhost:8888/uploads/" +  rows[i].meetup_third_image;
            }
            else{
                rows[i].meetup_third_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
            }
        }
        return rows;
    }

}

// Meetup Detail
async function detailMeetup(id) {

    const sql = 'SELECT * FROM meetups WHERE id = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        let description;
        if (!rows[0]) {
            description = `The meetup ${id} does not exist in the database`;
        } else {
            description = `Meetup displayed correctly ${id}`;
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

// Update Meetup


async function updateMeetup(meetup, id_meetup) {

    console.log(meetup)
    const meetupDate = formatDateToDB(meetup.date);
    const meetupDuration = parseInt(meetup.duration);
    const meetupPrice = parseInt(meetup.meetupPrice);


    // Photos For Update

    // const updatePrincipalImage =  meetup.update_principal_image;
    // const updateSecondImage =  meetup.update_second_image
    // const updateThirdImage =  meetup.update_third_image;

    const sqlUpdateMeetup = 'UPDATE meetups SET title = ?, date = ?, time = ? , duration = ?, location = ? , category = ? , meetup_principal_image = ?, meetup_second_image = ?, meetup_third_image = ?, meetup_price= ?, description = ? WHERE id = ?';
    const connection = await database.connection();
    connection.query(sqlUpdateMeetup, [meetup.title, meetupDate, meetup.time, meetupDuration, meetup.location, meetup.category, meetup.update_principal_image, meetup.update_second_image, meetup.update_third_image, meetupPrice, meetup.description, id_meetup], function (error) {
        if (error) {
            const errorResponse = '{"error", "An error occurred while updating ${} the meetup"}';
            return errorResponse;
        }
    })
    logger.info(`The update of the meetup with id ${id_meetup} was successful`);
}

module.exports = {
    registerMeetup,
    deleteMeetup,
    listOrganizerMeetups,
    listAllMeetups,
    filterMeetups,
    detailMeetup,
    updateMeetup
}
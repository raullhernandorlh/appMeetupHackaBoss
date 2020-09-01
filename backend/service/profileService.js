//Imports

const database = require('../database');
const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');

async function updateOrganizerProfile(id, organizerProfile) {

    const selectOrganizerProfileIdToUpdate = 'SELECT id from organizerprofiles WHERE id_user = ?'
    const connection = await database.connection();
    const rows = await connection.execute(selectOrganizerProfileIdToUpdate, [id]);
    rows[0].forEach(row => {
        const sqlUpdateOrganizerProfile = 'UPDATE organizerprofiles SET organizer_name= ?, organizer_autonomous_community = ?, organizer_province = ?, organizer_city = ?, organizer_description = ? WHERE id = ?'
        connection.query(sqlUpdateOrganizerProfile, [organizerProfile.organizer_name, organizerProfile.organizer_autonomous_community,
        organizerProfile.organizer_province, organizerProfile.organizer_city, organizerProfile.organizer_description, row.id], function (error) {
            if (error) {
                const errorResponse = '{"error", "An error occurred while updating ${} the meetup"}';
                return errorResponse;
            }
        })
        logger.info(`The update of the organizer profile with id ${id} was successful`);
    })
}


async function updateUserProfile(id, userProfile) {

    console.log("Entro en el service del userProfile")
    console.log(userProfile)

    const selectUsersProfileIdToUpdate = 'SELECT UP.id FROM usersprofiles UP  where UP.id_user = ?'
    const connection = await database.connection();
    const rows = await connection.execute(selectUsersProfileIdToUpdate, [id]);
    rows[0].forEach(row => {
        const sqlUpdateUsersProfile = 'UPDATE usersprofiles SET first_name = ?, last_name = ?, user_image = ?, user_autonomous_community = ?, user_province = ? ,user_city = ? , phone = ? WHERE id = ?';
        connection.query(sqlUpdateUsersProfile, [userProfile.first_name, userProfile.last_name, userProfile.update_user_image,
        userProfile.user_autonomous_community, userProfile.user_province, userProfile.user_city,
        userProfile.phone, row.id], function (error) {
            if (error) {
                const errorResponse = '{"error", "An error occurred while updating ${} the meetup"}';
                return errorResponse;
            }
        })
        logger.info(`The update of the user profile with id ${id} was successful`);
    })
}


async function organizerProfileDetail(id) {

    console.log("LLego hasta el service del Organizer Profile");

    const sql = 'SELECT OP.* FROM users U, organizerprofiles OP where OP.id_user = U.id AND U.id = ?';

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        let description;
        if (!rows[0]) {
            description = `The Organizer ${id} does not exist in the database`;
        } else {
            description = `Organizer displayed correctly ${id}`;
        }

        let responseDTO = {
            'code': 200,
            'description': description,
            'data': rows[0]
        }

        return responseDTO;

    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }

}

async function userProfileDetail(id) {

    console.log("Hola estoy en el metodo de user profile detail")

    const sql = 'SELECT UP.* FROM users U, usersprofiles UP where UP.id_user = U.id AND U.id = ?'

    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [id]);
        
        let description;
        if (!rows[0]) {
            description = `The user profile ${id} does not exist in the database`;
        } else {
            description = `User Profile displayed correctly ${id}`;
        }


        if(rows[0].user_image !== "" && rows[0].user_image !== null){
            rows[0].user_image = "http://localhost:8888/uploads/" +  rows[0].user_image;
        }
        else{
            rows[0].users_profiles.user_image = "https://www.mallolbrianso.cat/images/raxo_thumbs/amk/tb-w300-h200-crop-int-c7a36675438b546cc949cdf21a3f3170.jpg" 
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



module.exports = {

    updateOrganizerProfile,
    organizerProfileDetail,
    userProfileDetail,
    updateUserProfile
}
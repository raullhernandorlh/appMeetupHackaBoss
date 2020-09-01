//Imports

const database = require('../database');
const { connection } = require('../database');
const logger = require('../utilities/logger');
const { getMaxListeners } = require('../utilities/logger');

// Add Comment

async function addComment(meetupComment) {

    console.log(meetupComment)
    
    const comment = meetupComment.meetupComment
    const idMeetup = meetupComment.id_meetup
    const idUser = meetupComment.id_user
    const time = meetupComment.time
    const date = meetupComment.date
    try {
        const sqlAddComment = "INSERT INTO comments (comment,date,time,id_meetup,id_user) VALUES (?,?,?,?,?)";
        const connection = await database.connection();
        await connection.query(sqlAddComment, [comment,date,time,idMeetup,idUser], function (error) {
            if (error) {
                const errorResponse = '{"error", "An error occurred while adding comment"}';
                return errorResponse;
            }
        })
        logger.info(`The Comment ${idMeetup}has been created`);

        return true;
    }
    catch (e) {
        console.log(`The comment ${idMeetup} could not be created`, e);
    }
}


// Show Meetup Comments 

async function showMeetupComment(idMeetup){


    const sql = 'select comment, date, time from comments WHERE id_meetup= ?';
    try {
        const connection = await database.connection();
        const [rows] = await connection.execute(sql, [idMeetup]);
        console.log(rows)
        let description;
        if (!rows[0]) {
            description = `There are no comments for this meetup ${idMeetup}`;
        } else {
            description = `Comments of meetup displayed correctly`;
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
    addComment,
    showMeetupComment
}
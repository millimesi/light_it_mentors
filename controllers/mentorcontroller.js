// Mentor endspoints controller
import DbClient from '../utils/db.js'

// initiate the Database
const db = new DbClient();

/**
 * @description - 
 * @
 */
export default class MentorController {
    static async getMentors(req, res){
        console.log('get mentors is reached');

        // Total number of mentors
        const totalNumOfMentors = await db.nbMentors()

        // get the list of mentors
        // sorted with ascending numberofmentee
        const listOfMentors = await db.getListOfMentors()

        res.status(200).json({ totalNumOfMentors, listOfMentors });
    }

    static async getMentorByID(req, res) {
        console.log('getMentorByID is reached')
        
        // get the id from params
        const mentorId = req.params.id;

        // get the mentor from the database
        const mentor = await db.getMentor(mentorId);

        res.status(200).json({ mentor });
    }
}

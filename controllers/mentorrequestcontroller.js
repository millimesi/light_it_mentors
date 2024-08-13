// Manage and controlles mentor Request
import MentorRequest from "../models/mentorRequest.js";
import Mentor from "../models/mentor.js";
import User from "../models/user.js"

export default class MentorRequestController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async postMentorRequest(req, res) {
        console.log('Get /mentor_request is Accessed');

        // get the request data
        const mentorId = req.body.mentorId || null;
        const userId = req.body.userId || null;
        const menteeFullName = req.body.menteeFullName || null;
        const location = req.body.location || null;
        const message = req.body.message || null;


        // check if all required request data exists
        if (!(mentorId && userId && menteeFullName && location)) {
            // return incomplete data
            return res.status(400).json({ error: 'incomplete request data'})
        }

        // check the existance of the user and mentor
        try {
            // check if the mentor exists by the id
            const mentorExists = await Mentor.exists({ _id: mentorId }); // returns true if it exists

            // respond mentor id doesnt exist
            if (!mentorExists) {
                return res.status(400).json({ error: 'mentor doesnt exist'});
            }
            
            // chek if the user exists by the id
            const userExists = await User.exists( { _id: userId })

            if (!userExists) {
                return res.status(400).json({ error: 'user doesn\'t exist'})
            }

            // create mentorrequest object
            const mentorRequestObj = {
                mentorId,
                userId,
                menteeFullName,
                location,
                message,
            }

            // create the mentor request and save it to the database
            const mentorRequest = new MentorRequest(mentorRequestObj);

            console.log(mentorRequest)
            const insertInfo = await mentorRequest.save();

            // respond with request id and request status
            return res.status(200).json({ 
                requestId: insertInfo._id, 
                status: insertInfo.status });
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(500).json({ error: 'Server error occurred' });
        }
    }

    static async getMentorRequestById(req, res) {
        console.log('Get /mentor_request/:id is Accessed');

        // get the id
        const requestId = req.params.id;
        
        // query the database by id
        try {
            const mentorRequest = await MentorRequest.findById(requestId);
            // if the response is null respond not found
            if (!mentorRequest) {
                return res.status(400).json({ error: 'Mentor_request not found'});
            }

            // if it exists respond the data
            res.status(200).json(mentorRequest);
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(500).json({ error: 'Server error occurred' });
        }
    }
}

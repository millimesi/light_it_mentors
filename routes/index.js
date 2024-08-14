import MentorController from "../controllers/mentorcontroller.js";
import UserController from "../controllers/usercontroller.js";
import MentorRequestController from "../controllers/mentorrequestcontroller.js";
import User from "../models/user.js";
import authenticateToken from '../utils/midlewares.js';

const insertRoutes = (api) => {
    // retrives list of paginated mentors
    api.get('/mentors', MentorController.getMentors);

    // retrives mentor of the specified Id
    api.get('/mentors/:id', MentorController.getMentorByID);

    // Posts a mentor request with form data of user id and mentor Id
    api.post('/mentor_request', MentorRequestController.postMentorRequest);

    // retrives specific mentor request by Id
    api.get('/mentor_request/:id', MentorRequestController.getMentorRequestById);

    // updates the mentor request details with id
    // api.put('/mentor_request/:id', )

    // create new user account with form data
    api.post('/users', UserController.postNewUser);

    // login by authenticating the password
    api.post('/users/login', UserController.userLogin)

    // retrives user account with specific id
    api.get('/users/:id', authenticateToken, UserController.getUserById)

    // updates the user account with specific id
    api.put('/users/:id', UserController.updateUserById)
    
    // deletes the user account
    api.delete('/users/:id', UserController.deleteById)
}

export default insertRoutes;

import MentorController from "../controllers/mentorcontroller.js"

const insertRoutes = (api) => {
    // retrives list of paginated mentors
    api.get('/mentors', MentorController.getMentors);

    // retrives mentor of the specified Id
    api.get('/mentors/:id', MentorController.getMentorByID);

    // Posts a mentor request with form data of user id and mentor Id
    api.post('/mentor_request', )

    // retrives specific mentor request by Id
    api.get('/mentor_request/:id', )

    // updates the mentor request details with id
    api.put('/mentor_request/:id', )

    // create new user account with form data
    api.post('/users', )

    // retrives user account with specific id
    api.get('/users/:id', )

    // updates the user account with specific id
    api.put('/users/:id', )
    
    // deletes the user account
    // api.delete('/users/:id', )
}

export default insertRoutes;

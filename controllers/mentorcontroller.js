
/**
 * @description - 
 * @
 */
export default class MentorController {
    static getMentors(req, res){
        console.log('get mentors is reached');
        res.status(200).json({ mentorsList: 'is reached'});
    }
}

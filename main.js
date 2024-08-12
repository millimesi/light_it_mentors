import User from "./models/user.js"
import Mentor from "./models/mentor.js";
import MentorRequest from "./models/mentorRequest.js";
import mongoose from "mongoose";
import mentorList from "./Mentorsdata.js";

// Get inforamtion about the database connection paramater
const host = process.env.DB_HOST || 'localhost'; 
const port = process.env.DB_PORT || 27017;
const dbName = process.env.MENTORS_DB || 'light_it_Mentors';
const dbUrl = `mongodb://${host}:${port}/${dbName}`;


// Connect to database 
async function connnectToDb() {
    try {
        await mongoose.connect(dbUrl)
        console.log('Database is connected!');
    } catch (err) {
        console.log(`Error: Database error- ${err}`);
    }
}


async function postNewUser() {
    for (const mentor of mentorList ) {

        // find user with email
        const newMentor = new Mentor(mentor);
        try {
            const existingUser = await Mentor.findOne({ email: newMentor.email})
            if (existingUser) {
                console.log('User exists', existingUser);
                return;
            }
        } catch (err) {
            console.log(`Finding Error: ${err}`);
        }
        // Save user
        try {
            const insertInfo = await newMentor.save();
            console.log(insertInfo._id.toString());
        } catch (err) {
            console.log(`Error: Database Insertion Erorr: ${err}`);
        }
    }
}

 ( async () => {
    await connnectToDb();
    // await Mentor.collection.drop();
    await postNewUser();
    mongoose.connection.close();
}
)();

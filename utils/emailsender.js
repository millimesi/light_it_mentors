import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


async function sendEmail(sendToemail, subject, htmlBody) {
    // gmail configuration for the tansporter
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    }

    // create nodmailer transporter with the gmail config
    const transporter = nodemailer.createTransport(config);

    const message = {
        from: 'light it mentors', // sender address
        to: sendToemail, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: htmlBody, // html body
    }

    try {
        // send the email
        await transporter.sendMail(message);
        console.log('email is sent')
    } catch (err) {
        console.log(err);
    }
}

export default sendEmail;
// (async()=> {
//     await sendEmail(receiverEmail);
// })();

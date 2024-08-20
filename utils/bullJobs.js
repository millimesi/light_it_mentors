import { Queue } from 'bullmq';

// create queue instance for sending email
export const emailJob = new Queue('send-Email');

// create queue instance for decline mentor request after 48 hours delay
export const declineRequestJob = new Queue('declin-Request');

export  async function addEmailJob(sendToEMail, subject, htmlBody) {
    await emailJob.add('sendEmail', {
        sendToEMail: sendToEMail,
        subject: subject,
        htmlBody: htmlBody
    })
    console.log('Email job is added')
}

export async function addDeclineRequestJob() {
    await declineRequestJob.add('delcine request', {
        status: 'decline',
    })
}

/**
 * @description - drains the queue
 * @param {Queue} jobQueue - the queue to be drained  
 */
export async function drainage (jobQueue) {
    await jobQueue.drain();
    console.log('Email queue drained');
}



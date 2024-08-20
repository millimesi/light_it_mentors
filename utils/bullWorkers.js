import { Worker } from "bullmq";
import sendEmail from "./emailsender.js";

const emailWorker = new Worker('send-Email', async (job) => {
    await sendEmail(job.data.sendToEMail, job.data.subject, job.data.htmlBody)},
    {connection: {host: 'localhost', port: 6379}}
);


emailWorker.on('active', (job) => {
  console.log(`${job.name} ${job.id} is now active; processing...`);
});

emailWorker.on('completed', (job) => {
    console.log(`${job.name} ${job.id} has been completed successfully.`);
  });

emailWorker.on('failed', (job, err) => {
    console.error(`${job.name} ${job.id} failed with error: ${err.message}`);
  });





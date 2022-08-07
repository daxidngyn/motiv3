// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure


//we know how to schedule messages and send messages 
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const messagingServicesSid = process.env.MESSAGING_SERVICES_SID
const myPhoneNumber = process.env.MY_PHONE_NUMBER
const client = require('twilio')(accountSid, authToken);
const randomString  = require('randomstring')

//phone number format: +16463002069. No spaces include the intl area code.
export function sendMessageNow(phoneNumber:string , message:string){
    client.messages.create({
        body: message,
        from: myPhoneNumber,
        to: phoneNumber
    })
}

 //date: Date = new Date(Date.UTC(2022, 08, 6, 11, 59)). The phone number is the same format as above.
 //Scheduled messages must be a minimum of 15 minutes after the message has been scheduled and cannot be schedule for more than 7 days in the future 
export function sendScheduledMessage(phoneNumber:string, message:string, utc_date:Date){
    client.messages
    .create({
        messagingServiceSid: messagingServicesSid,
        body: message,
        sendAt: utc_date,
        scheduleType: 'fixed',
        statusCallback: 'https://webhook.site/'+randomString.generate(5),
        to: phoneNumber
  })
 .then((message: { sid: any; }) => console.log(message.sid));
}
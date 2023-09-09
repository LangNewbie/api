const nodemailer = require("nodemailer");
const { passEmailApp, myEmail } = require("./settings");
const axios = require("axios");

async function sendEmail(dataEmail, req, res, path1, path2) {
    const data = JSON.stringify({
    "Messages": [{
      "From": {"Email": "botzlang1@gmail.com", "Name": "RestAPI - By Lang"},
      "To": dataEmail.to,
      "Subject": dataEmail.subject,
      "Html": dataEmail.html,
    }]
  });

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: {'Content-Type': 'application/json'},
    auth: {username: 'b4c5c0fb4593df6b24e72cc24e9f60cf', password: '1a46d9be174b4065b4732e58d6da12ad'},
  };

  axios(config, (err, response) => {
        if (err) {
            console.log(err)
            req.flash('error_msg', 'Something Wrong');
            return res.redirect(path1);
        } else {
            req.flash('success_msg', `Success Send Email to : ${dataEmail.to}, Check Your Mail Box/Spam Box`);
            return res.redirect(path2);
        }
    })
}

module.exports = { sendEmail }

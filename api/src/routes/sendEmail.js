const { Router } = require('express');
const nodemailer = require('nodemailer');
require("dotenv").config();

const { PASSWORD_EMAIL_NODEMAILER } = process.env;
const router = Router();


router.post("/", async (req, res, next) => {
    const { name, email, phone, address, message } = req.body;

    if (message) {
      let subject = "contacto portfolio"
      let text = `nombre: ${name}      
email: ${email}     
numero: ${phone}
direccion: ${address}
mensaje:
   ${message}`
      try {
        let transporter = nodemailer.createTransport({
          host: "smtp.mail.yahoo.com",
          port: 465,
          secure: false, // upgrade later with STARTTLS
          service: "yahoo",
          auth: {
            user: "julyan.patricio@yahoo.com",
            pass: PASSWORD_EMAIL_NODEMAILER,
          },
        });

        let email = await transporter.sendMail({
          from: '"contacto portfolio julyan patricio" <julyan.patricio@yahoo.com>', // sender address
          to: "julyan.patricio@gmail.com", // list of receivers
          subject: subject,
          text: text
          // html: message,
        });
        res.json(email);
      } catch (err) {
        next(err);
      }
    } else {
      res.json({
        error: `Missing message`,
      });
    }
  }
);

module.exports = router;


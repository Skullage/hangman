import nodemailer from "nodemailer";
require("dotenv").config();

export const sendFeedback = async (req, res) => {
  const email = req.body.email;
  const msg = req.body.msg;

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "feedback@play-together.ru",
    to: "dogonadze1999@mail.ru",
    subject: `Обратная связь с сайта Play-Together от ${email}`,
    html: msg,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ msg: error.message });
    } else {
      console.log(info);
      res.status(200).send({ msg: "Сообщение успешно отправлено" });
    }
  });
};

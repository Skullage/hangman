import nodemailer from "nodemailer";

export const sendFeedback = async (req, res) => {
  const email = req.body.email;
  const msg = req.body.msg;

  let transporter = nodemailer.createTransport({
    host: "mail.play-together.ru",
    port: 465,
    secure: true,
    auth: {
      user: "root",
      pass: "adik1234",
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

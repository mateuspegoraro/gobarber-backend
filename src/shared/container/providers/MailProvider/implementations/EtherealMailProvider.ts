import nodemailer, { Transporter } from 'nodemailer';
import IMailprovider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailprovider {
  private client: Transporter;

  constructor() {
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount().then(account => {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: '"Equipe GoBarber" <equipe@gobarber.com.br>', // sender address
      to, // list of receivers
      subject: 'Recuperação de senha', // Subject line
      text: body, // plain text body
    });

    console.log('Message sent: %s', message.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

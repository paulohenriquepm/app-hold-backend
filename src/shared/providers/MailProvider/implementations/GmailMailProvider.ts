import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

import { IMailProvider } from '../IMailProvider';

class GmailMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'app.and.hold@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    this.client = transporter;
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'app.and.hold@gmail.com',
      subject,
      html: templateHTML,
    });
  }
}

export { GmailMailProvider };

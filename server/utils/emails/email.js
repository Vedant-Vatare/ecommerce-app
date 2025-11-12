import SibApiV3Sdk from 'sib-api-v3-sdk';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export async function sendEmailVerification(toEmail) {
  try {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += crypto.randomInt(10);
    }
    const templatePath = path.join(
      process.cwd(),
      'utils',
      'templates',
      'emailverification.html',
    );
    const HTMLContent = fs
      .readFileSync(templatePath, 'utf-8')
      .replace(/{{code}}/g, code);

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = {
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: 'Sticker Studio' },
      to: [{ email: toEmail }],
      subject: 'Email Verification',
      htmlContent: HTMLContent,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { response, code, success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error, success: false };
  }
}

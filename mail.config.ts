/**
 * SMTP settings for contact-form emails (Gmail app password).
 * SERVER-ONLY: import this only from server.ts — never from src/, or it will
 * be bundled into the public frontend JavaScript.
 * Keep this repository PRIVATE while this file contains the password.
 */
export const mailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  user: 'zenoaistech@gmail.com',
  pass: 'icja fbpe zunf ccnd',
  receiver: 'zenoaistech@gmail.com',
};

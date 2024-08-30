// src/utils/emailUtils.js

/**
 * Sends an email using a specified email service.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The body content of the email.
 * 
 * @returns {Promise<void>} A promise that resolves when the email is sent or rejects if an error occurs.
 */
export const sendEmail = async (to, subject, body) => {
  try {
    const response = await fetch('https://mandrillapp.com/api/1.0/messages/send.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 243446893c3c400bf0bbb6349e4bdd8d-us14`, // Replace with your actual Mailchimp API key
      },
      body: JSON.stringify({
        key: '243446893c3c400bf0bbb6349e4bdd8d-us14',
        message: {
          from_email: 'the.labbcs112@gmail.com',
          to: [{ email: to, type: 'to' }],
          subject: subject,
          text: body,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
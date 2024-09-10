import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, body } = req.body;

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: 'your-verified-email@example.com',
  };

  try {
    const command = new SendEmailCommand(params);
    await sesClient.send(command);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}

// pages/api/contact/getAll.js
import Contact from '@lib/models/Contact';
import { connectToDB } from '@lib/mongodb/mongoose';

export const GET = async (req) => {
  try {
    await connectToDB();
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find().skip(skip).limit(limit),
      Contact.countDocuments(),
    ]);

    return new Response(JSON.stringify({
      contacts,
      total,
      page,
      pages: Math.ceil(total / limit),
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve contacts", { status: 500 });
  }
};

// pages/api/contact/getById.js
import Contact from '@lib/models/Contact';
import { connectToDB } from '@lib/mongodb/mongoose';

export const GET = async (req,{params}) => {
  try {
    await connectToDB();
    const { id } = params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return new Response("Contact not found", { status: 404 });
    }

    return new Response(JSON.stringify(contact), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve contact", { status: 500 });
  }
};

// pages/api/contact/create.js
import Contact from '@lib/models/Contact';
import { connectToDB } from '@lib/mongodb/mongoose';

export const POST = async (req) => {
  try {
    await connectToDB();
    const { firstName, lastName, email, phoneNumber, message } = await req.json();
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, message });
    await newContact.save();
    return new Response(JSON.stringify(newContact), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create contact", { status: 500 });
  }
};

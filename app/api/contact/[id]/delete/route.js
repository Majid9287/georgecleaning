// pages/api/contact/deleteById.js
import Contact from '@lib/models/Contact';
import { connectToDB } from '@lib/mongodb/mongoose';

export const DELETE = async (req,{params}) => {
  try {
    await connectToDB();
    const { id } = params;

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return new Response("Contact not found", { status: 404 });
    }

    return new Response("Contact deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete contact", { status: 500 });
  }
};

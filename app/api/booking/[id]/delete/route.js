// pages/api/Booking/deleteById.js
import Booking from '@lib/models/Booking';
import { connectToDB } from '@lib/mongodb/mongoose';

export const DELETE = async (req,{params}) => {
  try {
    await connectToDB();
    const { id } = params;

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return new Response("Contact not found", { status: 404 });
    }

    return new Response("Contact deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete contact", { status: 500 });
  }
};

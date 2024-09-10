// pages/api/Booking/deleteMany.js
import Booking from '@lib/models/Booking';
import { connectToDB } from '@lib/mongodb/mongoose';

export const DELETE = async (req) => {
  try {
    await connectToDB();
    
    // Extract the array of IDs from the request body
    const { ids } = await req.json();
    
    if (!ids || ids.length === 0) {
      return new Response("No IDs provided", { status: 400 });
    }

    // Delete the contacts matching the provided IDs
    await Booking.deleteMany({ _id: { $in: ids } });
    
    return new Response("Selected Booking deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete Booking", { status: 500 });
  }
};

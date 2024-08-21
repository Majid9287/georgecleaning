// pages/api/bookings/[id].js

import Booking from '@lib/models/Booking';
import { connectToDB } from '@lib/mongodb/mongoose';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // Extract the booking ID from the URL parameters
    const { id } = params;

    // Find the booking by ID
    const booking = await Booking.findById(id)
      .populate('services') // Populate service details if needed
      .exec();

    if (!booking) {
      // Return a 404 response if the booking is not found
      return new Response("Booking not found", { status: 404 });
    }

    // Return success response with the booking data
    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to retrieve booking", { status: 500 });
  }
};

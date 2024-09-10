// pages/api/booking.js

import Booking from '@lib/models/Booking';
import { connectToDB } from '@lib/mongodb/mongoose';

export const GET = async (req) => {
  try {
    await connectToDB();

    // Extract the query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get('status') || 'pending confirmation';
    const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
    const limit = parseInt(url.searchParams.get('limit')) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Query for bookings with the specified status, applying pagination
    const [bookings, total] = await Promise.all([
      Booking.find({ status })
        .skip(skip)
        .limit(limit)
        .populate('services') // If you want to populate service details
        .exec(),
      Booking.countDocuments({ status })
    ]);

    // Return success response with the bookings and pagination info
    return new Response(
      JSON.stringify({
        bookings,
        total,
        page,
        pages: Math.ceil(total / limit),
      }), 
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to retrieve bookings", { status: 500 });
  }
};

import Booking from "@lib/models/Booking"; // Import the Booking model
import { connectToDB } from "@lib/mongodb/mongoose";

export const PUT = async (req, { params }) => {
  try {
    await connectToDB(); // Connect to the MongoDB database

    // Parse the request body as JSON
    const data = await req.json();

    // Extract the booking ID from the request parameters
    const { id } = params;

    // Validate and sanitize the data
    const {
        status,
        name,
        phone,
        email,
        postcode,
        address,
        preferredDate,
        preferredTime,
        callingTime,
        notes,
        services,
    } = data;

    
    // Find the existing booking by ID and update it
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        services,
        personalInfo: {
          name,
          phone,
          email,
          postcode,
          address,
          preferredDate: new Date(preferredDate), // Ensure preferredDate is stored as a Date object
          preferredTime,
          callingTime,
          notes,
        },
        status, // Update the status
      },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return new Response("Booking not found", { status: 404 });
    }

    // Return success response with the updated booking
    return new Response(JSON.stringify(updatedBooking), { status: 200 });
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to update the booking", { status: 500 });
  }
};

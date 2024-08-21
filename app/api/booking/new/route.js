import Booking from "@lib/models/Booking"; // Import the Booking model
import { connectToDB } from "@lib/mongodb/mongoose"; 
export const POST = async (req) => {
  try {
    await connectToDB(); // Connect to the MongoDB database

    // Parse the request body as JSON
    const data = await req.json();

    // Validate and sanitize the data
    const {
      selectedServices,
      personalInfo: {
        name,
        phone,
        email,
        postcode,
        address,
        preferredDate,
        preferredTime,
        callingTime,
        notes
      }
    } = data;
console.log( selectedServices,  name,
    phone,
    email,
    postcode,
    address,
    preferredDate,
    preferredTime,
    callingTime,
    notes)
    // Check if all required fields are present
    if (!selectedServices || !name || !phone || !email || !postcode || !address || !preferredDate ) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Create a new booking document
    const newBooking = await Booking.create({
      services:selectedServices,
      personalInfo: {
        name,
        phone,
        email,
        postcode,
        address,
        preferredDate: new Date(preferredDate), // Ensure preferredDate is stored as a Date object
        preferredTime,
        callingTime,
        notes
      }
    });


    // Return success response with the new booking
    return new Response(JSON.stringify(newBooking), { status: 200 });
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to create a new booking", { status: 500 });
  }
};

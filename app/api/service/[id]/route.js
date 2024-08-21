// pages/api/service/[id].js

import { connectToDB } from "@lib/mongodb/mongoose";
import Service from "@lib/models/Service";

// Fetch a single service by ID
export const GET = async (req, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Get the service ID from the URL params
    const { id } = params;

    // Fetch the service by its ID
    const service = await Service.findById(id);

    if (!service) {
      return new Response(JSON.stringify({ message: "Service not found" }), {
        status: 404,
      });
    }

    // Return success response with the service
    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch service", { status: 500 });
  }
};

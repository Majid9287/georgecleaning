// pages/api/service/update-status.js
import { connectToDB } from "@lib/mongodb/mongoose";
import Service from "@lib/models/Service";

export const PUT = async (req,{ params }) => {
  try {
    const { id } = params;
    const { status } = await req.json();
    console.log(id,status)
    // Connect to the database
    await connectToDB();

    // Find the service by ID and update its status
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedService) {
      return new Response("Service not found", { status: 404 });
    }

    // Return updated status
    return new Response(
      JSON.stringify({ updatedStatus: updatedService.status }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to update status", { status: 500 });
  }
};

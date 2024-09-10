// pages/api/service/index.js

import { connectToDB } from "@lib/mongodb/mongoose";
import Service from "@lib/models/Service";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();
  
    // Fetch the paginated posts
    const services = await Service.find({ status: "active" }, "slug title")
    .exec();

    return new Response(
      JSON.stringify({
        services,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};

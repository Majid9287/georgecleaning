// app/api/service/route.js

import { connectToDB } from "@lib/mongodb/mongoose";
import Post from "@lib/models/Service";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1
    const limit = parseInt(url.searchParams.get('limit')) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;
    

  

    // Fetch paginated posts
    const [posts, total] = await Promise.all([
      Post.find({}, "slug title description price status feature_img")
        .skip(skip)
        .limit(limit)
        .exec(),
      Post.countDocuments({})
    ]);

    // Return success response with paginated posts and pagination info
    return new Response(
      JSON.stringify({
        posts,
        total,
        page: page,
        pages: Math.ceil(total / limit),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
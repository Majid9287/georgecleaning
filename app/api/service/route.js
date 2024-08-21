// pages/api/service/index.js

import { connectToDB } from "@lib/mongodb/mongoose";
import Post from "@lib/models/Service";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 15;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the paginated posts
    const posts = await Post.find(
      {},
      "slug title description price status feature_img"
    )
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total count of documents for pagination info
    const totalDocuments = await Post.countDocuments();

    // Return success response with posts and pagination data
    return new Response(
      JSON.stringify({
        posts,
        total: totalDocuments,
        pages: Math.ceil(totalDocuments / limit),
        page: page,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};

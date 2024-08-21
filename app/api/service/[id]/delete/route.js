// pages/api/service/[id]/delete.js

import { connectToDB } from "@lib/mongodb/mongoose";
import Post from "@lib/models/Service";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const DELETE = async (req,{params}) => {
  try {
    const { id } = params; // Extract ID from the URL

    // Connect to the database
    await connectToDB();

    // Fetch post by ID
    const post = await Post.findById(id);

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Delete the post's image from S3
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: post.feature_img.split('/').pop(), // Extract the image key from URL
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));

    // Delete the post from the database
    await Post.findByIdAndDelete(id);

    // Return success response
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete post", { status: 500 });
  }
};

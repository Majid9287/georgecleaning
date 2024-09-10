import { connectToDB } from "@lib/mongodb/mongoose";
import Post from "@lib/models/Service";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const DELETE = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse request body
    const { ids } = await req.json(); // Expecting a JSON array of IDs
console.log(ids)
    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response("No IDs provided", { status: 400 });
    }

    // Fetch the posts to get their image URLs
    const posts = await Post.find({ _id: { $in: ids } });
    
    // Delete images from S3
    for (const post of posts) {
      if (post.feature_img) {
        const imageKey = post.feature_img.split('/').pop(); // Extract the S3 object key
        await s3.deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey
        }).promise();
      }
    }

    // Delete the posts from the database
    await Post.deleteMany({ _id: { $in: ids } });

    // Return success response
    return new Response("Posts deleted successfully", { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to delete posts", { status: 500 });
  }
};

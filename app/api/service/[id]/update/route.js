import { connectToDB } from "@lib/mongodb/mongoose";
import Post from "@lib/models/Service";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const PUT = async (req,{params}) => {
  try {
    // Connect to the database
    await connectToDB();
    const { id } = params;
    // Parse the incoming request
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const content = formData.get("content");
    const image = formData.get("image");

    // Find the existing post by ID
    const post = await Post.findById(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    let imageUrl = post.feature_img;

    // Set up AWS S3
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Check if a new image is provided
    if (image) {
      // Delete the old image from S3
      const oldImageKey = post.feature_img.split('/').pop(); // Extract the image key from the URL
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: oldImageKey,
      };
      await s3Client.send(new DeleteObjectCommand(deleteParams));

      // Upload the new image to S3
      const fileBuffer = Buffer.from(await image.arrayBuffer());
      const newImageKey = `${uuidv4()}-${image.name}`;
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: newImageKey,
        Body: fileBuffer,
        ContentType: image.type,
        ACL: 'public-read',
      };
      await s3Client.send(new PutObjectCommand(uploadParams));

      imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newImageKey}`;
    }

    // Generate a slug from the title if updated
    const slug = title ? slugify(title, { lower: true, strict: true }) : post.slug;

    // Update the post with the new or existing values
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title || post.title,
        description: description || post.description,
        price: price || post.price,
        content: content || post.content,
        feature_img: imageUrl,
        slug: slug, // Update the slug if the title changes
      },
      { new: true }
    );

    // Return success response with the updated post
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update post", { status: 500 });
  }
};

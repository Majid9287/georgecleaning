import { connectToDB } from "@lib/mongodb/mongoose";
import Post from "@lib/models/Service";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Get the form data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const content = formData.get("content");
    const image = formData.get("image");

    // Generate a slug from the title
    const slug = slugify(title, { lower: true, strict: true });

    // Check if image is provided
    if (!image) {
      return new Response("Image is required", { status: 400 });
    }

    // Set up AWS S3
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Prepare the image for upload to S3
    const fileBuffer = Buffer.from(await image.arrayBuffer());
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${image.name}`,
      Body: fileBuffer,
      ContentType: image.type,
      ACL: 'public-read'
    };

    // Upload the image to S3
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    // Create a new post with the uploaded image URL
    const newPost = await Post.create({
      title: title,
      description: description,
      price: price,
      content: content,
      feature_img: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`,
      slug: slug // Save the slug
    });

    // Return success response
    return new Response(JSON.stringify(newPost), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

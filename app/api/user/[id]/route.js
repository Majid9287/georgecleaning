import User from '@lib/models/User'; // Assuming you have a User model defined
import { connectToDB } from '@lib/mongodb/mongoose';

export const GET = async (req,{params}) => {
  try {
    await connectToDB();

    // Extract user ID from the URL
    const { id } = params;

    if (!id) {
      return new Response("User ID is required", { status: 400 });
    }

    // Fetch the user by ID
    const user = await User.findById(id).exec();

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Return success response with the user data
    return new Response(
      JSON.stringify(user),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to retrieve user", { status: 500 });
  }
};

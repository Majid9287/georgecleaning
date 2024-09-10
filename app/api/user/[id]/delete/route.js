import User from '@lib/models/User'; // Assuming you have a User model defined
import { connectToDB } from '@lib/mongodb/mongoose';

export const DELETE = async (req,{params}) => {
  try {
    await connectToDB();

    const { id } = params;

    if (!id) {
      return new Response("User ID is required", { status: 400 });
    }

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response("User not found", { status: 404 });
    }

    // Return success response if user is deleted
    return new Response("User deleted successfully", { status: 200 });
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to delete user", { status: 500 });
  }
};

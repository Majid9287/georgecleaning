import User from '@lib/models/User'; // Assuming your User model is defined here
import { connectToDB } from '@lib/mongodb/mongoose';

export const PATCH = async (req,{params}) => {
  try {
    await connectToDB();
    const { id } = params;
   

    // Parse the request body to get the role
    const { role } = await req.json();

    if (!id) {
      return new Response("User ID is required", { status: 400 });
    }

    if (!role) {
      return new Response("Role is required", { status: 400 });
    }

    // Find the user by ID and update the role
    const updatedUser = await User.findByIdAndUpdate(
        id,
      { role },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    // Return success response with the updated user
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to update user role", { status: 500 });
  }
};

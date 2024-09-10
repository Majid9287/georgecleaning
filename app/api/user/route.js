import User from '@lib/models/User'; // Assuming you have a User model defined
import { connectToDB } from '@lib/mongodb/mongoose';

export const GET = async (req) => {
  try {
    await connectToDB();

    // Extract query parameters from req
    const { searchParams } = new URL(req.url);
    const rolesParam = searchParams.get('roles')||"admin,user";
    const page = parseInt(searchParams.get('page')) || 1; // Default to page 1
    const limit = parseInt(searchParams.get('limit')) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Set up the roles filter
    let rolesFilter = {};
    if (rolesParam) {
      const roles = rolesParam.split(','); // Split roles by comma if multiple roles are provided
      rolesFilter = { role: { $in: roles } };
    }

    // Query for users with the specified roles, applying pagination
    const [users, total] = await Promise.all([
      User.find(rolesFilter)
        .skip(skip)
        .limit(limit)
        .exec(),
      User.countDocuments(rolesFilter)
    ]);

    // Return success response with the users and pagination info
    return new Response(
      JSON.stringify({
        users,
        total,
        page,
        pages: Math.ceil(total / limit),
      }), 
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    // Return error response if an error occurs
    return new Response("Failed to retrieve users", { status: 500 });
  }
};

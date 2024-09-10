
import { getSession } from "@lib/nextauth/auth";

export const GET = async (req) => {
  try {
   
    
    // Get the session data
    const session = await getSession();
    console.log("Session data:", session);
    
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Return only user data from session
    return new Response(
      JSON.stringify({
        session: session,  // Include user data from session
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user data", { status: 500 });
  }
};

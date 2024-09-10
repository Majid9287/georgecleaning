import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies helper

export async function middleware(request) {
  // Define paths that require authentication
  const protectedPaths = [
    "/dashboard",
    "/api/user",
    "/api/booking/:id/update",
    "/api/booking/:id/delete",
  ];

  // Check if the current path is one of the protected paths
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If the path is not protected, allow the request to proceed
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  try {
    // Fetch session data from your session API
    const c = cookies();
    const allCookies = c
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    // Check for session token in cookies
    if (!c.get("next-auth.session-token")?.value?.trim()) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    const sessionRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: allCookies,
        },
        cache: "no-store", // Ensure no caching
      }
    );
    const data = await sessionRes.json();
    const session = data.session;
    console.log("Session data:", session);
    if (!session || !session.user) {
      // If no session and the path is protected, redirect to login
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Check if the user is an admin for protected routes
    const isAdmin = session.user.role === "admin";
    const isProtectedAdminPath = [
      "/dashboard",
      "/api/user",
      "/api/booking/:id/update",
      "/api/booking/:id/delete",
    ].some((path) => request.nextUrl.pathname.startsWith(path));

    // If the user is not an admin and tries to access protected routes, redirect to profile
    if (isProtectedAdminPath && !isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow the request to proceed if authenticated and authorized
    return NextResponse.next();
  } catch (error) {
    console.error("Failed to fetch session:", error);
    // Redirect to an error page or handle the error as needed
    return new Response("Unauthorized, log in first or refresh page", {
      status: 401,
    });
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/user/:path*",
    "/api/booking/:id/update",
    "/api/booking/:id/delete",
    "/api/booking",
  ],
};

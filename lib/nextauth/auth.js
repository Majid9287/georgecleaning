import { signInWithauth, getUserByEmail } from "@lib/actions/authactions";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user) return null;

        if (account.provider === "google" && profile) {
          return await signInWithauth({ account, profile });
        }
        return user;
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return null;
      }
    },
    async jwt({ token,user}) {
      if (token.email) {
        const user = await getUserByEmail({ email: token.email });
        // console.log({user})
        token.name = user.name;
        token._id = user._id;
        token.role = user.role;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token._id,
        role: token.role,
        permissions: token.permissions,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to home page after sign in
      return baseUrl;
    },
  },
 
};
async function getSession() {
  return await getServerSession(authOptions);
}

export { authOptions, getSession };

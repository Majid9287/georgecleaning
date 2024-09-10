
import { connectToDB } from "@lib/mongodb/mongoose";
import User from "@lib/models/User";


 async function signInWithauth({ account, profile }) {
  connectToDB();

  const user = await User.findOne({ email: profile.email });

  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    profile: profile.picture,
    role: "user",
    permissions: ["read"],
  
  });

  await newUser.save();

  return true;
}

 async function getUserByEmail({ email }) {
  connectToDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist!");
  }

  return { ...user._doc, _id: user._id.toString() };
}

export { signInWithauth, getUserByEmail };

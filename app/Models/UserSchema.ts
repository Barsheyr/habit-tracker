// Import the Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // The unique Clerk user ID used to identify the user; must be provided
    clerkUserId: { type: String, unique: true, required: true },

    // The user's email address; must be provided
    emailAddress: { type: String, required: true },
  },
  {
    // Adds `createdAt` and `updatedAt` timestamps automatically
    timestamps: true,
  }
);

// Check if the User model already exists (to avoid recompilation issues in dev),
// otherwise create a new model using the schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Export the User model so it can be used in other parts of the app
export default User;

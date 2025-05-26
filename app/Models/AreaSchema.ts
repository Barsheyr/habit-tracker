import { Schema, model, models } from "mongoose";

//Define the schema

const AreaSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  clerkUserId: { type: String, required: true },
});

// Check if the model already exists

const Area = models.area || model("Area", AreaSchema);

export default Area;

import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the sub-schemas for the nested types
const FrequencySchema = new Schema({
  type: { type: String, required: true },
  days: { type: [String], required: true },
  number: { type: Number, required: true },
});

const AreaSchema = new Schema({
  _id: { type: String, required: false },
  icon: { type: String, required: true },
  name: { type: String, required: true },
});

const CompletedDaySchema = new Schema({
  _id: { type: String, required: false },
  date: { type: String, required: true },
});

const HabitSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  clerkUserId: { type: String, required: true },
  frequency: { type: [FrequencySchema], required: true },
  notificationTime: { type: String },
  isNotificationOn: { type: Boolean, required: true },
  areas: { type: [AreaSchema], required: true, default: [] },
  completedDays: { type: [CompletedDaySchema], required: true, default: [] },
});

const HabitCollection =
  mongoose.models.HabitCollection ||
  mongoose.model("HabitCollection", HabitSchema);

export default HabitCollection;

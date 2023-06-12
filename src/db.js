import mongoose from "mongoose"

export const connectDb = async () => {
  try {
    await mongoose.connect("")
    console.log("Database connection OK ✅");
  } catch (error) {
    console.log('Database connection error:\n', error.message)
  }
}
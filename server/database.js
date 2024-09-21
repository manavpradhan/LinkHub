import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) =>
      console.log(`Mongodb connected with server: ${data.connection.host}`)
    )
    .catch((err) => console.log(err.message));
};

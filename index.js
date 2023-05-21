import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import saveRoutes from "./routes/saveRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";


dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }))
app.use(express.json());
app.use(cors());

app.use("/api/post", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/saved", saveRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/messages", messagesRoutes);


const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

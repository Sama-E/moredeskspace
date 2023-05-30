import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

/* IMPORT ROUTES */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

/* IMPORT CONTROLLERS */
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* IMPORT MODELS */
import User from "./models/User.js";
import Post from "./models/Post.js";

/* TEST DATA */
import { users, posts } from "./data/index.js"

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

//EXPRESS: Server Framework for building RESTful APIs with Node.js
const app = express();
app.use(express.json());

//HELMET: Secures HTTP headers for Express and Node
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//MORGAN: HTTP request logger middleware for Node
app.use(morgan("common"));

//BODYPARSER: HTTP request body needed for body requset when hitting a URL
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//CORS(Cross-Origin-Resource-Sharing): Determines if browsers block frontend JS code from accessing responses
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
//MULTER: Middleware for handling 'multipart/form-data' for uploading files 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 6001;

mongoose.connect(
    CONNECTION_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology:true 
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));
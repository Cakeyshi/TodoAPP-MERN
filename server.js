import express from "express";
import mongoose from "mongoose";
import router from "./routes/todo.routes.js";
import { fileURLToPath } from "url";
import path from "path";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import cors from 'cors';
const app = express();

const port = process.env.PORT;
const connection_string = process.env.MONGO_CONNECTION_STRING;

//directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port || 8000, () => {
  console.log(`Listening at Port: ${port}`);
});

mongoose.connect(connection_string);


//setup static folder
app.use(express.static(path.join(__dirname, "public", "front-end-todolist")));

//enable cors in all routes
app.use(cors());

//middleware
app.use(logger);

//router
app.use("/api/todo", router);

//error handler
app.use(errorHandler);
app.use(notFound);


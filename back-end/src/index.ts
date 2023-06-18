import express from "express";
require("dotenv").config();
import { graphqlHTTP } from "express-graphql";
import connectDB from "./config/db";
import schema from "./schema";
import cors from "cors";

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log("server running");
});

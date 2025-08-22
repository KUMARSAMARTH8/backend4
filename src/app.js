import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express(); //making app variacle through express

app.use(
  cors({
    //origin allowed through cors(cookies)
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//json setting to allow limited data
app.use(express.json({ limit: "16kb" }));
//when data comes from url config. will be
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//static just stores assets (image,file)
app.use(express.static("public"));
//from server , can access & set cookie
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

//routes declaration
//instead of app.get(needs routed and controller together) , app.use(can work with only routes ) is used bcz we separated routes and controller
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// http://localhost:8000/api/v1/users/register

export { app };

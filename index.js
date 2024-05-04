const express = require("express");
const mongoose = require("mongoose");
const { authValidation, loginValidation } = require("./validations/auth.js");
const { postValidation } = require("./validations/post.js");
const checkAuth = require("./utils/checkAuth.js");
const userController = require("./controllers/user.js");
const postController = require("./controllers/post.js");
const commentController = require("./controllers/comments.js");
const cors = require("cors");
const multer = require("multer");
const handleValidationErrors = require("./utils/handleValidationErrors.js");
const app = express();
mongoose.set("strictQuery", true);
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/login")
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//auth
app.post(
  "/auth/register",
  authValidation,
  handleValidationErrors,
  userController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  userController.login
);
app.get("/auth/me", checkAuth, userController.getMe);

//posts
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});
app.get("/tags", postController.getLastTags);
app.post(
  "/posts",
  checkAuth,
  postValidation,
  handleValidationErrors,
  postController.create
);
app.get("/posts", postController.getAll);
app.get("/posts/popular", postController.getPopular);
app.get("/posts/:id", postController.getOne);
app.delete("/posts/:id", postController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postValidation,
  handleValidationErrors,
  postController.update
);

app.post("/comments/:id", checkAuth, commentController.createComment);
app.get("/posts/comments/:id", commentController.getPostComments);

app.listen(5001, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server ok");
});

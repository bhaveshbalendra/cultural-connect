import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import { handleAddNewPost } from "../controller/post";
import upload from "../middlewares/multer";

const router = express.Router();

router.post(
  "/add-post",
  isAuthenticated,
  upload.single("image"),
  handleAddNewPost
);

export default router;

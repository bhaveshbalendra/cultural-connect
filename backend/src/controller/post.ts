import { Request, Response } from "express";
import sharp from "sharp";
import { Post } from "../models/post.model";
import cloudinary from "../utils/cloudinary";
import User from "../models/user.model";

export async function handleAddNewPost(req: Request, res: Response) {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.user._id;

    if (!image)
      return res
        .status(400)
        .json({ message: "Image required", success: false });

    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    console.log("file");
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    console.log("cloud");
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });
    console.log("post");

    const user = await User.findById(authorId);
    console.log("user");
    if (user) {
      user.posts.push(post._id);
      await user.save();
      return res.status(201).json({ message: "post created", success: true });
    }
  } catch (error) {
    console.log(error);
  }
}

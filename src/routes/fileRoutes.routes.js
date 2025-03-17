import express from "express";
import { uploadFile, convertImage } from "../controllers/file.controller.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/convert-image", upload.single("file"), convertImage);

export default router;

import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle file upload
export const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "File uploaded successfully", file: req.file });
};

// Convert image (JPG ↔ PNG)
export const convertImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const outputFormat = req.body.format || "png"; // Default to PNG
        const outputPath = path.join(__dirname, `../uploads/converted-${Date.now()}.${outputFormat}`);

        await sharp(req.file.path).toFormat(outputFormat).toFile(outputPath);

        fs.unlinkSync(req.file.path); // Delete original file

        res.json({ message: "Image converted", convertedFile: outputPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

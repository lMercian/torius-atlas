import { Express } from "express";
import { storagePut } from "./storage";
import { addProductImage } from "./db";

export function setupUploadRoutes(app: Express) {
  app.post("/api/upload-product-image", async (req, res) => {
    try {
      const { productId, fileName, fileData, contentType, isPrimary } = req.body;

      if (!productId || !fileName || !fileData || !contentType) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Convert base64 to buffer
      const buffer = Buffer.from(fileData.split(",")[1] || fileData, "base64");

      // Upload to S3
      const { url } = await storagePut(
        `products/${productId}/${Date.now()}-${fileName}`,
        buffer,
        contentType
      );

      // Save image metadata to database
      await addProductImage({
        productId,
        imageUrl: url,
        isPrimary: isPrimary || false,
      });

      res.json({ success: true, url });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ message: error.message || "Upload failed" });
    }
  });
}

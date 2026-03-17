import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X, Loader2, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ProductImageUploadProps {
  productId: number;
  onImagesUpdated?: () => void;
}

export default function ProductImageUpload({ productId, onImagesUpdated }: ProductImageUploadProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch product images
  const { data: images = [], refetch: refetchImages } = trpc.shop.getProductImages.useQuery({
    productId,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        try {
          // Upload to S3 via backend
          const response = await fetch("/api/upload-product-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId,
              fileName: selectedFile.name,
              fileData: base64,
              contentType: selectedFile.type,
              isPrimary: images.length === 0,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to upload image");
          }

          setUploadSuccess(true);
          setSelectedFile(null);
          setPreview("");
          setTimeout(() => {
            setShowUploadDialog(false);
            setUploadSuccess(false);
            refetchImages();
            onImagesUpdated?.();
          }, 1500);
        } catch (err: any) {
          setError(err.message || "Failed to upload image");
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (err: any) {
      setError(err.message || "Failed to read file");
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    console.log("Delete image:", imageId);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <Button
        onClick={() => setShowUploadDialog(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <Upload size={16} />
        Upload Image
      </Button>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Upload Product Image</DialogTitle>
            <DialogDescription>
              Select and upload an image for your product
            </DialogDescription>
          </DialogHeader>

          {uploadSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Check className="w-12 h-12 text-green-600 mb-4" />
              <p className="text-green-600 font-semibold">Image uploaded successfully!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Preview or Upload Area */}
              {preview ? (
                <div className="space-y-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to select an image</p>
                </div>
              )}

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Gallery */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Product Images ({images.length})</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image: any) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.imageUrl}
                    alt="Product"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Primary
                    </div>
                  )}
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

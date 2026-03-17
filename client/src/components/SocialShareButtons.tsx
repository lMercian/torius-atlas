import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SocialShareButtonsProps {
  productName: string;
  productPrice?: number;
  productImage?: string;
  productUrl?: string;
  brandName?: string;
}

export default function SocialShareButtons({
  productName,
  productPrice,
  productImage,
  productUrl,
  brandName,
}: SocialShareButtonsProps) {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate share URL (use current page URL if not provided)
  const shareUrl = productUrl || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `Check out this amazing product: ${productName}${productPrice ? ` - $${productPrice.toFixed(2)}` : ""}${brandName ? ` by ${brandName}` : ""}`;

  const socialLinks = {
    instagram: `https://www.instagram.com/`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(productImage || "")}&description=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    let url = "";
    
    switch (platform) {
      case "instagram":
        // Instagram doesn't support direct sharing via URL, so we just copy the text
        navigator.clipboard.writeText(shareText);
        alert(`Copied to clipboard! Share this on Instagram:\n\n${shareText}`);
        break;
      case "facebook":
        url = socialLinks.facebook;
        break;
      case "twitter":
        url = socialLinks.twitter;
        break;
      case "pinterest":
        url = socialLinks.pinterest;
        break;
      case "whatsapp":
        url = socialLinks.whatsapp;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowShareDialog(true)}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Share2 size={16} />
        Share
      </Button>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Share Product</DialogTitle>
            <DialogDescription>
              Share "{productName}" on your favorite social media platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Social Media Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialShare("facebook")}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>

              <button
                onClick={() => handleSocialShare("twitter")}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 10.013 10.013 0 01-2.8.856 4.958 4.958 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="text-sm font-medium">Twitter</span>
              </button>

              <button
                onClick={() => handleSocialShare("pinterest")}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#E60023" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.937-.2-2.378.042-3.41.217-.937 1.402-5.938 1.402-5.938s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.119.224.089.345l-.354 1.197c-.047.203-.157.249-.358.149-1.327-.655-2.155-2.715-2.155-4.367 0-3.768 2.74-7.233 7.906-7.233 4.171 0 7.405 2.973 7.405 6.954 0 4.687-2.957 8.456-7.058 8.456-1.377 0-2.671-.714-3.112-1.554l-.848 3.235c-.309 1.179-1.144 2.656-1.703 3.56 1.599.48 3.287.738 5.069.738 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm font-medium">Pinterest</span>
              </button>

              <button
                onClick={() => handleSocialShare("whatsapp")}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-green-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.297-2.882 3.812a9.9 9.9 0 00-.788 3.702c0 5.468 4.447 9.915 9.916 9.915a9.9 9.9 0 003.34-.545c1.401-.487 2.692-1.322 3.594-2.333.902-1.01 1.51-2.229 1.74-3.545.23-1.316.115-2.79-.328-4.14-.443-1.35-1.237-2.529-2.3-3.41-1.062-.882-2.391-1.393-3.842-1.537-1.45-.144-2.874.088-4.111.688zm0 0" />
                </svg>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              <button
                onClick={() => handleSocialShare("instagram")}
                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="5%" stopColor="#fa7e1e" />
                      <stop offset="45%" stopColor="#d92e7f" />
                      <stop offset="60%" stopColor="#9b36b7" />
                      <stop offset="90%" stopColor="#515bd4" />
                    </linearGradient>
                  </defs>
                  <rect width="24" height="24" rx="5.5" ry="5.5" />
                  <path
                    fill="white"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
                <span className="text-sm font-medium">Instagram</span>
              </button>
            </div>

            {/* Copy Link Section */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Or copy the link:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

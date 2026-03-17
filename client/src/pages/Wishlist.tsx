import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import SocialShareButtons from "@/components/SocialShareButtons";

export default function Wishlist() {
  const { user, loading: authLoading } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  // Fetch wishlist
  const { data: wishlistItems = [], isLoading, refetch } = trpc.shop.getWishlist.useQuery(undefined, {
    enabled: !!user,
  });

  const removeFromWishlistMutation = trpc.shop.removeFromWishlist.useMutation({
    onSuccess: () => {
      refetch();
      setIsRemoving(false);
    },
  });

  const handleRemoveFromWishlist = async (productId: number) => {
    setIsRemoving(true);
    await removeFromWishlistMutation.mutateAsync({ productId });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your wishlist</h1>
          <p className="text-gray-600">Sign in to save your favorite products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart size={48} className="mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Start adding your favorite products!</p>
              <Button asChild>
                <a href="/shop">Continue Shopping</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item: any) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {item.primaryImage && (
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">${item.price}</span>
                      <span className="text-sm text-gray-600">
                        {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-black text-white hover:bg-red-600"
                        disabled={item.stock === 0}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        disabled={isRemoving}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center">
                      <SocialShareButtons
                        productName={item.name}
                        productPrice={parseFloat(item.price)}
                        productImage={item.primaryImage || undefined}
                        productUrl={typeof window !== "undefined" ? `${window.location.origin}/shop?product=${item.id}` : undefined}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

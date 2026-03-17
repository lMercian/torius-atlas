import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ShoppingCart, Search, X, Plus, Minus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/_core/hooks/useAuth";
import BrandAuthDialog from "@/components/BrandAuthDialog";
import { toast } from "sonner";
import SocialShareButtons from "@/components/SocialShareButtons";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showBrandRegister, setShowBrandRegister] = useState(false);
  const [, setLocation] = useLocation();
  
  const { user } = useAuth();
  
  // Use cart hook with localStorage persistence
  const { cart, addItem, removeItem, updateQuantity, itemCount, total } = useCart();
  
  // Wishlist mutations
  const addToWishlistMutation = trpc.shop.addToWishlist.useMutation();
  
  // Stripe checkout mutation
  const createCheckoutSession = trpc.payment.createCheckoutSession.useMutation();
  
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const orderId = Math.floor(Math.random() * 1000000);
      
      const response = await createCheckoutSession.mutateAsync({
        orderId,
        items: cart.map(item => ({
          productId: item.id,
          productName: item.name,
          price: Math.round(parseFloat(item.price) * 100),
          quantity: item.quantity,
        })),
      });
      
      if (response.url) {
        window.open(response.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Fetch all products
  const { data: products = [], isLoading } = trpc.shop.getProducts.useQuery({
    category: selectedCategory,
    search: searchQuery,
  });

  const categories = ["Clothing", "Accessories", "Lifestyle"];

  const addToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.primaryImage,
      category: product.category,
    });
  };

  const handleAddToWishlist = async (product: any) => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    if (product.stock === 0) {
      toast.warning(`${product.name} is out of stock. We'll notify you when it's back in stock.`);
    }

    try {
      await addToWishlistMutation.mutateAsync({ productId: product.id });
      toast.success(`${product.name} added to your wishlist!`);
    } catch (error: any) {
      if (error.message.includes("already in wishlist")) {
        toast.info(`${product.name} is already in your wishlist`);
      } else {
        toast.error("Failed to add to wishlist");
      }
    }
  };

  return (
    <>
      <BrandAuthDialog open={showBrandRegister} onOpenChange={setShowBrandRegister} />
      <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="text-sm text-black/60 hover:text-black transition-colors"
            >
              ← Back to Home
            </button>
            <h1
              className="text-3xl font-display"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SHOP
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowBrandRegister(true)}
              variant="outline"
              className="text-sm border-red-600 text-red-600 hover:bg-red-50"
            >
              Brand Login
            </Button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-3 top-3 text-black/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === undefined
                  ? "bg-black text-white"
                  : "bg-white border border-black/10 hover:border-black/30"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-white border border-black/10 hover:border-black/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Products Grid */}
        <div className={`flex-1 max-w-[1400px] mx-auto px-6 lg:px-12 py-12 ${showCart ? "lg:pr-96" : ""}`}>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-black/50">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-black/50">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group">
                  {/* Product Image */}
                  <div
                    className="relative bg-white border border-black/10 rounded-lg overflow-hidden mb-4 aspect-square cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.primaryImage || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded">
                        FEATURED
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-black/50">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-serif-body font-semibold text-black line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-black/60 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price & Stock */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-black">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className="text-xs text-black/50">
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </span>
                    </div>

                    {product.stock === 0 && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-xs text-red-600 font-semibold">Out of Stock - Add to Wishlist to get notified</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="flex-1 bg-black text-white hover:bg-red-600 transition-colors"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleAddToWishlist(product)}
                        title="Add to Wishlist"
                      >
                        <Heart size={16} />
                      </Button>
                      <SocialShareButtons
                        productName={product.name}
                        productPrice={parseFloat(product.price)}
                        productImage={product.primaryImage || undefined}
                        productUrl={typeof window !== "undefined" ? `${window.location.origin}/shop?product=${product.id}` : undefined}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div className="fixed right-0 top-0 h-screen w-full lg:w-96 bg-white border-l border-black/10 shadow-lg z-50 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-2xl font-display" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                CART
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-black/50 py-8">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-black/10">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-black line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-black/60 mb-2">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-black/5 rounded transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-black/5 rounded transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1 hover:bg-red-100 rounded transition-colors text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-black/10 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white hover:bg-red-600 transition-colors py-3 text-base font-semibold disabled:opacity-50"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>
                <Button
                  onClick={() => setShowCart(false)}
                  variant="outline"
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-black/10 sticky top-0 bg-white">
                <h2 className="text-2xl font-display" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  PRODUCT DETAILS
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Product Image */}
                <div className="aspect-square bg-white border border-black/10 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.primaryImage || "https://via.placeholder.com/400"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-black/50 mb-2">
                      {selectedProduct.category}
                    </p>
                    <h1 className="text-3xl font-display" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {selectedProduct.name}
                    </h1>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-black">
                      ${parseFloat(selectedProduct.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-black/50">
                      {selectedProduct.stock > 0
                        ? `${selectedProduct.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>

                  <p className="text-base text-black/70 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                        setShowCart(true);
                      }}
                      disabled={selectedProduct.stock === 0}
                      className="flex-1 bg-black text-white hover:bg-red-600 transition-colors py-3 text-base font-semibold"
                    >
                      Add to Cart
                    </Button>
                    <div className="flex items-center">
                      <SocialShareButtons
                        productName={selectedProduct.name}
                        productPrice={parseFloat(selectedProduct.price)}
                        productImage={selectedProduct.primaryImage || undefined}
                        productUrl={typeof window !== "undefined" ? `${window.location.origin}/shop?product=${selectedProduct.id}` : undefined}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
       </>
  );
}

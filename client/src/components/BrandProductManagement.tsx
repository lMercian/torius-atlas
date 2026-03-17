import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Plus, Edit2, Trash2, Loader2, Image } from "lucide-react";
import ProductImageUpload from "./ProductImageUpload";
import SocialShareButtons from "./SocialShareButtons";

interface BrandProductManagementProps {
  brandId: number;
}

export default function BrandProductManagement({ brandId }: BrandProductManagementProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Clothing");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProductForImages, setSelectedProductForImages] = useState<number | null>(null);
  const [newProductImages, setNewProductImages] = useState<File[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("Clothing");
  const [editPrice, setEditPrice] = useState("");
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Fetch products for this brand
  const { data: products = [], isLoading: isLoadingProducts, refetch } = trpc.shop.getProductsByBrand.useQuery({
    brandId,
  });

  const createProductMutation = trpc.shop.createProduct.useMutation({
    onSuccess: async (data: any) => {
      // Upload images if any were selected
      if (newProductImages.length > 0) {
        try {
          for (let i = 0; i < newProductImages.length; i++) {
            const file = newProductImages[i];
            const reader = new FileReader();
            
            await new Promise<void>((resolve) => {
              reader.onload = async (e) => {
                const base64 = e.target?.result as string;
                try {
                  await fetch("/api/upload-product-image", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      productId: data.id,
                      fileName: file.name,
                      fileData: base64,
                      contentType: file.type,
                      isPrimary: i === 0,
                    }),
                  });
                } catch (err) {
                  console.error("Image upload failed:", err);
                }
                resolve();
              };
              reader.readAsDataURL(file);
            });
          }
        } catch (err) {
          console.error("Error uploading images:", err);
        }
      }
      
      // Reset form
      setProductName("");
      setProductDescription("");
      setProductCategory("Clothing");
      setProductPrice("");
      setProductStock("");
      setNewProductImages([]);
      setShowAddProduct(false);
      setError("");
      setIsLoading(false);
      
      // Refetch products
      refetch();
    },
    onError: (error: any) => {
      setError(error.message || "Failed to create product");
      setIsLoading(false);
    },
  });

  const deleteProductMutation = trpc.shop.deleteProduct.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      setError(error.message || "Failed to delete product");
    },
  });

  const updateProductMutation = trpc.shop.updateProduct.useMutation({
    onSuccess: () => {
      setEditingProduct(null);
      setEditName("");
      setEditDescription("");
      setEditCategory("Clothing");
      setEditPrice("");
      setIsEditLoading(false);
      refetch();
    },
    onError: (error: any) => {
      setError(error.message || "Failed to update product");
      setIsEditLoading(false);
    },
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!productName || !productPrice || !productStock) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    createProductMutation.mutate({
      brandId,
      name: productName,
      description: productDescription,
      category: productCategory,
      price: parseFloat(productPrice),
      stock: parseInt(productStock),
    });
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate({ id: productId });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewProductImages([...newProductImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setNewProductImages(newProductImages.filter((_, i) => i !== index));
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditDescription(product.description || "");
    setEditCategory(product.category);
    setEditPrice(product.price);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!editName || !editPrice) {
      setError("Product name and price are required.");
      return;
    }

    setIsEditLoading(true);
    updateProductMutation.mutate({
      id: editingProduct.id,
      data: {
        name: editName,
        description: editDescription,
        category: editCategory,
        price: parseFloat(editPrice),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Product Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAddProduct(true)}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          <Plus size={16} />
          Add New Product
        </Button>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="sm:max-w-md bg-white max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product for your brand
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddProduct} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Name</label>
              <Input
                type="text"
                placeholder="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={isLoading}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="99.99"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  disabled={isLoading}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Stock</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={productStock}
                  onChange={(e) => setProductStock(e.target.value)}
                  disabled={isLoading}
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Images (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={isLoading}
                  className="hidden"
                  id="product-images-input"
                />
                <label htmlFor="product-images-input" className="cursor-pointer block">
                  <Image size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to select images</p>
                  <p className="text-xs text-gray-500 mt-1">You can select multiple images</p>
                </label>
              </div>

              {newProductImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {newProductImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Products List */}
      <div className="space-y-4">
        {isLoadingProducts ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Loading products...
            </CardContent>
          </Card>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              No products added yet.
            </CardContent>
          </Card>
        ) : (
          products.map((product: any) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditProduct(product)}
                      title="Edit product"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product.id)}
                      title="Delete product"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <SocialShareButtons
                      productName={product.name}
                      productPrice={parseFloat(product.price)}
                      productImage={product.primaryImage || undefined}
                      productUrl={typeof window !== "undefined" ? `${window.location.origin}/shop?product=${product.id}` : undefined}
                      brandName={"Your Brand"}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="font-semibold">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Stock</p>
                    <p className="font-semibold">{product.stock} units</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold">{product.active ? "Active" : "Inactive"}</p>
                  </div>
                </div>
                {product.description && (
                  <p className="text-sm text-gray-600 mt-4">{product.description}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Product Image Upload Modal */}
      {selectedProductForImages && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  {products.find(p => p.id === selectedProductForImages)?.name}
                </CardDescription>
              </div>
              <button
                onClick={() => setSelectedProductForImages(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <ProductImageUpload 
                productId={selectedProductForImages}
                onImagesUpdated={() => {
                  refetch();
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Edit Product</CardTitle>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Product Name</label>
                  <Input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled={isEditLoading}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    disabled={isEditLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    disabled={isEditLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Price ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    disabled={isEditLoading}
                    className="border-gray-300"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1"
                    disabled={isEditLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    disabled={isEditLoading}
                  >
                    {isEditLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

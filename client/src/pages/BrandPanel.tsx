import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Package, Palette, ShoppingBag } from "lucide-react";
import { trpc } from "@/lib/trpc";
import BrandProductManagement from "@/components/BrandProductManagement";
import BrandSizeColorManagement from "@/components/BrandSizeColorManagement";
import BrandOrderManagement from "@/components/BrandOrderManagement";

export default function BrandPanel() {
  const [, setLocation] = useLocation();
  const [brandId, setBrandId] = useState<number | null>(null);
  const [brandName, setBrandName] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    // Check if brand is logged in
    const storedBrandId = localStorage.getItem("brandId");
    const storedBrandName = localStorage.getItem("brandName");
    const storedToken = localStorage.getItem("brandToken");

    if (!storedBrandId || !storedToken) {
      // Redirect to login if not authenticated
      setLocation("/brand/login");
      return;
    }

    setBrandId(parseInt(storedBrandId));
    setBrandName(storedBrandName || "Marka");
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("brandToken");
    localStorage.removeItem("brandId");
    localStorage.removeItem("brandName");
    setLocation("/");
  };

  if (!brandId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>     </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{brandName}</h1>
              <p className="text-sm text-gray-500 mt-1">Brand Management Panel</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package size={16} />
              Products
            </TabsTrigger>
            <TabsTrigger value="variants" className="flex items-center gap-2">
              <Palette size={16} />
              Sizes & Colors
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                <p className="text-sm text-gray-500 mt-1">Add, edit, and manage your products</p>
              </div>
            </div>
            <BrandProductManagement brandId={brandId} />
          </TabsContent>

          {/* Size & Color Tab */}
          <TabsContent value="variants" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sizes & Colors Management</h2>
                <p className="text-sm text-gray-500 mt-1">Manage available sizes and colors for your brand</p>
              </div>
            </div>
            <BrandSizeColorManagement brandId={brandId} />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                <p className="text-sm text-gray-500 mt-1">View orders for your products</p>
              </div>
            </div>
            <BrandOrderManagement brandId={brandId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface BrandSizeColorManagementProps {
  brandId: number;
}

export default function BrandSizeColorManagement({ brandId }: BrandSizeColorManagementProps) {
  const [showAddSize, setShowAddSize] = useState(false);
  const [showAddColor, setShowAddColor] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#000000");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Placeholder sizes and colors
  const [sizes, setSizes] = useState<string[]>([
    "XS", "S", "M", "L", "XL", "XXL"
  ]);

  const [colors, setColors] = useState<Array<{ name: string; code: string }>>([
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#00AA00" },
  ]);

  const handleAddSize = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newSize.trim()) {
      setError("Size name is required.");
      return;
    }

    if (sizes.includes(newSize)) {
      setError("This size is already added.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call tRPC mutation to add size
      setSizes([...sizes, newSize]);
      setNewSize("");
      setShowAddSize(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to add size");
      setIsLoading(false);
    }
  };

  const handleAddColor = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newColorName.trim()) {
      setError("Color name is required.");
      return;
    }

    if (colors.some(c => c.name === newColorName)) {
      setError("This color is already added.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call tRPC mutation to add color
      setColors([...colors, { name: newColorName, code: newColorCode }]);
      setNewColorName("");
      setNewColorCode("#000000");
      setShowAddColor(false);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to add color");
      setIsLoading(false);
    }
  };

  const handleDeleteSize = async (size: string) => {
    try {
      // TODO: Call tRPC mutation to delete size
      setSizes(sizes.filter(s => s !== size));
    } catch (err: any) {
      setError(err.message || "Failed to delete size");
    }
  };

  const handleDeleteColor = async (colorName: string) => {
    try {
      // TODO: Call tRPC mutation to delete color
      setColors(colors.filter(c => c.name !== colorName));
    } catch (err: any) {
      setError(err.message || "Failed to delete color");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sizes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>

        {/* Sizes Tab */}
        <TabsContent value="sizes" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddSize(true)}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Plus size={16} />
              Add Size
            </Button>
          </div>

          {/* Add Size Dialog */}
          <Dialog open={showAddSize} onOpenChange={setShowAddSize}>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Add New Size</DialogTitle>
                <DialogDescription>
                  Add a new size for your brand
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddSize} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Size Name</label>
                  <Input
                    type="text"
                    placeholder="XS, S, M, L, XL, XXL, etc."
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    disabled={isLoading}
                    className="border-gray-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Size"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Sizes List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {sizes.map((size) => (
              <Card key={size} className="flex items-center justify-between p-4">
                <span className="font-medium text-gray-900">{size}</span>
                <button
                  onClick={() => handleDeleteSize(size)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddColor(true)}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Plus size={16} />
              Add Color
            </Button>
          </div>

          {/* Add Color Dialog */}
          <Dialog open={showAddColor} onOpenChange={setShowAddColor}>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Add New Color</DialogTitle>
                <DialogDescription>
                  Add a new color for your brand
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAddColor} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Color Name</label>
                  <Input
                    type="text"
                    placeholder="Black, White, Red, etc."
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    disabled={isLoading}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Color Code</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={newColorCode}
                      onChange={(e) => setNewColorCode(e.target.value)}
                      disabled={isLoading}
                      className="w-16 h-10 border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={newColorCode}
                      onChange={(e) => setNewColorCode(e.target.value)}
                      disabled={isLoading}
                      className="border-gray-300 flex-1"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Color"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Colors List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {colors.map((color) => (
              <Card key={color.name} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: color.code }}
                  />
                  <span className="font-medium text-gray-900 flex-1">{color.name}</span>
                  <button
                    onClick={() => handleDeleteColor(color.name)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">{color.code}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

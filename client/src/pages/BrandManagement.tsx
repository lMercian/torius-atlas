import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash2, Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function BrandManagement() {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandEmail, setNewBrandEmail] = useState("");
  const [newBrandDescription, setNewBrandDescription] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Check if user is admin
  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Erişim Reddedildi</CardTitle>
            <CardDescription>Bu sayfaya erişim izniniz yok.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Fetch brands
  const { data: brands = [], isLoading: brandsLoading } = trpc.admin.getBrands.useQuery();
  const { data: brandTokens = {}, isLoading: tokensLoading } = trpc.admin.getBrandTokens.useQuery();

  // Create brand mutation
  const createBrandMutation = trpc.admin.createBrand.useMutation({
    onSuccess: () => {
      setNewBrandName("");
      setNewBrandEmail("");
      setNewBrandDescription("");
    },
  });

  // Delete brand mutation
  const deleteBrandMutation = trpc.admin.deleteBrand.useMutation();

  const handleCreateBrand = async () => {
    if (!newBrandName || !newBrandEmail) {
      alert("Lütfen marka adı ve email girin");
      return;
    }

    await createBrandMutation.mutateAsync({
      name: newBrandName,
      email: newBrandEmail,
      description: newBrandDescription,
    });
  };

  const handleDeleteBrand = async (brandId: number) => {
    if (confirm("Bu markayı silmek istediğinizden emin misiniz?")) {
      await deleteBrandMutation.mutateAsync({ brandId });
    }
  };

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/brand/${token}`);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Marka Yönetimi</h1>

        {/* Create Brand Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Yeni Marka Ekle</CardTitle>
            <CardDescription>Yeni bir marka oluşturun ve özel erişim linki alın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Marka Adı</label>
              <Input
                placeholder="örn: Luxury Fashion Co."
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="brand@example.com"
                value={newBrandEmail}
                onChange={(e) => setNewBrandEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Açıklama (İsteğe Bağlı)</label>
              <Textarea
                placeholder="Marka hakkında kısa açıklama..."
                value={newBrandDescription}
                onChange={(e) => setNewBrandDescription(e.target.value)}
              />
            </div>
            <Button
              onClick={handleCreateBrand}
              disabled={createBrandMutation.isPending}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              {createBrandMutation.isPending ? "Oluşturuluyor..." : "Marka Oluştur"}
            </Button>
          </CardContent>
        </Card>

        {/* Brands List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Markalar</h2>
          {brandsLoading ? (
            <p>Yükleniyor...</p>
          ) : brands.length === 0 ? (
            <p className="text-muted-foreground">Henüz marka eklenmemiş.</p>
          ) : (
            <div className="grid gap-4">
              {brands.map((brand: any) => (
                <Card key={brand.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{brand.name}</CardTitle>
                        <CardDescription>{brand.email}</CardDescription>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBrand(brand.id)}
                        disabled={deleteBrandMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {brand.description && (
                      <p className="text-sm text-muted-foreground mb-4">{brand.description}</p>
                    )}
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Erişim Linki:</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-background p-2 rounded text-xs break-all">
                          {`${window.location.origin}/brand/${brandTokens[brand.id]}`}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(brandTokens[brand.id])}
                        >
                          <Copy className="w-4 h-4" />
                          {copiedToken === brandTokens[brand.id] ? "Kopyalandı!" : "Kopyala"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

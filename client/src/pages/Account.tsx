/*
 * TORIUS ATLAS – Customer Account Page
 * Features: Order history, shipping status, profile management
 */

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, MapPin, Calendar, DollarSign, User, Mail, Phone, MapPinIcon, Edit2, Save, X, Loader2 } from "lucide-react";

export default function Account() {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  // Fetch user's orders
  const { data: orders, isLoading: ordersLoading } = trpc.account.getOrders.useQuery(undefined, {
    enabled: !!user?.id,
  });

  // Update profile mutation
  const updateProfileMutation = trpc.account.updateProfile.useMutation({
    onSuccess: () => {
      setIsEditingProfile(false);
      // Optionally refresh user data
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Giriş Yapmanız Gerekiyor</h1>
        <p className="text-muted-foreground">Hesap sayfasına erişmek için lütfen giriş yapın.</p>
        <Button onClick={() => window.location.href = "/"}>Ana Sayfaya Dön</Button>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
      });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Hesabım</h1>
              <p className="text-muted-foreground">Siparişlerinizi takip edin ve profil bilgilerinizi yönetin</p>
            </div>
            <Button variant="outline" onClick={logout}>
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "orders"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="inline mr-2 w-4 h-4" />
            Siparişlerim
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === "profile"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="inline mr-2 w-4 h-4" />
            Profil
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {ordersLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin w-8 h-8" />
              </div>
            ) : orders && orders.length > 0 ? (
              orders.map((order: any) => (
                <Card key={order.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sipariş Numarası</p>
                      <p className="font-mono font-semibold">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tarih</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tutar</p>
                      <p className="font-semibold text-lg">
                        {order.currency} {parseFloat(order.total).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Durum</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "paid"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Status */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Kargo Durumu
                    </h4>
                    <div className="space-y-3">
                      {getShippingSteps(order.status).map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                              step.completed
                                ? "bg-green-500 text-white"
                                : step.current
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {step.completed ? "✓" : index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{step.label}</p>
                            {step.date && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(step.date).toLocaleDateString("tr-TR")}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold mb-4">Ürünler</h4>
                      <div className="space-y-2">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.productName} x {item.quantity}
                            </span>
                            <span className="font-medium">
                              {order.currency} {(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Henüz Sipariş Yok</h3>
                <p className="text-muted-foreground mb-6">
                  Henüz hiç sipariş vermemişsiniz. Shop'a giderek ürün satın almaya başlayın.
                </p>
                <Button onClick={() => window.location.href = "/shop"}>Shop'a Git</Button>
              </Card>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Profil Bilgileri</h2>
                {!isEditingProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Düzenle
                  </Button>
                )}
              </div>

              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ad Soyad</label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      placeholder="Ad Soyad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="Telefon Numarası"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Adres</label>
                    <Input
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      placeholder="Adres"
                      className="min-h-24"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={updateProfileMutation.isPending}
                      className="flex items-center gap-2"
                    >
                      {updateProfileMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Kaydet
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ad Soyad</p>
                      <p className="font-medium">{user.name || "Belirtilmemiş"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email || "Belirtilmemiş"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="font-medium">{profileData.phone || "Belirtilmemiş"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adres</p>
                      <p className="font-medium">{profileData.address || "Belirtilmemiş"}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Beklemede",
    paid: "Ödendi",
    processing: "İşleniyor",
    shipped: "Gönderildi",
    delivered: "Teslim Edildi",
    cancelled: "İptal Edildi",
  };
  return labels[status] || status;
}

function getShippingSteps(status: string) {
  const steps = [
    { label: "Sipariş Alındı", completed: true, date: null, current: false },
    { label: "Ödeme Alındı", completed: status !== "pending", date: null, current: status === "paid" },
    { label: "Hazırlanıyor", completed: ["processing", "shipped", "delivered"].includes(status), date: null, current: status === "processing" },
    { label: "Gönderildi", completed: ["shipped", "delivered"].includes(status), date: null, current: status === "shipped" },
    { label: "Teslim Edildi", completed: status === "delivered", date: null, current: false },
  ];
  return steps;
}

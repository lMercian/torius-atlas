import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

interface BrandRegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BrandRegisterDialog({ open, onOpenChange }: BrandRegisterDialogProps) {
  const [, setLocation] = useLocation();
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerMutation = trpc.brand.register.useMutation({
    onSuccess: (data: any) => {
      // Store brand session token in localStorage
      localStorage.setItem("brandToken", data.token);
      localStorage.setItem("brandId", data.brandId.toString());
      localStorage.setItem("brandName", data.brandName);
      
      // Close dialog and redirect to brand panel
      onOpenChange(false);
      setLocation("/brand/panel");
    },
    onError: (error: any) => {
      setError(error.message || "Kayıt başarısız. Lütfen tekrar deneyin.");
      setIsLoading(false);
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!brandName || !email || !password || !confirmPassword) {
      setError("Tüm alanları doldurunuz.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setIsLoading(true);
    registerMutation.mutate({ name: brandName, email, password });
  };

  const handleClose = () => {
    setBrandName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Marka Hesabı Oluştur</DialogTitle>
          <DialogDescription>
            Ürün satmaya başlamak için marka hesabı oluşturun
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Marka Adı</label>
            <Input
              type="text"
              placeholder="Markanızın adı"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              disabled={isLoading}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="marka@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Şifre</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Şifre Onayla</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Hesap oluşturuluyor...
              </>
            ) : (
              "Hesap Oluştur"
            )}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Zaten hesabınız var mı?{" "}
            <button
              type="button"
              onClick={() => {
                handleClose();
                setLocation("/brand/login");
              }}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Giriş Yap
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

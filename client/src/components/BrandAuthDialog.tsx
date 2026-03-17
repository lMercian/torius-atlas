import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

interface BrandAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BrandAuthDialog({ open, onOpenChange }: BrandAuthDialogProps) {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register state
  const [brandName, setBrandName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // Login mutation
  const loginMutation = trpc.brand.login.useMutation({
    onSuccess: (data: any) => {
      localStorage.setItem("brandToken", data.token);
      localStorage.setItem("brandId", data.brandId.toString());
      localStorage.setItem("brandName", data.brandName);
      
      onOpenChange(false);
      setLocation("/brand/panel");
    },
    onError: (error: any) => {
      setLoginError(error.message || "Login failed. Please check your email or password.");
      setIsLoginLoading(false);
    },
  });

  // Register mutation
  const registerMutation = trpc.brand.register.useMutation({
    onSuccess: (data: any) => {
      localStorage.setItem("brandToken", data.token);
      localStorage.setItem("brandId", data.brandId.toString());
      localStorage.setItem("brandName", data.brandName);
      
      onOpenChange(false);
      setLocation("/brand/panel");
    },
    onError: (error: any) => {
      setRegisterError(error.message || "Registration failed. Please try again.");
      setIsRegisterLoading(false);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Email and password are required.");
      return;
    }

    setIsLoginLoading(true);
    loginMutation.mutate({ email: loginEmail, password: loginPassword });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (!brandName || !registerEmail || !registerPassword || !confirmPassword) {
      setRegisterError("Please fill in all fields.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }

    setIsRegisterLoading(true);
    registerMutation.mutate({ name: brandName, email: registerEmail, password: registerPassword });
  };

  const handleClose = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    setBrandName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");
    setRegisterError("");
    setActiveTab("login");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Brand Login</DialogTitle>
          <DialogDescription>
            Sign in or create a new account
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {loginError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="marka@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  disabled={isLoginLoading}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  disabled={isLoginLoading}
                  className="border-gray-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoginLoading}
              >
                {isLoginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              {registerError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {registerError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Brand Name</label>
                <Input
                  type="text"
                  placeholder="Your brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  disabled={isRegisterLoading}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="marka@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  disabled={isRegisterLoading}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  disabled={isRegisterLoading}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isRegisterLoading}
                  className="border-gray-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

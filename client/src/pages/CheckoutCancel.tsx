import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function CheckoutCancel() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment has been cancelled. Your items are still in your cart and ready for checkout whenever you're ready.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          If you experienced any issues during checkout, please try again or contact our support team.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => setLocation("/shop")}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Return to Shop
          </Button>
          
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at support@toriusatlas.com
          </p>
        </div>
      </div>
    </div>
  );
}

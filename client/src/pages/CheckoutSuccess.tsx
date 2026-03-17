import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function CheckoutSuccess() {
  const [, setLocation] = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get session ID from URL params
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      // You can fetch order details here if needed
      setOrderDetails({
        sessionId,
        timestamp: new Date().toLocaleString(),
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Session ID:</span> {orderDetails.sessionId}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Time:</span> {orderDetails.timestamp}
            </p>
          </div>
        )}

        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to your email address. You can track your order in your account dashboard.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => setLocation("/account")}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            View My Orders
          </Button>
          
          <Button
            onClick={() => setLocation("/shop")}
            variant="outline"
            className="w-full"
          >
            Continue Shopping
          </Button>
          
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

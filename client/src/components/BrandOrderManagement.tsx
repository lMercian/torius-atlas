import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";

interface BrandOrderManagementProps {
  brandId: number;
}

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  createdAt: string;
  shippingAddress?: string;
}

export default function BrandOrderManagement({ brandId }: BrandOrderManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Placeholder orders
  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      total: 250.00,
      status: "shipped",
      items: [
        { id: 1, productName: "Turkish Leather Jacket", quantity: 1, price: 250.00 }
      ],
      createdAt: "2026-03-10T10:30:00Z",
      shippingAddress: "123 Main St, New York, NY 10001"
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      total: 180.00,
      status: "processing",
      items: [
        { id: 2, productName: "Silk Scarf", quantity: 2, price: 90.00 }
      ],
      createdAt: "2026-03-11T14:15:00Z",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90001"
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      total: 320.00,
      status: "pending",
      items: [
        { id: 3, productName: "Ceramic Vase", quantity: 1, price: 320.00 }
      ],
      createdAt: "2026-03-11T16:45:00Z",
      shippingAddress: "789 Pine Rd, Chicago, IL 60601"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "paid":
        return "Paid";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No orders yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                    <CardDescription>
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-semibold">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-sm">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Items</p>
                    <p className="font-semibold">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-semibold text-lg text-red-600">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Products:</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.productName} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    onClick={() => handleViewDetails(order)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    View Details
                    <ChevronDown size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-md bg-white max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder?.orderNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Customer Information</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name:</span> {selectedOrder.customerName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingAddress || "No address information"}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Products</h3>
                <div className="space-y-1">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span>{item.productName} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total:</span>
                  <span className="text-red-600">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Order Status</h3>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {getStatusLabel(selectedOrder.status)}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Order Date</h3>
                <p className="text-sm text-gray-600">
                  {new Date(selectedOrder.createdAt).toLocaleString("en-US")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

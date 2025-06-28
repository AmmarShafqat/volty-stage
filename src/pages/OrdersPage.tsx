
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/lib/supabase";
import { format } from "date-fns";
import { Loader } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  extended_warranty: boolean;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  tax_amount: number;
  status: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  installation_date: string | null;
  installation_time_slot: string | null;
  items: OrderItem[];
}

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // First get the customer_id
        const { data: customerData, error: customerError } = await supabase
          .from("customers")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (customerError && customerError.code !== "PGRST116") {
          throw customerError;
        }

        if (!customerData) {
          // No customer record found
          setOrders([]);
          return;
        }

        // Fetch orders for this customer
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("created_at", { ascending: false });

        if (ordersError) {
          throw ordersError;
        }

        // Fetch order items for each order
        const ordersWithItems: Order[] = [];
        
        for (const order of ordersData) {
          const { data: itemsData, error: itemsError } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          if (itemsError) {
            console.error("Error fetching order items:", itemsError);
          }

          ordersWithItems.push({
            ...order,
            items: itemsData || []
          });
        }

        setOrders(ordersWithItems);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error",
          description: "Failed to load orders. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, toast]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "installed":
        return "bg-green-500 text-white hover:bg-green-500";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-voltly-purple" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          
          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-gray-500 mb-4">You don't have any orders yet.</p>
                <Button 
                  onClick={() => navigate("/")} 
                  className="bg-voltly-green hover:bg-voltly-green/90 text-black"
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Order #{order.id.substring(0, 8)}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(order.created_at), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`${getStatusBadgeColor(order.status)} uppercase text-xs font-medium`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-6 border-b">
                      <h3 className="font-medium mb-4">Items</h3>
                      <div className="divide-y">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-3 flex justify-between">
                            <div>
                              <p className="font-medium">{item.product_name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              {item.extended_warranty && (
                                <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-800 hover:bg-blue-50">
                                  Extended Warranty
                                </Badge>
                              )}
                            </div>
                            <p className="font-medium">${item.unit_price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <p className="text-gray-600">
                          {order.address}<br />
                          {order.city}, {order.state} {order.zip_code}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Installation</h3>
                        {order.installation_date ? (
                          <div className="text-gray-600">
                            <p>{formatDate(order.installation_date)}</p>
                            {order.installation_time_slot && (
                              <p>Time: {order.installation_time_slot}</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-600">Not scheduled</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 border-t">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Subtotal:</span>
                        <span>${(order.total_amount - order.tax_amount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Tax:</span>
                        <span>${order.tax_amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${order.total_amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;

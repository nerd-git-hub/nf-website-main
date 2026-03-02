"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Order {
  _id: string;
  size: string;
  count: number;
  amount: number;
  currency: string;
  status: string;
  orderDate?: string;
  createdAt?: string;
}

export default function OrdersPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user || !token) {
      router.push("/merch");
      return;
    }

    const fetchOrders = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/orders/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load orders");
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Failed to load orders");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user, token, isLoading, router]);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-comic-red p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full border-4 border-black">
        <h1 className="text-3xl font-bangers text-black mb-4 text-center">
          Your Orders
        </h1>

        {isLoading || loadingOrders ? (
          <p className="font-roboto text-center text-gray-700">
            Loading your orders...
          </p>
        ) : error ? (
          <p className="font-roboto text-center text-red-600">
            {error}
          </p>
        ) : orders.length === 0 ? (
          <p className="font-roboto text-center text-gray-700">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border-2 border-black rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-yellow-50"
              >
                <div className="mb-2 sm:mb-0">
                  <p className="font-bangers text-lg">
                    NF Comic Tee &times; {order.count} ({order.size})
                  </p>
                  <p className="font-roboto text-sm text-gray-700">
                    {formatDate(order.orderDate || order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bangers text-lg">
                    ₹ {(order.amount / 100).toFixed(2)}
                  </p>
                  <p className="font-roboto text-xs uppercase text-green-700">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


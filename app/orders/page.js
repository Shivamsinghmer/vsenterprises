import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
import Product from "@/models/Product";
import { SafeImage } from "@/components/ui/safe-image";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  await connectDB();
  // populate product so we always have up-to-date images
  const orders = await Order.find({ clerkId: userId })
    .sort({ createdAt: -1 })
    .populate('items.product', 'images name')
    .lean();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            Order History
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Check the status of recent orders, manage returns, and discover similar products.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              You haven't placed any orders yet. When you do, their details will appear here.
            </p>
            <Button asChild className="rounded-full px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 hover:text-white transition-colors">
              <Link href="/categories">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
                // Determine status badge style
                let statusBadgeClass = "bg-gray-100 text-gray-700";
                if (order.status?.toLowerCase() === 'delivered') statusBadgeClass = "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20";
                else if (order.status?.toLowerCase() === 'processing') statusBadgeClass = "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20";
                
                return (
                    <div 
                        key={order._id} 
                        className="bg-white border text-left border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors shadow-sm"
                    >
                        <div className="bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-1">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Order Number</p>
                                    <p className="text-sm font-semibold text-gray-900">#{order._id.toString().slice(-8).toUpperCase()}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date Placed</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                                    <p className="text-sm font-semibold text-gray-900">₹{order.totalAmount}</p>
                                </div>
                                <div className="flex sm:justify-end items-center col-span-2 sm:col-span-1">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClass}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-6 flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 flex gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                                {order.items.slice(0, 4).map((item, idx) => (
                                    <div key={idx} className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
                                        <SafeImage
                                            src={item.product?.images?.[0] || item.images?.[0]}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {item.quantity > 1 && (
                                            <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-gray-200 shadow-sm">
                                                x{item.quantity}
                                            </span>
                                        )}
                                    </div>
                                ))}
                                {order.items.length > 4 && (
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
                                        +{order.items.length - 4}
                                    </div>
                                )}
                            </div>

                            <div className="flex sm:flex-col justify-end sm:justify-center border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 shrink-0 gap-3">
                                <Button asChild variant="outline" className="w-full sm:w-auto rounded-full font-medium shadow-none bg-white">
                                    <Link href={`/orders/${order._id}`}>
                                        View Order Details
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

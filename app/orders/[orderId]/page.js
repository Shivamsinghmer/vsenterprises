import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, MapPin, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
import Product from "@/models/Product";
import { SafeImage } from "@/components/ui/safe-image";

export default async function OrderDetailPage({ params }) {
  const { orderId } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  await connectDB();
  const order = await Order.findOne({ _id: orderId, clerkId: userId })
    .populate('items.product', 'images name')
    .lean();

  if (!order) {
    return notFound();
  }

  // Determine status badge style
  let statusBadgeClass = "bg-gray-100 text-gray-700";
  if (order.status?.toLowerCase() === 'delivered') statusBadgeClass = "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20";
  else if (order.status?.toLowerCase() === 'processing') statusBadgeClass = "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20";
  else if (order.status?.toLowerCase() === 'shipped') statusBadgeClass = "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20";

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/orders" className="hover:text-gray-900 transition-colors">Orders</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">#{order._id.toString().slice(-8).toUpperCase()}</span>
        </nav>

        {/* Header Section */}
        <div className="pb-8 border-b border-gray-200 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
                Order details
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClass}`}>
                    {order.status}
                </span>
            </div>
          </div>
          
          {order.invoicePdf && order.paymentStatus === 'Paid' ? (
            <Button asChild variant="outline" className="rounded-full bg-white hover:bg-gray-50 text-sm font-medium shadow-sm">
               <a href={order.invoicePdf} target="_blank" rel="noopener noreferrer">Download Invoice</a>
            </Button>
          ) : (
            <Button disabled variant="outline" className="rounded-full bg-white opacity-50 text-sm font-medium shadow-sm">
               Download Invoice
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content - Items */}
          <div className="lg:col-span-8 space-y-8">
            <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Items ordered</h2>
                <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-6 py-6">
                            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl bg-gray-100 border border-gray-200 shrink-0 overflow-hidden relative">
                                <SafeImage
                                    src={item.product?.images?.[0] || item.images?.[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-sm font-medium text-gray-500 mb-3">₹{item.price.toLocaleString()} per unit</p>
                                    
                                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                                                <span key={key} className="inline-flex items-center px-2 py-1 rounded bg-gray-50 text-xs font-medium text-gray-600 border border-gray-200">
                                                    {key}: {val}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <p className="text-sm font-medium text-gray-900">Qty: {item.quantity}</p>
                                    <p className="text-base font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          </div>

          {/* Sidebar - Summary & Details */}
          <div className="lg:col-span-4 space-y-8">
            {/* Order Summary */}
            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>
                <dl className="space-y-3 text-sm font-medium text-gray-600">
                    <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd className="text-gray-900">₹{order.subtotal?.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt>Shipping</dt>
                        <dd className="text-gray-900">
                            {order.shippingCharges === 0 ? "Free" : `₹${order.shippingCharges}`}
                        </dd>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200 font-semibold text-gray-900">
                        <dt className="text-base">Total</dt>
                        <dd className="text-base">₹{order.totalAmount?.toLocaleString()}</dd>
                    </div>
                </dl>
            </section>

            {/* Shipping Info */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <h2 className="text-base font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <div className="text-sm font-medium text-gray-600 leading-relaxed bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-900 font-semibold mb-1">{order.shippingAddress?.name}</p>
                    <p>{order.shippingAddress?.addressLine1}</p>
                    {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress?.addressLine2}</p>}
                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                    <p className="mt-2 text-gray-400">Phone: <span className="text-gray-600">{order.shippingAddress?.phone}</span></p>
                    {order.shippingAddress?.gstno && (
                        <p className="mt-1 text-gray-400">GST: <span className="text-gray-900 font-semibold">{order.shippingAddress?.gstno}</span></p>
                    )}
                </div>
            </section>

            {/* Payment Info */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <h2 className="text-base font-semibold text-gray-900">Payment Details</h2>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-gray-500">Method</span>
                        <span className="text-gray-900 uppercase">{order.paymentMethod === 'upi' ? 'UPI' : order.paymentMethod}</span>
                    </div>
                    {order.transactionId && (
                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-1">
                            <span className="text-xs font-medium text-gray-500">Transaction ID</span>
                            <span className="text-sm font-mono font-medium text-gray-900 break-all bg-gray-50 p-2 rounded-md border border-gray-100 select-all">
                                {order.transactionId}
                            </span>
                        </div>
                    )}
                </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}

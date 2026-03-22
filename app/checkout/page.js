"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
    MapPin, CreditCard, ShieldCheck, Truck, 
    ChevronLeft, QrCode, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India"
  });

  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'cod'
  const [transactionId, setTransactionId] = useState("");

  const subtotal = getCartTotal();
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping;

  React.useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      router.push("/cart");
    }
  }, [cartItems, isSubmitting, router]);

  if (cartItems.length === 0 && !isSubmitting) return null;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === "upi" && !transactionId.trim()) {
      alert("Please enter the UTR / Transaction ID after making the payment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          subtotal,
          shippingCharges: shipping,
          totalAmount: total,
          shippingAddress: address,
          paymentMethod,
          transactionId: paymentMethod === "upi" ? transactionId : null,
        }),
      });

      if (res.ok) {
        clearCart();
        router.push("/orders");
      } else {
        alert("Failed to place order. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted/20 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <button 
          onClick={() => step === 2 ? setStep(1) : router.push("/cart")}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ChevronLeft className="size-4" />
          {step === 2 ? "Back to Address" : "Back to Cart"}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Area */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="address-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-border shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="size-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Shipping Address</h2>
                  </div>

                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Full Name</label>
                        <input required type="text" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input required type="tel" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+91 9876543210" />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Address Line 1</label>
                      <input required type="text" value={address.addressLine1} onChange={e => setAddress({...address, addressLine1: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="House/Flat No., Building Name" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium">Address Line 2 (Optional)</label>
                      <input type="text" value={address.addressLine2} onChange={e => setAddress({...address, addressLine2: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Street, Area, Landmark" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5 md:col-span-1">
                        <label className="text-sm font-medium">City</label>
                        <input required type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="City" />
                      </div>
                      <div className="space-y-1.5 md:col-span-1">
                        <label className="text-sm font-medium">State</label>
                        <input required type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="State" />
                      </div>
                      <div className="space-y-1.5 col-span-2 md:col-span-1">
                        <label className="text-sm font-medium">Postal Code</label>
                        <input required type="text" value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} className="w-full h-11 px-3 rounded-xl border border-border bg-transparent focus:ring-2 focus:ring-primary/20 outline-none" placeholder="PIN Code" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full md:w-auto px-8 h-12 rounded-xl text-base font-bold group">
                        Continue to Payment
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CreditCard className="size-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Payment Method</h2>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-4">
                    <button 
                      onClick={() => setPaymentMethod("upi")}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                        paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className={cn(
                        "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                        paymentMethod === "upi" ? "border-primary" : "border-muted-foreground"
                      )}>
                        {paymentMethod === "upi" && <div className="size-2.5 rounded-full bg-primary" />}
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <QrCode className="size-4" />
                          UPI Payment (Google Pay, PhonePe, Paytm)
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Pay via any UPI app instantly</p>
                      </div>
                    </button>
                  </div>

                  {/* UPI Payment Flow */}
                  {paymentMethod === "upi" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-muted/30 p-6 rounded-2xl border border-border"
                    >
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        
                        {/* QR Code */}
                        <div className="shrink-0 space-y-3">
                          <div className="bg-white p-3 rounded-2xl border border-border shadow-sm max-w-[200px] mx-auto">
                            <img src="/qr.jpeg" alt="UPI QR Code" className="w-full aspect-square object-cover rounded-xl" />
                          </div>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider text-center">Scan to Pay</p>
                        </div>
                        
                        {/* Payment Details */}
                        <div className="flex-1 space-y-5">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                              <code className="px-3 py-1.5 bg-white border border-border shadow-sm rounded-lg font-bold text-primary select-all">
                                veter85770576@barodampay
                              </code>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-sm font-medium">Total Amount to Pay: <span className="text-lg font-black text-primary">₹{total}</span></p>
                            
                            <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside text-left leading-relaxed">
                              <li>Open any UPI app (GPay, PhonePe, Paytm, etc.)</li>
                              <li>Scan the QR code or enter the UPI ID</li>
                              <li>Complete the payment of ₹{total}</li>
                              <li>Enter the UTR / 12-digit Transaction ID below</li>
                            </ol>
                          </div>

                          {/* Transaction ID Input */}
                          <div className="space-y-1.5 pt-2">
                            <label className="text-sm font-medium">Transaction ID / UTR No.</label>
                            <input 
                              required 
                              type="text" 
                              value={transactionId} 
                              onChange={e => setTransactionId(e.target.value)} 
                              className="w-full h-11 px-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 outline-none" 
                              placeholder="e.g. 312345678901" 
                            />
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button 
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="w-full md:w-auto h-12 px-8 rounded-xl text-base font-bold shadow-lg shadow-primary/10 group"
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                      {!isSubmitting && <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 sticky top-24 space-y-6">
              <h3 className="text-lg font-bold">Order Summary</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={`${item._id}-${JSON.stringify(item.selectedOptions)}`} className="flex gap-3">
                    <div className="size-16 bg-muted rounded-xl shrink-0 overflow-hidden">
                      <img src={item.images?.[0] || "https://placehold.co/100x100"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 py-1 flex flex-col justify-between">
                      <p className="text-sm font-medium leading-tight line-clamp-2">{item.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="text-sm font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary text-xl">₹{total}</span>
                </div>
              </div>

              {/* Trust markers */}
              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/30 rounded-xl">
                  <ShieldCheck className="size-3.5 text-green-600 shrink-0" />
                  <span className="text-[11px] font-medium text-muted-foreground leading-tight">Secure 256-bit encrypted checkout</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  price: Number,
  quantity: Number,
  selectedOptions: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  images: [String],
});

const orderSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  email: String,
  items: [orderItemSchema],
  subtotal: Number,
  shippingUrl: String, // tracking etc
  shippingCharges: Number,
  totalAmount: Number,
  status: {
    type: String,
    default: 'Processing', // Processing, Shipped, Delivered, Cancelled
  },
  paymentStatus: {
    type: String,
    default: 'Pending', // Pending, Paid, Failed
  },
  paymentId: String,
  paymentMethod: {
    type: String,
    enum: ['upi', 'bank', 'cod', 'pending'],
    default: 'pending'
  },
  transactionId: String,
  paymentProofUrl: String,
  invoicePdf: String, // URL to invoice
  invoiceData: Buffer, // Binary PDF data
  invoiceMimeType: String, // e.g. application/pdf
  shippingAddress: {
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String,
    gstno: String,
  }
}, {
  timestamps: true,
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

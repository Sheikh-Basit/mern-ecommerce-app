import mongoose from "mongoose";
const { Schema } = mongoose;

const checkoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // user detail entered on checkout form
    userDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },

    // Order Summary
    orderSummary: [{
      // Cart detail
      cart:{type: Object, required: true},

      // Total Amount
      totalAmount: { type: Number, required: true },

      // Payment Method
      paymentMethod: {
        type: String,
        enum: ["COD", "Card", "PayPal"],
        required: true,
      },

      // Payment Status
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
      },
  
      // Order status
      orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Delivered", "Cancelled"],
        default: "Pending",
      },
    }],

  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;

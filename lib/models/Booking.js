import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    services: {
      type: [String], // Array of service names
      required: true,
    },
    personalInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            // Australian phone number validation
            return /^(\+61|0)[2-478](\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}|\d{2}\s?\d{2})$/.test(
              v
            );
          },
          message: (props) =>
            `${props.value} is not a valid Australian phone number!`,
        },
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            // Simple email validation
            return /\S+@\S+\.\S+/.test(v);
          },
          message: (props) => `${props.value} is not a valid email address!`,
        },
      },
      postcode: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            // Australian postcode validation
            return /^\d{4}$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid Australian postcode!`,
        },
      },
      address: {
        type: String,
        required: true,
      },
      preferredDate: {
        type: Date,
        required: true,
      },
      preferredTime: {
        type: String,
        default: "anytime",
      },
      callingTime: {
        type: String,
        default: "anytime",
      },
      notes: {
        type: String,
        default: "",
      },
    },
 status: {
        type: String,
        enum: [
          "processing",
          "booked",
          "cancelled",
          "pending confirmation",
          "completed",
          "rescheduled",
          "failed",
        ],
        default: "pending confirmation", // Default status
      },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt timestamps
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;

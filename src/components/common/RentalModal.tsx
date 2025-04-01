"use client";

import { useState } from "react";
import { X, Mail, Phone } from "lucide-react";

export default function RentalModal({ isOpen, onClose, category }) {
  const [contactMethod, setContactMethod] = useState(null); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rentalPeriod: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here we call the API route to send email
      await fetch("/api/send-rental-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          categoryName: category.name,
          categoryId: category.id,
        }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 from-gray-800/70 to-gray-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl text-black font-semibold">
            Rent {category.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!contactMethod && !submitted ? (
          <div className="p-6">
            <p className="mb-6 text-gray-700">
              How would you like to contact us about renting this equipment?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setContactMethod("email")}
                className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center transition-colors duration-200"
              >
                <Mail className="h-8 w-8 mb-2 text-yellow-500" />
                <span className="text-black">Via Email</span>
              </button>
              <button
                onClick={() => setContactMethod("phone")}
                className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center transition-colors duration-200"
              >
                <Phone className="h-8 w-8 mb-2 text-yellow-500" />
                <span className="text-black">Via Phone</span>
              </button>
            </div>
          </div>
        ) : submitted ? (
          <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Request Submitted!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in renting {category.name}. We'll get
              back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : contactMethod === "email" ? (
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rental Period
                </label>
                <input
                  type="text"
                  name="rentalPeriod"
                  value={formData.rentalPeriod}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 days, 1 week"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                ></textarea>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <h3 className="font-medium text-lg mb-2">Contact us directly</h3>
            <p className="text-gray-600 mb-4">
              Call us at{" "}
              <a
                href="tel:+18001234567"
                className="text-yellow-500 hover:underline"
              >
                1-800-123-4567
              </a>{" "}
              to speak with our rental team about {category.name}.
            </p>
            <p className="text-gray-600 mb-6">
              Our team is available Monday-Friday, 8am-6pm EST.
            </p>
            <button
              onClick={() => setContactMethod(null)}
              className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
            >
              Back to options
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

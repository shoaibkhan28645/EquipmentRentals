"use client";

import React, { useState } from "react";
import { X, Phone } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallModal({ isOpen, onClose }: CallModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // Replace with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 from-gray-800/70 to-gray-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal header */}
        <div className="bg-[#1D1D1D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold">Request a Call Back</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
                Thank you! We've received your request and will call you back
                shortly.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    How can we help you?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 rounded-md transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Request Call Back"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

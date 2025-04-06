import React, { useState } from "react";

const MakePaymentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    paymentType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Payment recorded: ${formData.name} paid ₦${formData.amount} via ${formData.paymentType}`
    );
    // Add real payment logic here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-red-800 py-16 text-white text-center">
        <h1 className="text-4xl font-bold">Make a Payment</h1>
        <p className="mt-4 text-lg opacity-90">
          Record member payments with ease and accuracy.
        </p>
      </header>

      <main className="max-w-xl mx-auto py-16 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Member Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Amount (₦)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Payment Type
            </label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Payment">Mobile Payment</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Payment
          </button>
        </form>
      </main>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© {new Date().getFullYear()} Big Boy’s Gym Management System</p>
        <p className="mt-2 text-gray-400">support@bigboysgym.com</p>
      </footer>
    </div>
  );
};

export default MakePaymentPage;

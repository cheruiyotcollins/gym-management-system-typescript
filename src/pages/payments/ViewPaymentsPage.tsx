import React from "react";

type PaymentRecord = {
  id: number;
  name: string;
  amount: number;
  paymentType: string;
  date: string;
};

const mockPayments: PaymentRecord[] = [
  {
    id: 1,
    name: "John Doe",
    amount: 10000,
    paymentType: "Cash",
    date: "2025-04-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    amount: 15000,
    paymentType: "Bank Transfer",
    date: "2025-04-03",
  },
  {
    id: 3,
    name: "Samuel Jackson",
    amount: 12000,
    paymentType: "Card",
    date: "2025-04-05",
  },
];

const ViewPaymentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-red-800 py-16 text-white text-center">
        <h1 className="text-4xl font-bold">Payment Records</h1>
        <p className="mt-4 text-lg opacity-90">
          Review all payments made by gym members.
        </p>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-4">
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Member Name</th>
                <th className="px-6 py-4 font-semibold">Amount (KES)</th>
                <th className="px-6 py-4 font-semibold">Payment Type</th>
                <th className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{payment.id}</td>
                  <td className="px-6 py-4">{payment.name}</td>
                  <td className="px-6 py-4">
                    KES{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{payment.paymentType}</td>
                  <td className="px-6 py-4">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© {new Date().getFullYear()} Big Boy’s Gym Management System</p>
        <p className="mt-2 text-gray-400">support@bigboysgym.com</p>
      </footer>
    </div>
  );
};

export default ViewPaymentsPage;

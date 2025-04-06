import React from "react";

type Booking = {
  id: number;
  name: string;
  date: string;
  time: string;
  activity: string;
};

const mockBookings: Booking[] = [
  {
    id: 1,
    name: "John Doe",
    date: "2025-04-10",
    time: "10:00",
    activity: "Weight Training",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2025-04-11",
    time: "12:00",
    activity: "Yoga Class",
  },
  {
    id: 3,
    name: "Bob Johnson",
    date: "2025-04-12",
    time: "09:30",
    activity: "Cardio Session",
  },
];

const BookingsTablePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-red-800 py-16 text-white text-center">
        <h1 className="text-4xl font-bold">View Booked Appointments</h1>
        <p className="mt-4 text-lg opacity-90">
          Stay on top of all upcoming gym sessions!
        </p>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-4">
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="min-w-full table-auto text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">Activity</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{booking.id}</td>
                  <td className="px-6 py-4">{booking.name}</td>
                  <td className="px-6 py-4">{booking.date}</td>
                  <td className="px-6 py-4">{booking.time}</td>
                  <td className="px-6 py-4">{booking.activity}</td>
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

export default BookingsTablePage;

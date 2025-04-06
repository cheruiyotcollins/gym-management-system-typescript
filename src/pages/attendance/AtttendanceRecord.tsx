import React from "react";

type AttendanceRecord = {
  id: number;
  name: string;
  date: string;
  checkIn: string;
  checkOut: string;
};

const mockAttendance: AttendanceRecord[] = [
  {
    id: 1,
    name: "John Doe",
    date: "2025-04-05",
    checkIn: "08:00",
    checkOut: "09:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2025-04-05",
    checkIn: "10:15",
    checkOut: "11:00",
  },
  {
    id: 3,
    name: "Mike Johnson",
    date: "2025-04-06",
    checkIn: "07:45",
    checkOut: "09:00",
  },
];

const AttendancePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-red-800 py-16 text-white text-center">
        <h1 className="text-4xl font-bold">Attendance Records</h1>
        <p className="mt-4 text-lg opacity-90">
          Here is your previous attendance record.
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
                <th className="px-6 py-4 font-semibold">Check-In</th>
                <th className="px-6 py-4 font-semibold">Check-Out</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {mockAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{record.id}</td>
                  <td className="px-6 py-4">{record.name}</td>
                  <td className="px-6 py-4">{record.date}</td>
                  <td className="px-6 py-4">{record.checkIn}</td>
                  <td className="px-6 py-4">{record.checkOut}</td>
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

export default AttendancePage;

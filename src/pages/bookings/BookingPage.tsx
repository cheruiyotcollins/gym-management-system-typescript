import React, { useState } from "react";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    activity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Appointment booked for ${formData.name} on ${formData.date} at ${formData.time}`
    );
    // Handle actual submission here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-900 to-red-800 py-16 text-white text-center">
        <h1 className="text-4xl font-bold">Book Your Workout</h1>
        <p className="mt-4 text-lg opacity-90">
          Reserve a time slot and stay committed to your fitness goals!
        </p>
      </header>

      <main className="max-w-xl mx-auto py-16 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Activity
            </label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select an Activity</option>
              <option value="Weight Training">Weight Training</option>
              <option value="Cardio Session">Cardio Session</option>
              <option value="Personal Training">Personal Training</option>
              <option value="Yoga Class">Yoga Class</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Book Appointment
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

export default BookingPage;

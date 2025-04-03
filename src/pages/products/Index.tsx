const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-red-800 py-20 text-white text-center">
        <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-blue-900">BB</span>
        </div>
        <h1 className="text-5xl font-bold mt-6">BIG BOY’S GYM</h1>
        <p className="text-xl mt-4 opacity-90">
          Modern Gym Management Powered by React & TypeScript
        </p>
        <button className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Member Management</h3>
            <p className="text-gray-600">
              Add, edit, and track gym members effortlessly.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Attendance Tracking</h3>
            <p className="text-gray-600">
              Monitor check-ins and member activity in real-time.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-bold mb-2">Workout Logs</h3>
            <p className="text-gray-600">
              Help members track progress and fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Tech Badges */}
            <span className="bg-blue-500 px-4 py-2 rounded-full">React.js</span>
            <span className="bg-blue-600 px-4 py-2 rounded-full">
              TypeScript
            </span>
            <span className="bg-teal-500 px-4 py-2 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-red-500 px-4 py-2 rounded-full">
              React Query
            </span>
            <span className="bg-orange-500 px-4 py-2 rounded-full">
              Firebase
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Gym?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join hundreds of gyms using our powerful management system.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition">
          Request Demo
        </button>
      </section>

      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>© {new Date().getFullYear()} Big Boy’s Gym Management System</p>
        <p className="mt-2 text-gray-400">support@bigboysgym.com</p>
      </footer>
    </div>
  );
};

export default HomePage;

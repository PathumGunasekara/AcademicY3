import React from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-75"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')",
        }}
      ></div>

      <div className="relative z-10">
        <Nav />

        <main className="flex flex-col items-center justify-center text-center px-4 py-20 sm:py-32 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Our{" "}
              <span className="text-blue-300">Acadamic Scheduler System</span>
            </h1>

            <p className="text-xl sm:text-2xl mb-10 leading-relaxed">
              Streamline your learning experience with our comprehensive
              platform for students and educators
            </p>


          </div>

          {/* Features Section */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl p-8 max-w-6xl w-full mt-10 text-gray-800">
            <h2 className="text-3xl font-bold mb-10 text-blue-900">
              What We Offer
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg hover:bg-blue-50 transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Course Catalog</h3>
                <p className="text-gray-600">
                  Browse and enroll in a wide range of courses across various
                  disciplines
                </p>
              </div>

              <div className="p-6 rounded-lg hover:bg-blue-50 transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Assignment Management
                </h3>
                <p className="text-gray-600">
                  Submit assignments, track deadlines, and receive grades all in
                  one place
                </p>
              </div>

              <div className="p-6 rounded-lg hover:bg-blue-50 transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Academic Calendar
                </h3>
                <p className="text-gray-600">
                  Stay organized with important dates, exams, and events
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to get started?
            </h3>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition duration-300"
            >
              Join Us Today
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

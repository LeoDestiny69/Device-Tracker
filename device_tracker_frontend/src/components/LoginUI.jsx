import { useEffect, useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-700 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Logo / Title */}
        <div
          className={`text-center mb-6 transform transition-all duration-700 delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
          <p className="text-gray-500 text-sm">
            Please sign in to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            onSubmit(formData);
          }}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent transition duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-600 transition transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:animate-pulse"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
